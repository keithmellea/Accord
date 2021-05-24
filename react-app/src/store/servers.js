
const LOAD = "user-servers/LOAD";

const load = (list) => ({
  type: LOAD,
  list,
});

export const getUsersServers = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const usersServers = await response.json();
    dispatch(load(usersServers));
  }
};

const initialState = {
  list: []
};

const serversReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allUsersServers = [];
      action.list.forEach((server) => {
        usersServers[server.id] = spot;
      });
      return {
        usersServers,
        ...state,
        list: action.list,
      };
    }
    default:
      return state;
  }
};