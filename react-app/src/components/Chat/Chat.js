import React, { useState, useRef, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
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
    const [messagePosted, setMessagePosted] = useState(false)
    const [content, setContent] = useState('')
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    let chats = useSelector(state => state.chats)
    const { channelId } = useParams();
    console.log("THIS IS THE CHANNEL ID PARAMS", channelId)
    console.log("THIS IS THE CHATS COMPONENT", chats)

  //Auto scroll feature
    const divRef = useRef(null);

    useEffect(() => {
        if (channel) {
        }
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  //

    useEffect(() => {
            dispatch(chatForChannel(channelId))
            setShow(true)
    }, [dispatch, channelId])

    useEffect(() => {

        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // console.log("first milestone")

        return (() => {
            socket.disconnect()
        })

    }, [chats])


    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    // const updateChannel = (e) => {
    //     setChannel(e.target.value)
    // }

    const sendChat = async (e) => {
        e.preventDefault()
        // socket.emit("chat_to_channel", {
        //     channel_id: channel.id,
        //     body: content
        // })
        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("")
        setMessagePosted(true)
        await dispatch(chatPost(channel, chatInput))
    }



    const place = () => {
        if (chats)
            return show ? chats.map((msg) => {

                return (
                    <div id="previousMessages" key={msg.id}>
                        <div id="Chat_user">{user.username}</div>
                        <div id="Chat_message">{msg.content}</div>
                    </div>
                );


            }) : <div></div>
    }

    // const place = show ? chats?.map((msg) => {
    //     return (
    //         <div id="previousMessages" key={msg.id}>
    //             <div id="Chat_user">{user.username}</div>
    //             <div id="Chat_message">{msg.content}</div>
    //         </div>
    //     );
    // }) : <div></div>


    // const messagesForChannel = async () => {
    //     // console.log("This is a test")
    //     await dispatch(chatForChannel(channel))
    //     setShow(true)
    // }
    // console.log("Chats", chats)

    return (user && (
        <div id="top_level" >

            {/* <div id="channelTest">
                <input
                    placeholder="Select Channel"
                    value={channel}
                    onChange={updateChannel}
                />
                <button onClick={messagesForChannel}> Channel {channel}</button>
            </div> */}
            <div >
                {place()}
                {messages.map((message, ind) => (
                    <div key={ind} id="messageComponent">
                        {/* <div id="RecentMessage">Most Recent Message From you</div> */}
                        <div id="Chat_user" key={ind}>{`${message.user}`}</div>
                        <div id="another">
                            <div id="Chat_message" key={ind}>{` ${message.msg} `}</div>
                        </div>
                    </div>
                ))}
            <div ref={divRef} />
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
