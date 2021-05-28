import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannelsServer, editChannel, deleteChannel } from "../../store/channel";
import { allCategories } from "../../store/category"
import { allUsersByServerId } from "../../store/user_server"
import  UserBar from '../UserBar'
import { allServersByUserId } from "../../store/user_server";
import Chat from '../Chat/Chat'
import Modal from "@material-ui/core/Modal";

import './ServerPage.css';
//SOLUTION: when the user clicks on another server you want to clean out the redux store cats

const ServerPage = () => {
  const [channelName, setChannelName] = useState('');
  const [open, setOpen] = useState(false);
  const userId = useSelector((state) => state.session.user?.id);
  const { id } = useParams();
  const dispatch = useDispatch();

  // console.log("server id: ", serverId)
  // console.log("-------USE PARAMS-------: ", test)

  useEffect(() => {
    dispatch(getChannelsServer(id));
    dispatch(allCategories());
    dispatch(allUsersByServerId(id));
    dispatch(allServersByUserId(userId));
  }, [dispatch]);


  const servers = useSelector((state) => {
    return Object.values(state?.servers?.list);
  });

  const channels = useSelector((state) => {
  // console.log("CHANNELS", Object.values(state.channel));
    return Object.values(state?.channel);
  });

  //---------This will always render all the cats no matter what or what server you click-----
  const categories = useSelector((state) => {
    //  console.log("CATEGORIES", Object.values(state.category));
    return Object.values(state.category);
  })

  const usersByServer = useSelector((state) => {
    //  console.log("USERS BY SERVER", state.user_server["user"])
    return state.user_server["user"]
   })

  const serverId = channels[0]?.server_id;
  const serverArr = servers? servers[0] : null
  const server = serverArr? serverArr[serverId - 1] : null
  console.log(server);

  if (!server || !channels) {

    return null;

  } else {

  const server = servers[id];
  //SOLUTION: has to do with this
  //how can we clean out the cats from the previous version
  //this will get all the catagories that belongs to a specific server
  const serverCategories = () => {
    
    let serverCats = [];
  
    for (let i = 0; i < channels.length; i++) {
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
  console.log("-----------------server categories", serverCategories());

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
        <div>{`${server?.name}`}</div>
        <button id="delete-server">
          <NavLink to={`/servers/${id}/delete`}>
            delete
          </NavLink>
        </button>
      </div>

      <UserBar />
     
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
                    <NavLink to={`/channels/${channel.id}`}>
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
        {/* <img className="hash" height="24" width="24"></img> */}
        <span className="channel-text"># channel</span>
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
