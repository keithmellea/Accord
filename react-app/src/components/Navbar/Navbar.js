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
    return state.usersServers.list;
  });

  useEffect(() => {
    dispatch(getUsersServers());
  }, [dispatch]);


  return (
    <nav className="navbar">
      <ContextMenuTrigger id="contextmenu">
        <div className="servers"></div>
      </ContextMenuTrigger>

      <ContextMenu id="contextmenu">
        <ul className="server-list">
          {usersServers?.map((userServer) => (
            <li className="user_server-div">
              <NavLink key={userServer.name} to={`/servers/${usersServers.id}`}>
                <div className="user_server-icon">
                  <img
                    className="user_server-img"
                    src={userServer?.photo}
                  ></img>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </ContextMenu>
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
            <img className="explore-servers-img">{/* COMPASS ICON HERE */}</img>
          </div>
        </NavLink>
      </li>
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
