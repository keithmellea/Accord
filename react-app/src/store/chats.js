const SHOW_CHAT = "chats/SHOW_CHAT"
const ADD_CHAT = "chats/ADD_CHAT"

const showChat = (list) => ({
    type: SHOW_CHAT,
    payload: list
})

const addChat = (content) => ({
    type: ADD_CHAT,
    payload: content
})

//thinking about doing the GET requests in the chat component
export const chatForChannel = (channel_id) => async (dispatch) => {
    const res = await fetch(`/api/chat/${channel_id}`,{
        headers: {
            "Content-Type": "application/json",
        },
    });
    if(res.ok) {
        const data = await res.json();
        // const other = Object.values(data);
        dispatch(showChat(data))
    }
}

export const chatPost = (id, content) => async (dispatch) => {
    const res = await fetch(`/api/chat/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    });
    const data = await res.json();
    if (data.errors) {
        return data;
    }
    // console.log("this is the thunk data", data)
    dispatch(addChat(data))
    return {};
}

export default function chatReducer(state = [], action) {
    let newState;
    switch(action.type) {
        case SHOW_CHAT:
            // console.log(action.payload)
            newState = action.payload.chats;
            // console.log(newState)
            return newState;
        case ADD_CHAT:
            newState = [...state, action.payload];
            return newState;
        default:
            return state;
    }

}
