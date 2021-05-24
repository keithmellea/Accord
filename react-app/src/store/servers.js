
const LOAD = "servers/LOAD";

const load = (list) => ({
  type: LOAD,
  list,
});

export const getUsersServers = () => async (dispatch) => {
  const response = await fetch("/api/servers/");

  if (response.ok) {
      console.log("OK")
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
        allUsersServers[server.id] = server;
      });
      return {
        allUsersServers,
        ...state,
        list: action.list,
      };
    }
    default:
      return state;
  }
};

export default serversReducer