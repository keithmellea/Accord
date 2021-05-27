const GET_SERVER_BY_USER = "user_server/GET_SERVER_BY_USER"
const GET_USER_BY_SERVER = "user_server/GET_USER_BY_SERVER"

const get_user_by_servers = (data) => ({
    type: GET_USER_BY_SERVER,
    data
})

const get_server_by_users = (data) => ({
    type: GET_SERVER_BY_USER,
    data
})

export const allServersByUserId = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/usersservers/user/${user_id}`);
    const data = await response.json();
    console.log("All Servers By a User Id", data)
    dispatch(get_server_by_users(data))
    return;
}

export const allUsersByServerId = (server_id) => async (dispatch) => {
    const response = await fetch(`/api/usersservers/server/${server_id}`);
    const data = await response.json();
    console.log("All Users By Server Id: ", data)
    dispatch(get_user_by_servers(data))
    return;
}


const user_serverReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_SERVER_BY_USER:
            newState = { ...state };
            newState["server"] = action.data["user_server"]
            return newState;

        case GET_USER_BY_SERVER:
            newState = { ...state };
            newState["user"] = action.data["user_server"]
            return newState;

        default:
            return state;
    }
}

export default user_serverReducer;
