
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
    print("data: ", data)
    if (data.errors) {
        print("errors: ", data.errors)
        return
    }
    dispatch(get_channel(data))
}




export default channelReducer = (state={}, action) => {
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
