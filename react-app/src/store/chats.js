const SHOW_CHAT = "chats/SHOW_CHAT"
const ADD_CHAT = "chats/ADD_CHAT"

const showChat = (list) => ({
    type: SHOW_CHAT,
    list,
})

const addChat = (content) => ({
    type: ADD_CHAT,
    payload: content
})

//thinking about doing the GET requests in the chat component
export const chatPost = (content) => async (dispatch) => {
    const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    });
    const data = await res.json();
    console.log('This is a new message ', data )
    if (data.errors) {
        return data;
    }
    dispatch(addChat(data))
    return {};
}

let initialState = { list: null };

export default function chatReducer(state = initialState, action) {

    switch(action.type) {

        case ADD_CHAT:
            return {list: action.payload}
        default:
            return state;
    }

}
