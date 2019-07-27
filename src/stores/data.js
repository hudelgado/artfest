import { createSelector } from 'reselect';

const UPDATE_ITEMS = 'UPDATE_ITEMS';
const DATA_REQUESTED = 'DATA_REQUESTED';
/* ACTIONS*/
export const loadAll = () => async (dispatch, getState) => {
  let p = Promise.all([
    dispatch({type: DATA_REQUESTED, initialDataRequested: true}),
    dispatch(await loadFile('exhibitions')),
    dispatch(await loadFile('movies')),
    dispatch(await loadFile('shows')),
    dispatch(await loadFile('partners')),
    dispatch(await loadFile('sponsors'))
  ]);
  p.then(() => {
    return getState();
  });
  return p;

}

async function loadFile(name) {
  const resp = await fetch(`/data/${name}.json`);
  const data = await resp.json();
  return {
    type: UPDATE_ITEMS,
    items: data,
    category: name
  }
}
const defaults = {
  initialDataRequested: false,
  items: {
    movies: Array(6).fill({}),
    shows: Array(7).fill({})
  },
  categories:['movies', 'shows']
};
/* REDUCERS */
export const data = (state = defaults, action) => {
  switch (action.type) {
    case UPDATE_ITEMS:
      let concatedCategories = state.categories.concat(action.category);
      let categories = [...new Set(concatedCategories)];
      return {
        ...state,
        items: {
          ...state.items,
          [action.category]: action.items
        },
        categories: categories
      }
    case DATA_REQUESTED:
      return {
        ...state,
        initialDataRequested: action.initialDataRequested
      }
    default:
      return state;
  }
}

export const itemsSelector = state => state.data && state.data.items;

export const itemListSelector = createSelector(
  itemsSelector,
  (items) => {
    return items ? items : defaults;
  }
);