import { createContext, ReactNode, useReducer, useState } from "react";

import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amoundSecondsPassed: number;
  markCurrentCyclesAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: ICreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface ICyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContextType);

export function CyclesContextProvider({
  children,
}: ICyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amoundSecondsPassed, setAmoundSecondsPassed] = useState(0);

  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmoundSecondsPassed(seconds);
  }

  function markCurrentCyclesAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  function createNewCycle(data: ICreateCycleData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmoundSecondsPassed(0);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amoundSecondsPassed,
        markCurrentCyclesAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
