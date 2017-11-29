import { createStore } from 'redux';
import { STAGE_CHANGED } from 'action-creators';

/**
 * The initial state of the store.
 */
const INITIAL_STATE = {
  stages: [{ stage: '', isValid: true, isEnabled: true }],
  serverVersion: '3.6.0'
};

/**
 * Make a copy of the provided state.
 *
 * @param {Object} state - The current state.
 *
 * @returns {Object} The copied state.
 */
const copyState = (state) => {
  return Object.assign({}, state);
};

/**
 * Change the value of one of the pipeline stages.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const changeStage = (state, action) => {
  const newState = copyState(state);
  newState.stages[action.index].stage = action.stage;
  return newState;
};

/**
 * Modify the pipeline being worked on.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const pipeline = (state = INITIAL_STATE, action) => {
  if (action.type === STAGE_CHANGED) {
    return changeStage(state, action);
  }
  return state;
};

/**
 * The store has a pipeline reducer.
 */
const store = createStore(pipeline);

export default store;
