import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersServers } from "../../store/servers";
import { getChannelsServer, editChannel, deleteChannel } from "../../store/channel";
import { allCategories } from "../../store/category"
import { allUsersByServerId } from "../../store/user_server"
import Chat from '../Chat/Chat'
import Modal from "@material-ui/core/Modal";

import './ServerPage.css';

const ServerPage = () => {

  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersServers());
    dispatch(getChannelsServer(id));
    dispatch(allCategories());
    dispatch(allUsersByServerId(id));
  }, [dispatch]);

  const servers = useSelector((state) => {
    return state.servers.list.servers;
  }); 
 
   const channels = useSelector((state) => {
  console.log("CHANNELS", Object.values(state.channel)); 
    return Object.values(state.channel);
   }); 

   const categories = useSelector((state) => {
     console.log("CATEGORIES", Object.values(state.category));
     return Object.values(state.category);
   })

   const usersByServer = useSelector((state) => {
     console.log("USERS BY SERVER", state.user_server["user"])
     return state.user_server["user"]
   })

  if (!servers || !channels) {
    return null;
  } else {
    const server = servers[id];

 console.log("USER", usersByServer);

    const serverCategories = () => {
      let serverCats = [];
      for (let i = 0; i < channels.length; i++) {
        console.log("channels in loop", channels);
        let channel = channels[i];
        for (let j = 0; j < categories.length; j++) {
          let category = categories[j];
          if (channel.category_id === category.id) {
            serverCats.push(category);
          }
        }
      }
        return serverCats;
    };
    const serverCats = serverCategories();
    console.log("server categories", serverCategories());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
      <div className="server-page">

        <Modal 
        open={open} 
        onClose={handleClose}>
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
              <button type="submit" id="form_button">
                Edit Channel
              </button>
            </form>
          </div>
        </Modal>

        <div className="name">{`${server.server_name}`}</div>
        <div className="categories">
          <div>
            {/* {channels?.map((channel) => (
          <li className="channel">
            {`${channel.title}`}
            </li>))}
            </div> */}
            {serverCats.map((category) => (
              <div id="category" className="channel">
                {`${category.title.toUpperCase()}`}
                <ul className="text-channels">
                  {channels?.map((channel) =>
                    channel.category_id === category.id ? (
                      <NavLink to={`/servers/${channel.id}`}>
                        <li className="channel">
                          {" "}
                          {`${channel.title}`}
                          <button
                            type="button"
                            onClick={handleOpen}
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
        <div className="channel-name">
          <img className="hash" height="24" width="24"></img>
          <span className="channel-text">channel</span>
        </div>
        <div className="members-div">
          {usersByServer?.map((user) => (
            <li className="user">{`${user.username}`}</li>
          ))}
        </div>
        <div className="options"></div>
      </div>
    );
}
}

export default ServerPage;