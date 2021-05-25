const GRAB_SERVERS = "discover/GRAB_SERVERS";

const grabServers = (servers) => ({
   type: GRAB_SERVERS,
   servers
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

export default function reducer(state=initialState, action) {
   let newState = {...state}
   switch (action.type) {
      case GRAB_SERVERS:
         action.servers.forEach((server) => {
            newState.all[server.id] = server;
         })
         return newState;
      default:
         return state;
   }
}