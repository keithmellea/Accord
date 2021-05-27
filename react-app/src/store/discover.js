const GRAB_SERVERS = "discover/GRAB_SERVERS";
const JOIN_SERVER = "discover/JOIN_SERVER";


const grabServers = (servers) => ({
   type: GRAB_SERVERS,
   servers
})

const join = (server_id) => ({
   type: JOIN_SERVER,
   server_id
})

const initialState = {};

export const getServers = () => async (dispatch) => {
   const response = await fetch('/api/home/')
   const servers = await response.json();
   if(servers.errors) {
      return;
   }

   dispatch(grabServers(servers))
}

export const joinServer = (server_id) => async (dispatch) => {
   // console.log("THIS IS THE API BACKEND SERVER ID REQUEST", server_id)
   const response = await fetch(`/api/home/${server_id}`, {
     method: 'POST'
   });

   const id = await response.json();
   if(id.errors) {
      return;
   }

   dispatch(join(id))
}

export default function reducer(state=initialState, action) {
   let newState = {...state}
   switch (action.type) {
      case GRAB_SERVERS:
         newState["servers"] = action.servers.servers
         return newState;
      case JOIN_SERVER:
         newState["joined_server"] = action.server_id
         return newState;
      default:
         return state;
   }
}