const GET_CHANNEL = "channel/GET_CHANNEL"
const ADD_CHANNEL = "channel/ADD_CHANNEL"
const DELETE_CHANNEL = "channel/DELETE_CHANNEL"

const get_channel = (data) => ({
    type: GET_CHANNEL,
    payload: data
})

const add_channel = (data) => ({
    type: ADD_CHANNEL,
    payload: data
})

const delete_channel = (data) => ({
    type: DELETE_CHANNEL,
    payload: data
})

//GET all channels
export const allChannels = () => async (dispatch) => {
    const response = await fetch('/api/channels', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    // console.log("All Channels: ", data)
    dispatch(get_channel(data))
    return ;
}

//GET all channels based on server id.
export const getChannelsServer = (server_id) => async (dispatch) => {
    const response = await fetch(`/api/channels/server/${server_id}`)
    const data = await response.json();
    // console.log("get channel on server data: ", data)
    dispatch(get_channel(data))
    return ;
}

//GET all channels based on category id
export const getChannelsCategory = (category_id) => async (dispatch) => {
    const response = await fetch(`/api/channels/category/${category_id}`)
    const data = await response.json();
    // console.log("get channel on category data: ", data)
    dispatch(get_channel(data))
    return ;
}

//POST a new channel with server id and category id
export const addChannel = (title, server_id, category_id ) => async (dispatch) => {
    const res = await fetch('/api/channels/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            server_id,
            category_id
        }),
    })
    const data = await res.json();
    // console.log('Created New Channel: ', data)
    // dispatch(add_channel(data));
    return ;
}

//PUT: rename a specific channel
export const editChannel = (id, title) => async (dispatch) => {
    const res = await fetch(`/api/channels/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
        }),
    })
    const data = await res.json();
    // console.log("Channel is edited: ", data);
    dispatch(add_channel(data))
    return ;
}

//DELETE a channel
export const deleteChannel = (id) => async (dispatch) => {
    const res = await fetch(`/api/channels/${id}`, {
        method: "DELETE"
    })
    const data = await res.json();
    // console.log("Channel is deleted: ", data);
    dispatch(delete_channel(data));
    return ;
}

const channelReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case GET_CHANNEL:
            newState = {...state};
            action.payload["channels"].forEach(channel => {
                newState[channel.id] = channel;
            });
            return newState;

        case ADD_CHANNEL:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;

        case DELETE_CHANNEL:
            newState = {...state};
            delete newState[action.payload.id];
            return newState;

        default:
            return state;
    }
}

export default channelReducer;
