
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

export const fetch_channels = () => async (dispatch) => {
    const response = await fetch('/api/channels', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log("data: ", data)
    // if (data.errors) {
    //     console.log("errors: ", data.errors)
    //     return
    // }
    // dispatch(get_channel(data))
}

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
    console.log('Add Channel Data: ', data)
    if (data.errors){
        return data;
    }
    // dispatch(ADD_CHANNEL(data));
    // return {};
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
