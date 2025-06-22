"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/lib/store";
import { WidgetContainer } from "./WidgetContainer";
import { Button } from "@/components/ui/button";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function PomodoroTimer() {
  const {
    secondsLeft,
    timerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useDashboardStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerRunning) {
      interval = setInterval(() => {
        useDashboardStore.setState((state) => {
          if (state.secondsLeft <= 1) {
            clearInterval(interval);
            return { timerRunning: false, secondsLeft: 0 };
          }
          return { secondsLeft: state.secondsLeft - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  return (
    <WidgetContainer title="Pomodoro Timer">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">{formatTime(secondsLeft)}</h2>
        <div className="flex justify-center gap-2">
          {timerRunning ? (
            <Button onClick={pauseTimer} variant="secondary">
              Pause
            </Button>
          ) : (
            <Button onClick={startTimer}>Start</Button>
          )}
          <Button onClick={resetTimer} variant="destructive">
            Reset
          </Button>
        </div>
      </div>
    </WidgetContainer>
  );
}