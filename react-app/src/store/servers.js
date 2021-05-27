
const LOAD = "servers/LOAD";
const ADD_SERVER = "servers/ADD_SERVER"

const load = (list) => ({
  type: LOAD,
  list,
});


const add_server = (data) => ({
  type: LOAD,
  list: data,
});


export const getUsersServers = () => async (dispatch) => {
  const response = await fetch("/api/servers/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
      // console.log("OK")
    const usersServers = await response.json();
    dispatch(load(usersServers));
  }
};

//POST a new server
export const addServer = (img_url, server_name) => async (dispatch) => {
  const res = await fetch('/api/servers/', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          img_url,
          server_name
      }),
  })
  const data = await res.json();
  dispatch(add_server(data));
  return ;
}


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

    case ADD_SERVER: {
      return {
        ...state,
        list: action.list
      }
    }

    default:
      return state;
  }
};

export default serversReducer
