/**
 * Fields changed action.
 */
export const FIELDS_CHANGED = 'aggregations/fields/FIELDS_CHANGED';

/**
 * The initial state.
 */
const INITIAL_STATE = [];

/**
 * Process the fields into an autocomplete friendly format.
 *
 * @param {Object} fields - The fields.
 *
 * @returns {Array} The processed fields.
 */
const process = (fields) => {
  return Object.keys(fields).map((key) => {
    return { name: key, value: key, score: 1, meta: 'field' };
  });
};

/**
 * Reducer function for handle state changes to fields.
 *
 * @param {Array} state - The fields state.
 * @param {Object} action - The action.
 *
 * @returns {Array} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === FIELDS_CHANGED) {
    return process(action.fields);
  }
  return state;
}

/**
 * Action creator for fields changed events.
 *
 * @param {Object} fields - The fields value.
 *
 * @returns {Object} The fields changed action.
 */
export const fieldsChanged = (fields) => ({
  type: FIELDS_CHANGED,
  fields: fields
});
