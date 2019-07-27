import { createSelector } from 'reselect';
import { itemsSelector, loadAll } from './data.js';

export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const FAIL_ITEM = 'FAIL_ITEM';

const tempDataMap = {
  "grupos": "shows",
  "filmes": "movies"
};
const getItem = (id, category, state) => {
  let items = state && state.data && state.data.items;
  return items && items[tempDataMap[category]]
        && items[tempDataMap[category]].find((e) => {return e.slug == id});
}

/*        ACTIONS         */
export const fetchItem = (id, category) => async function doFetchItem(dispatch, getState) {
  dispatch(requestItem(id, category));
  let state = getState();
  let item = getItem(id, category, state);
  if (item) {
    dispatch(receiveItem(id, category, item));
  } else if (!state.data.initialDataRequested) {
    dispatch(loadAll())
      .then(() => {
        item = getItem(id, category, getState());
        if (item) {
          dispatch(receiveItem(id, category, item));
        } else {
          dispatch(failItem(id, category));
        }
      });
  } else {
    dispatch(failItem(id, category));
  }
};

const requestItem = (id, category) => {
  return {
    type: REQUEST_ITEM,
    id,
    category
  };
};

const receiveItem = (id, category, item) => {
  return {
    type: RECEIVE_ITEM,
    id,
    item,
    category
  };
};

const failItem = (id, category) => {
  return {
    type: FAIL_ITEM,
    id,
    category
  };
};

/*        REDUCERS        */
export const item = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ITEM:
      return {
        ...state,
        id: action.id,
        category: action.category,
        failure: false,
        isFetching: true
      };
    case RECEIVE_ITEM:
      return {
        ...state,
        item: action.item,
        failure: false,
        isFetching: false
      };
    case FAIL_ITEM:
      return {
        ...state,
        failure: true,
        isFetching: false
      };
    default:
      return state;
  }
}

const idSelector = state => state.item.id;
const entrySelector = state => state.item.item;

export const itemSelector = createSelector(
  idSelector,
  itemsSelector,
  entrySelector,
  (id, items, item) => {
    return items && items[id] || item;
  }
);