
export const UPDATE_PAGE = 'UPDATE_PAGE';

const viewMappings = {
  'home' : 'home',
  'detalhes' : 'details'
};

const categoryMappings = {
  'grupo': 'grupos',
  'filme': 'filmes'
}


/*      ACTIONS             */
export const navigate = (path) => function doNavigate(dispatch) {
  const page = path === '/' ? 'home' : path.slice(1);
  dispatch(loadPage(page));
};

const loadPage = (url) => async function doPageLoad(dispatch, getState) {
  let [page, ...opts] = url.split('/').filter(Boolean);
  page = page in viewMappings ? viewMappings[page] : '404';
  switch (page) {
    case 'home':
      await import('../components/view-home.js');
      break;
    case 'details':
      let module = await import('../components/view-details.js');
      if (opts[0] in categoryMappings) {
        opts[0] = categoryMappings[opts[0]];
        let [category, id] = opts;
        await dispatch(module.fetchItem(id, category));
        if (isFetchItemFailed(getState().item)) {
          page = '404';
        }
      } else {
        page = '404';
      }
      break;
    default:
      page = '404';
  }
  if (page === '404') {
    import('../components/view-404.js');
  }

  if (window.location.hash) {
    opts.push(window.location.hash);
  }
  dispatch(updatePage(page, opts));
}

const isFetchItemFailed = (item) => {
  return !item.isFetching && item.failure;
}

const updatePage = (page, opts) => {
  return {
    type: UPDATE_PAGE,
    page,
    opts
  };
}


/*      REDUCERS             */
const app = (state = { }, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
        opts: action.opts
      };
    default:
      return state;
  }
}
export default app;
