import { useContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

import { CyclesContext } from "../..";

import { CountDownContainer, Separator } from "./styles";

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCyclesAsFinished } =
    useContext(CyclesContext);

  const [amoundSecondsPassed, setAmoundSecondsPassed] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amoundSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, "0");
  const seconds = secondsAmount.toString().padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCyclesAsFinished();

          setAmoundSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setAmoundSecondsPassed(secondsDifference);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeCycle, activeCycleId, markCurrentCyclesAsFinished, totalSeconds]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
