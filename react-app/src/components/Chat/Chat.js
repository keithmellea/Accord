import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { chatPost, chatForChannel } from "../../store/chats"
import './index.css';
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState()
    const [show, setShow] = useState(false)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    let chats = useSelector(state => state.chats)
    console.log(chats)
    // if (Object.keys(chats).length > 0) {

    //     chats.chats.map(msg => {
    //         console.log(msg.content)
    //     })
    // }
    console.log(messages)
    console.log(user)
    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        console.log("first milestone")

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })

    }, [channel, chats])



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
        await dispatch(chatPost(channel, chatInput))
    }


    const messagesForChannel = async () => {
        console.log("This is a test")
        await dispatch(chatForChannel(channel))
        setShow(true)
    }

    // if (!chats) {
    //     return null
    // }
    return (user && (
        <div id="top_level" >
            {show ? chats.chats.map((msg) => {
                return (
                    <div id="previousMessages" key={msg.id}>
                        <div id="Chat_user">{user.username}</div>
                        <div id="Chat_message">{msg.content}</div>
                    </div>
                );
            }) : <div></div>}
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
