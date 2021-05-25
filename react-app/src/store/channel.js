//TODO- update the reducer function
const GET_CHANNEL = "channel/GET_CHANNEL"
const REMOVE_CHANNEL = "channel/REMOVE_CHANNEL"
const ADD_CHANNEL = "channel/ADD_CHANNEL"
const DELETE_CHANNEL = "channel/DELETE_CHANNEL"

const get_channel = (data) => ({
    type: GET_CHANNEL,
    payload: data
})

const remove_channel = (data) => ({
    type: REMOVE_CHANNEL,
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
    console.log("All Channels: ", data)
    // if (data.errors) {
    //     console.log("errors: ", data.errors)
    //     return
    // }
    // dispatch(get_channel(data))
}

//GET all channels based on server id
export const getChannelsServer = (server_id) => async (dispatch) => {
    const response = await fetch(`/api/channels/server/${server_id}`)
    const data = await response.json();
    console.log("get channel on server data: ", data)
    // if (data.errors) {
    //     console.log("errors: ", data.errors)
    //     return
    // }
    // dispatch(get_channel(data))
}

//GET all channels based on category id
export const getChannelsCategory = (category_id) => async (dispatch) => {
    const response = await fetch(`/api/channels/category/${category_id}`)
    const data = await response.json();
    console.log("get channel on category data: ", data)
    // if (data.errors) {
    //     console.log("errors: ", data.errors)
    //     return
    // }
    // dispatch(get_channel(data))
}

//POST a new channel
export const addChannel = (title) => async (dispatch) => {
    // console.log('title: ', title)
    const res = await fetch('/api/channels/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
        }),
    })
    const data = await res.json();
    console.log('Created New Channel: ', data)
    if (data.errors){
        return data;
    }
    // dispatch(ADD_CHANNEL(data));
    // return {};
}

//PUT: rename a channel
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
    console.log("Channel is edited", data);
    return ;
}

//DELETE a channel
export const deleteChannel = (id) => async (dispatch) => {
    const res = await fetch(`/api/channels/${id}`, {
        method: "DELETE"
    })
    const data = await res.json();
    console.log("Channel is deleted", data);
    return ;
}


const channelReducer = (state={}, action) => {
    let newState;

    switch (action.type) {
        case GET_CHANNEL:
            newState = {...state};
            //implement new state
            return ;

        case REMOVE_CHANNEL:
            return ;

        case ADD_CHANNEL:
            return ;

        case DELETE_CHANNEL:
            return ;
    }
}

export default channelReducer;