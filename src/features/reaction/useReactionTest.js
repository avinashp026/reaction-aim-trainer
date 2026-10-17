
import { useCallback, useEffect, useRef, useState } from "react";

const ATTEMPTS_PER_ROUND = 5;

function randomDelay() {
  return Math.floor(Math.random() * 3501) + 1500;
}

export function useReactionTest(onRoundComplete) {
  const [phase, setPhase] = useState("idle");
  const [reactionTime, setReactionTime] = useState(null);
  const [attempts, setAttempts] = useState([]);

  const greenStartTimeRef = useRef(null);
  const timerRef = useRef(null);
  const attemptsRef = useRef([]);
  const onRoundCompleteRef = useRef(onRoundComplete);

  useEffect(() => {
    onRoundCompleteRef.current = onRoundComplete;
  }, [onRoundComplete]);

  const start = useCallback(() => {
    clearTimeout(timerRef.current);
    greenStartTimeRef.current = null;
    setReactionTime(null);
    setPhase("waiting");
  }, []);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    greenStartTimeRef.current = null;
    attemptsRef.current = [];
    setAttempts([]);
    setReactionTime(null);
    setPhase("idle");
  }, []);

  useEffect(() => {
    if (phase !== "waiting") return;

    timerRef.current = setTimeout(() => {
      greenStartTimeRef.current = performance.now();
      setPhase("go");
    }, randomDelay());

    return () => clearTimeout(timerRef.current);
  }, [phase]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const press = useCallback(() => {
    if (phase === "waiting") {
      clearTimeout(timerRef.current);
      greenStartTimeRef.current = null;
      setPhase("too-early");
      return;
    }

    if (phase === "idle" || phase === "too-early") {
      start();
      return;
    }

    if (phase === "result") {
      if (attemptsRef.current.length >= ATTEMPTS_PER_ROUND) {
        attemptsRef.current = [];
        setAttempts([]);
      }

      start();
      return;
    }

    if (phase !== "go" || greenStartTimeRef.current === null) {
      return;
    }

    const elapsed = Math.round(
      performance.now() - greenStartTimeRef.current
    );

    const nextAttempts = [...attemptsRef.current, elapsed];

    attemptsRef.current = nextAttempts;
    setAttempts(nextAttempts);
    setReactionTime(elapsed);
    setPhase("result");

    if (nextAttempts.length === ATTEMPTS_PER_ROUND) {
      const average =
        nextAttempts.reduce((sum, value) => sum + value, 0) /
        nextAttempts.length;

      onRoundCompleteRef.current?.({
        attempts: nextAttempts,
        average,
        best: Math.min(...nextAttempts),
      });
    }
  }, [phase, start]);

  return {
    phase,
    reactionTime,
    attempts,
    start,
    reset,
    press,
  };
}
