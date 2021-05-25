const SHOW_CHAT = "chats/SHOW_CHAT"
const ADD_CHAT = "chats/ADD_CHAT"

const showChat = (list) => ({
    type: SHOW_CHAT,
    list,
})

const addChat = (Content) => ({
    type: ADD_CHAT,
    payload: content
})

//thinking about doing the GET requests in the chat component
export const postChat = (content) => async (dispatch) => {
    const res = await fetch('/api/chat', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    });
    const data = await res.json();
    if(data.errors) {
        return data;
    }
    dispatch(addChat(data))
    return {};
}

let initialState = { list: null };

