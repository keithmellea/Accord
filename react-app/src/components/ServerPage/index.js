import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersServers } from "../../store/servers";
import { getChannelsServer } from "../../store/channel";

import './ServerPage.css';

const ServerPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const servers = useSelector((state) => {
    return state.servers.list.servers;
  }); 
 
   const channels = useSelector((state) => {
     return state.channels;
   }); 

  useEffect(() => {
    dispatch(getUsersServers());
    dispatch(getChannelsServer());
  }, [dispatch]);

  if (!servers) {
    return null;
  } else {
    const server = servers[id];
    return (
      <div className="server-page">
        <div className="name">{`${server.server_name}`}</div>
        <div className="categories">
          {/* {categories?.map((category) => (
            <li className="channel">
              {`${category.title}`}
              <ul className="text-channels">
                {channels?.map((channel) => (
          <li className="channel">
            {`${channel.title}`}
          </li>))} 
              </ul>
            </li>
          ))} */}
        </div>
        <div className="chat-div">
          HelllooooooooooooooooHellloooooooooooooooo Hellloooooooooooooooo
          Hellloooooooooooooooo Hellloooooooooooooooo Hellloooooooooooooooo
          Hellloooooooooooooooo Hellloooooooooooooooo
        </div>
        <div className="members-div"></div>
      </div>
    );
}
}

export default ServerPage;