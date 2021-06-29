
const LOAD = "servers/LOAD";
const ADD_SERVER = "servers/ADD_SERVER"
const DELETE_SERVER = "servers/DELETE_SERVER"
const GET_SERVER = "servers/GET_SERVER"

const load = (list) => ({
  type: LOAD,
  list,
});

const add_server = (server) => ({
  type: ADD_SERVER,
  server
});

const delete_server = (server) => ({
  type: DELETE_SERVER,
  server
})

const get_server = (server) => ({
  type: GET_SERVER,
  server
})

export const getUsersServers = () => async (dispatch) => {
  const response = await fetch("/api/servers/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const usersServers = await response.json();
    dispatch(load(usersServers));
  }
};

//POST a new server
export const addServer = (img_url, server_name) => async (dispatch) => {
  // console.log(img_url, server_name)
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
  // console.log("THIS IS THE SERVEER WE ARE TRYING TO CRAETE", data)
  dispatch(add_server(data));
  return ;
}

export const deleteServer = (id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${id}`, {
    method: "DELETE",
  })
  // console.log('THIS IS THE SERVER ID', id)
  const data = await res.json();
  // console.log("THIS IS THE DATA FROM DELETION", data);
  dispatch(delete_server(data));
  return;
}

export const getServer = (id) => async (dispatch) => {
  // console.log("-------------------test-------------", id)
  const res = await fetch(`/api/servers/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  });
  // console.log("----------------test2------------",res)
  const data = await res.json();
  // console.log("---------------------THE DATA THAT WE ARE DISPATCHING=============", data)
  dispatch(get_server(data));
}

const initialState = {
  list: [],
  current: []
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
        list: action.server
      }
    }

    case DELETE_SERVER: {
      delete state[action.server.id]
      return {
        ...state,
      }
    }

    case GET_SERVER: {
      return {
        ...state,
        current: action.server
      }
    }

    default:
      return state;
  }
};

export default serversReducer
