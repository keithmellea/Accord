import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannelsServer, editChannel, deleteChannel } from "../../store/channel";
import { allCategories } from "../../store/category";
import { allUsersByServerId, allServersByUserId } from "../../store/user_server";
import { getServer } from "../../store/servers";
import  UserBar from '../UserBar'
import Chat from '../Chat/Chat'
import Modal from "@material-ui/core/Modal";

import './ServerPage.css';

const ServerPage = () => {
  const [channelName, setChannelName] = useState('');
  const [open, setOpen] = useState(false);
  const userId = useSelector((state) => state.session?.user?.id);
  const server = useSelector(state => state.servers?.current?.server)
  console.log("THIS IS THE SERVER USE SELECTOR", server)
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

       
  if(!servers)  {
     return null
       
  } else {


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
        onClose={handleClose}
        >
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
            <NavLink to={`/servers/${id}/delete`}>
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
