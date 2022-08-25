import { produce } from "immer";

import { ActionTypes } from "./actions";
import {
  addNewCycleMethod,
  interruptCurrentCycleMethod,
  markCurrentCycleAsFinishedMethod,
} from "./methods";

export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
};

export interface ICyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export interface IActionType {
  type: ActionTypes;
  payload: {
    newCycle: Cycle;
  };
}

export function cyclesReducer(state: ICyclesState, action: IActionType) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return addNewCycleMethod(state, action);

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return interruptCurrentCycleMethod(state);

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return markCurrentCycleAsFinishedMethod(state);

    default:
      return state;
  }
}
