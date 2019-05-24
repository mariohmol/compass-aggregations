export const SET_VIEW_ON = 'aggregations/view-on/SET_VIEW_ON';

export const INITIAL_STATE = null;

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === SET_VIEW_ON) {
    return action.ns;
  }
  return state;
}

export const setViewOn = (ns) => ({
  type: SET_VIEW_ON,
  ns: ns
});
