import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

import { differenceInSeconds } from "date-fns";

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

const CYCLES_STATE_STORAGE_KEY = "@ignite-timer:cycles-state-1.0.0";

export function CyclesContextProvider({
  children,
}: ICyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (state) => {
      const storedStateAsJSON = localStorage.getItem(CYCLES_STATE_STORAGE_KEY);

      if (storedStateAsJSON) {
        const storedState = JSON.parse(storedStateAsJSON);

        return storedState;
      }

      return state;
    }
  );

  console.log("cyclesState", cyclesState);

  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amoundSecondsPassed, setAmoundSecondsPassed] = useState(() => {
    if (activeCycle) {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate)
      );

      return secondsDifference;
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem(CYCLES_STATE_STORAGE_KEY, stateJSON);
  }, [cyclesState]);

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
