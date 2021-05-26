import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersServers } from "../../store/servers";
import { getChannelsServer } from "../../store/channel";
import { allCategories } from "../../store/category"

import './ServerPage.css';

const ServerPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersServers());
    dispatch(getChannelsServer(id));
    dispatch(allCategories());
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

  if (!servers || !channels) {
    return null;
  } else {
    const server = servers[id];

    const serverCategories = () => {
      let serverCats = [];
      for (let i = 0; i < channels.length; i++) {
        console.log("channels in loop", channels);
        let channel = channels[i];
        for (let j = 0; j < categories.length; j++) {
          let category = categories[j];
          console.log(
            "channel =",
            channel.category_id,
            "channel =",
            category.id
          );
          if (channel.category_id === category.id) {
            serverCats.push(category);
          }
        }
      }
        return serverCats;
    };
    const serverCats = serverCategories();
    console.log("server categories", serverCategories());

    return (
      <div className="server-page">
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
                      <li className="channel"> {`${channel.title}`}</li>
                    ) : null
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-div">
          HelllooooooooooooooooHellloooooooooooooooo Hellloooooooooooooooo
          Hellloooooooooooooooo Hellloooooooooooooooo Hellloooooooooooooooo
          Hellloooooooooooooooo Hellloooooooooooooooo
        </div>
        <div className="channel-name">
          <img className="hash" height="24" width="24"></img>
          <span className="channel-text">channel</span>
        </div>
        <div className="members-div"></div>
        <div className="options"></div>
      </div>
    );
}
}

export default ServerPage;