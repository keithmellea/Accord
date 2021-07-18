import React, { useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannelsServer, editChannel, deleteChannel } from "../../store/channel";
import { allCategories } from "../../store/category";
import { allUsersByServerId, allServersByUserId } from "../../store/user_server";
import { getServer } from "../../store/servers";
import UserBar from '../UserBar'
import Chat from '../Chat/Chat'
import About from '../auth/About';
import Modal from "@material-ui/core/Modal";

import './ServerPage.css';

const ServerPage = () => {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState({});
  const [channelTitle, setChannelTitle] = useState('');
  const userId = useSelector((state) => state.session?.user?.id);
  const server = useSelector(state => state.servers?.current?.server)
  // console.log("THIS IS THE SERVER USE SELECTOR", server)
  const { id } = useParams();
  const dispatch = useDispatch();



  // const messagesEndRef = useRef(null)

  // const scrollToBottom = () => (
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  // )

  // useEffect(() => {
  //   scrollToBottom()
  // }, []);

  const channels = useSelector((state) => {
    return Object.values(state.channel);
  });

  useEffect(() => {
    dispatch(getServer((id)))
    dispatch(getChannelsServer(id));
    dispatch(allCategories(id));
    dispatch(allUsersByServerId(id));
    dispatch(allServersByUserId(userId));
  }, [dispatch, id]);

  const servers = useSelector((state) => {
    return Object.values(state?.servers?.list);
  });

  const categories = useSelector((state) => {
    return Object.values(state.category);
  })

  const usersByServer = useSelector((state) => {
    return state.user_server["user"]
  })

  //dispatch the edit channel thunk action
  const onClickEditChannel = () => {
    dispatch(editChannel(channel.id, channelTitle));
    setChannelTitle('');
    setOpen(false)
  }

  //dispatch the delete channel thunk action
  const onClickDeleteChannel = () => {
    dispatch(deleteChannel(channel.id));
    setOpen(false)
  }

  if (!servers) {
    return null
  } else {
    const handleOpen = (channel) => {
      setChannel(channel)
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div className="server-page">
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div id="modal_channel">
            <h1>Edit/Delete Channel</h1>
            <form>
              <label htmlFor="channel-name" className="edit-label">
                Edit Channel
              </label>
              <input
                type="text"
                name="channel_name"
                className="form_input"
                value={channelTitle}
                onChange={(e) => setChannelTitle(e.target.value)}
                required
              ></input>
              <button
                type="submit"
                id="edit-form_button"
                onClick={onClickEditChannel}
              >
                Edit Channel
              </button>
              <button type="button" onClick={onClickDeleteChannel} className="delete-btn_channel">Delete Channel</button>
            </form>
          </div>
        </Modal>

        <div className="name">
          <div>{server?.name}</div>
          <button id="delete-server">
            <NavLink to={`/servers/${id}/delete`} id="textt">
              delete
            </NavLink>
          </button>
        </div>


        {/* <div className="name">
        <div>{server?.name}</div>
        <button id="delete-server">
          <NavLink to={`/servers/${id}/delete`}>
            delete
          </NavLink>
        </button>
      </div> */}

        <UserBar />

        <div className="categories">
          <div>
            {/* {channels?.map((channel) => (
          <li className="channel">
            {`${channel.title}`}
            </li>))}
            </div> */}
            {categories.map((category) => (
              <div key={category.id} id="category" className="channel">
                {`${category.title.toUpperCase()}`}
                <ul className="text-channels">
                  {channels?.map((channel) =>
                    channel.category_id === category.id ? (
                      <NavLink key={channel.id} to={`/servers/${server.id}/channel/${channel.id}`}>
                        <li className="channel">
                          {" "}
                          {`${channel.title}`}
                          <button
                            type="button"
                            onClick={() => handleOpen(channel)}
                            className="edit-channel"
                          >
                            ⚙
                          </button>
                        </li>
                      </NavLink>
                    ) : null
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-div">
          <Chat />
        </div>
        <div className="sqr">
        </div>
        <div className="channel-name">
          {/* <img className="hash" height="24" width="24"></img> */}
          <span className="channel-text"># channel</span>
        </div>
        <div className="members-div">
          {usersByServer?.map((user) => (
            <li key={user.id} className="user">{`${user.username}`}</li>
          ))}
        </div>
        <div className="options"></div>
        <button className="about-btn">
          <About />
        </button>
      </div>
    );
  }
}

export default ServerPage;
