import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersServers } from "../../store/servers";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import './Navbar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const usersServers = useSelector((state) => {
    return state.servers.list.servers;
  });

  useEffect(() => {
    dispatch(getUsersServers());
  }, [dispatch]);

  console.log(usersServers)
  return (
    <nav className="navbar">
      <ContextMenuTrigger id="contextmenu">
        <div className="servers"></div>
      </ContextMenuTrigger>

      <ul className="server-list">
        {usersServers?.map((server) => (
          <li className="user_server-div">
            {console.log(server)}
            <NavLink key={server.server_name} to={`/servers/${server.id}`}>
              {/* <div className="title-bubble">
              <span className="title-bubble-text">{`${server.name}`}</span>
              </div> */}
              <img className="user_server-img" src={server?.img_url}></img>
            </NavLink>
          </li>
        ))}
        <li className="create-button">
          <NavLink to={"/servers/create"}>
            <div className="create-server-icon">
              <img className="create-server-img">{/* PLUS SIGN HERE */}</img>
            </div>
          </NavLink>
        </li>
        <li className="explore-button">
          <NavLink to={"/servers/"}>
            <div className="explore-servers-icon">
              <img className="explore-servers-img">
                {/* COMPASS ICON HERE */}
              </img>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

{
  /* <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li> */
}

export default NavBar;
