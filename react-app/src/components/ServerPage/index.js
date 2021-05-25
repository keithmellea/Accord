import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersServers } from "../../store/servers";

import './ServerPage.css';

const ServerPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

 
  useEffect(() => {
    dispatch(getUsersServers());
  }, [dispatch]);

  
  const servers = useSelector((state) => {
    return state.servers.list.servers;
  });


    return (
    <div className="server-page"> 
        <div className="name">{`Yama`}</div>
        <div className="text-channels-div"></div>
        <div className="chat-div"></div>
        <div className="members-div"></div>
    </div>
    )
}

export default ServerPage;