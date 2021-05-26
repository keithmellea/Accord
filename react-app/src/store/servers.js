
const LOAD = "servers/LOAD";

const load = (list) => ({
  type: LOAD,
  list,
});

export const getUsersServers = () => async (dispatch) => {
  const response = await fetch("/api/servers/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

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
      return {
        ...state,
        list: action.list,
      };
    }
    default:
      return state;
  }
};

export default serversReducer