import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { chatPost, chatForChannel } from "../../store/chats"
import './index.css';
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState(2)
    const user = useSelector(state => state.session.user)
    // const [messages_two, setMessages_two] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        dispatch(chatForChannel());

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const updateChannel = (e) => {
        setChannel(e.target.value)
    }

    const sendChat = async (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("")
        await dispatch(chatPost(chatInput))
    }

    const messagesForChannel = async () => {
        console.log("This is a test")
        await dispatch(chatForChannel(channel))
    }
    // const chaat = async(e) => {
    //     e.preventDefault()
    //     await dispatch(postChat(value))
    // }
    return (user && (
        <div id="top_level" >
            <div >
                {messages.map((message, ind) => (
                    <div id="messageComponent">
                        {/* <span class="dot"></span> */}
                        <div id="Chat_user" key={ind}>{`${message.user}`}</div>
                        <div id="another">
                            <div id="Chat_message" key={ind}>{` ${message.msg} `}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <input
                    placeholder="Select Channel"
                    value={channel}
                    onChange={updateChannel}
                />
                <button onClick={messagesForChannel}> Channel {channel}</button>
            </div>

            <form id="top_level_chat" method="POST" onSubmit={sendChat}>
                <input
                    id="bar"
                    placeholder="Message"
                    value={chatInput}
                    onChange={updateChatInput}
                />
                {/* <button type="submit">Send</button> */}
            </form>
        </div>
    )
    )
};


export default Chat;
