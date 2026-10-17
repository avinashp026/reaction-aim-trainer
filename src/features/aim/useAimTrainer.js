
import { useCallback, useEffect, useRef, useState } from "react";

const TARGET_SIZES = {
  Easy: 62,
  Medium: 46,
  Hard: 34,
};

function createTarget() {
  return {
    x: 8 + Math.random() * 84,
    y: 12 + Math.random() * 76,
  };
}

export function useAimTrainer({ duration, difficulty, onRoundComplete }) {
  const [phase, setPhase] = useState("idle");
  const [countdown, setCountdown] = useState(3);
  const [remaining, setRemaining] = useState(duration);
  const [target, setTarget] = useState(null);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [hitTimes, setHitTimes] = useState([]);

  const endTimeRef = useRef(null);
  const previousHitRef = useRef(null);
  const statsRef = useRef({ hits: 0, misses: 0, hitTimes: [] });
  const callbackRef = useRef(onRoundComplete);

  useEffect(() => {
    callbackRef.current = onRoundComplete;
  }, [onRoundComplete]);

  const reset = useCallback(() => {
    setPhase("idle");
    setRemaining(duration);
    setTarget(null);
    setHits(0);
    setMisses(0);
    setHitTimes([]);
    statsRef.current = { hits: 0, misses: 0, hitTimes: [] };
    previousHitRef.current = null;
    endTimeRef.current = null;
  }, [duration]);

  const start = useCallback(() => {
    setHits(0);
    setMisses(0);
    setHitTimes([]);
    statsRef.current = { hits: 0, misses: 0, hitTimes: [] };
    setRemaining(duration);
    setCountdown(3);
    setTarget(null);
    previousHitRef.current = null;
    setPhase("countdown");
  }, [duration]);

  useEffect(() => {
    if (phase !== "countdown") return;

    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown((value) => value - 1);
      } else {
        endTimeRef.current = performance.now() + duration * 1000;
        previousHitRef.current = performance.now();
        setTarget(createTarget());
        setPhase("playing");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, countdown, duration]);

  useEffect(() => {
    if (phase !== "playing") return;

    let frameId;

    function tick() {
      const secondsLeft = Math.max(
        0,
        (endTimeRef.current - performance.now()) / 1000
      );

      setRemaining(secondsLeft);

      if (secondsLeft <= 0) {
        setPhase("result");
        setTarget(null);

        const finalStats = statsRef.current;
        const total = finalStats.hits + finalStats.misses;
        const averageHit = finalStats.hitTimes.length
          ? finalStats.hitTimes.reduce((sum, time) => sum + time, 0) /
            finalStats.hitTimes.length
          : null;

        callbackRef.current?.({
          hits: finalStats.hits,
          misses: finalStats.misses,
          accuracy: total ? (finalStats.hits / total) * 100 : 0,
          averageHit,
          hitsPerSecond: finalStats.hits / duration,
          duration,
          difficulty,
        });

        return;
      }

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [phase, duration, difficulty]);

  const miss = useCallback(() => {
    if (phase !== "playing") return;

    statsRef.current.misses += 1;
    setMisses(statsRef.current.misses);
  }, [phase]);

  const hit = useCallback(() => {
    if (phase !== "playing") return;

    const now = performance.now();
    const elapsed = now - previousHitRef.current;
    previousHitRef.current = now;

    statsRef.current.hits += 1;
    statsRef.current.hitTimes.push(elapsed);

    setHits(statsRef.current.hits);
    setHitTimes([...statsRef.current.hitTimes]);
    setTarget(createTarget());
  }, [phase]);

  return {
    phase,
    countdown,
    remaining,
    target,
    hits,
    misses,
    hitTimes,
    targetSize: TARGET_SIZES[difficulty],
    start,
    reset,
    hit,
    miss,
  };
}
