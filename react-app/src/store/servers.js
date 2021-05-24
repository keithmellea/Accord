import { csrfFetch } from "./csrf";


const LOAD = "user-servers/LOAD";

export const getServers = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const usersServers = await response.json();
    dispatch(load(spots));
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