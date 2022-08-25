import produce from "immer";

import { IActionType, ICyclesState } from "./reducer";

export function addNewCycleMethod(state: ICyclesState, action: IActionType) {
  return produce(state, (draft) => {
    draft.cycles.push(action.payload.newCycle);
    draft.activeCycleId = action.payload.newCycle.id;
  });
}

export function interruptCurrentCycleMethod(state: ICyclesState) {
  const currentCycleIndex = state.cycles.findIndex(
    (cycle) => cycle.id === state.activeCycleId
  );

  if (currentCycleIndex < 0) {
    return state;
  }

  return produce(state, (draft) => {
    draft.activeCycleId = null;
    draft.cycles[currentCycleIndex].interruptedDate = new Date();
  });
}
export function markCurrentCycleAsFinishedMethod(state: ICyclesState) {
  const currentCycleIndex = state.cycles.findIndex(
    (cycle) => cycle.id === state.activeCycleId
  );

  if (currentCycleIndex < 0) {
    return state;
  }

  return produce(state, (draft) => {
    draft.activeCycleId = null;
    draft.cycles[currentCycleIndex].finishedDate = new Date();
  });
}
