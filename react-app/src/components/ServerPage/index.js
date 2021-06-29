import React from "react";
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
  const [channelName, setChannelName] = useState('');
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({ display: "none" });
  
  const userId = useSelector((state) => state.session?.user?.id);
  const server = useSelector(state => state.servers?.current?.server)
  // console.log("THIS IS THE SERVER USE SELECTOR", server)
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log('THIS IS THE SERVER ID',id)
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

  //  const channels = useSelector((state) => {
  // // console.log("CHANNELS", Object.values(state.channel));
  //   return Object.values(state.channel);
  //  });

  const categories = useSelector((state) => {
    //  console.log("-----CATEGORIES", Object.values(state.category));
    return Object.values(state.category);
  })

  const usersByServer = useSelector((state) => {
    //  console.log("USERS BY SERVER", state.user_server["user"])
    return state.user_server["user"]
  })


  if (!servers) {
    return null;
  }
  else if (!usersByServer) {
    return null;
  }
   else {


    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div className="server-page">
        <Modal open={open} onClose={handleClose}>
          <div id="modal">
            <h1>Edit/Delete Channel</h1>
            <form>
              <label for="channel-name" className="edit-label">
                Edit Channel
              </label>
              <input
                type="text"
                name="channel_name"
                className="form_input"
                required
              ></input>
              <button
                type="submit"
                id="form_button"
                onClick={(channel) => editChannel(channel)}
              >
                Edit Channel
              </button>
            </form>
          </div>
        </Modal>

        <div className="name">
          <div>{server?.name}</div>
          <button id="delete-server">
            <NavLink to={`/servers/${id}/delete`}>delete</NavLink>
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
              <div id="category" className="channel">
                {`${category.title.toUpperCase()}`}
                <ul className="text-channels">
                  {channels?.map((channel) =>
                    channel.category_id === category.id ? (
                      <NavLink to={`/channels/${channel.id}`}>
                        <li
                          className="channel"
                          onMouseEnter={(e) => {
                            setStyle({ display: "block" });
                          }}
                          onMouseLeave={(e) => {
                            setStyle({ display: "none" });
                          }}
                        >
                          {" "}
                          <svg width="18" height="18" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                            ></path>
                          </svg>
                          {`${channel.title}`}
                          <button
                            type="button"
                            onClick={handleOpen}
                            className="edit-channel"
                          >
                            <div style={style} id="gear">
                              ⚙
                            </div>
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
        <div className="sqr"></div>
        <div className="channel-name">
          {/* <img className="hash" height="24" width="24"></img> */}
          <span className="channel-text"># channel</span>
        </div>
        <div className="members-div">
          <div id="online-text">ONLINE - {`${usersByServer?.length}`}</div>
          {usersByServer?.map((user) => (
            <li className="user">{`${user.username}`}</li>
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
