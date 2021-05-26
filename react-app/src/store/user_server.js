const GET_USER_SERVERS = "channel/GET_CHANNEL"
// const ADD_CHANNEL = "channel/ADD_CHANNEL"
// const DELETE_CHANNEL = "channel/DELETE_CHANNEL"

const get_user_servers = (data) => ({
    type: GET_USER_SERVERS,
    payload: data
})

// const add_channel = (data) => ({
//     type: ADD_CHANNEL,
//     payload: data
// })

// const delete_channel = (data) => ({
//     type: DELETE_CHANNEL,
//     payload: data
// })

export const allUserServer = () => async (dispatch) => {
    const response = await fetch('/api/usersservers/');
    const data = await response.json();
    console.log("--------User_Servers data-----: ", data)
    // dispatch(GET_USER_SERVERS(data))
    return ;
}

// export const getChannelsServer = (server_id) => async (dispatch) => {
//     const response = await fetch(`/api/channels/server/${server_id}`)
//     const data = await response.json();
//     console.log("get channel on server data: ", data)
//     dispatch(get_channel(data))
//     return ;
// }

// //GET all channels based on category id
// export const getChannelsCategory = (category_id) => async (dispatch) => {
//     const response = await fetch(`/api/channels/category/${category_id}`)
//     const data = await response.json();
//     console.log("get channel on category data: ", data)
//     dispatch(get_channel(data))
//     return ;
// }

// //POST a new channel
// export const addChannel = (title) => async (dispatch) => {
//     const res = await fetch('/api/channels/', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             title,
//         }),
//     })
//     const data = await res.json();
//     console.log('Created New Channel: ', data)
//     dispatch(add_channel(data));
//     return ;
// }

// //PUT: rename a specific channel
// export const editChannel = (id, title) => async (dispatch) => {
//     const res = await fetch(`/api/channels/${id}`, {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             title,
//         }),
//     })
//     const data = await res.json();
//     console.log("Channel is edited: ", data);
//     dispatch(add_channel(data))
//     return ;
// }

// //DELETE a channel
// export const deleteChannel = (id) => async (dispatch) => {
//     const res = await fetch(`/api/channels/${id}`, {
//         method: "DELETE"
//     })
//     const data = await res.json();
//     console.log("Channel is deleted: ", data);
//     dispatch(delete_channel(data));
//     return ;
// }

const user_serverReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_SERVERS:
            newState = {...state};
            action.payload["channels"].forEach(channel => {
                newState[channel.id] = channel;
            });
            return newState;

        default:
            return state;
    }
}

export default user_serverReducer;
