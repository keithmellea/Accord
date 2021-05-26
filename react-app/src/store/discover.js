const GRAB_SERVERS = "discover/GRAB_SERVERS";

const grabServers = (servers) => ({
   type: GRAB_SERVERS,
   servers
})

const initialState = {};

export const getServers = () => async (dispatch) => {
   const response = await fetch('/api/home/')
   const servers = await response.json();
   // console.log("TESTING THE OUTPUT OF SERVERS", servers)
   // console.log("TESTING ", servers.servers)
   if(servers.errors) {
      return;
   }

   dispatch(grabServers(servers))
}

export default function reducer(state=initialState, action) {
   let newState = {...state}
   switch (action.type) {
      case GRAB_SERVERS:
         newState["servers"] = action.servers.servers
         return newState;
      default:
         return state;
   }
}