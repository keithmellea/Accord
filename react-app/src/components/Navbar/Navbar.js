import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContextMenuTrigger } from "react-contextmenu";
// import { getUsersServers } from "../../store/servers";
import { allServersByUserId } from "../../store/user_server";
// import {joinServer} from "../../store/discover";
import { addServer } from "../../store/servers";
import Modal from '@material-ui/core/Modal';
import './Navbar.css'

const NavBar = () => {

  let history = useHistory()

  const dispatch = useDispatch();
  const usersServers = useSelector(state => state.user_server.servers);
  // console.log(usersServers)
  // use state for modal
  const [open, setOpen] = useState(false);
  const [server_name, setServerName] = useState('');
  const [img_url, setServerImg] = useState('');

  // functions to handle opening and closing modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createServer = (e) => {
    e.preventDefault();
    dispatch(addServer(img_url, server_name))
    setOpen(false)
  }

  useEffect(() => {
    dispatch(allServersByUserId())
  }, [dispatch]);

  if(!usersServers) dispatch(allServersByUserId());
  if(!usersServers) return null;

  return (
    <nav className="navbar">
      <ContextMenuTrigger id="contextmenu">
        <div className="servers"></div>
      </ContextMenuTrigger>

      <Modal
        open={open}
        onClose={handleClose}
        >
        <div id="create_server_modal">
          <h1>Create a server</h1>
          <form onSubmit={createServer}>
            <label className="form_label">Image Url</label>
            <input type="text" name="image_url" className="form_input" onChange={e => setServerImg(e.target.value)} required></input>
            <label className="form_label">Server Name</label>
            <input type="text" name="server_name" className="form_input" onChange={e => setServerName(e.target.value)} required></input>
            <button type="submit" id="form_button">Create a Server</button>
          </form>
        </div>
      </Modal>

      <ul className="server-list">
        <div id="home__container">
            <NavLink to ="/">
          <li className="user_server-div" id="discord__img__container">
              <img className="user_server-img" id="discord__img"></img>
          </li>
            </NavLink>
          <div id="home__border"></div>
        </div>
        {
          usersServers.map((server) => (
            <li key={server.server_name} className="user_server-div">
              <NavLink to={`/servers/${server.id}`}>
                <img className="user_server-img" alt="" src={server?.img_url}></img>
              </NavLink>
            </li>
          ))
        }

        {/* <NavLink to={"/servers/create"}> */}

          <li className="create-button" onClick={handleOpen}>
              <div className="create-server-icon">
                {/* <img className="create-server-img">PLUS SIGN HERE</img> */}
                <svg id="Component_1_3" data-name="Component 1 – 3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <line id="Line_1" data-name="Line 1" y2="16" transform="translate(8)" fill="none" stroke="#FFFFFF" stroke-width="1"/>
                  <line id="Line_2" data-name="Line 2" x2="16" transform="translate(0 8)" fill="none" stroke="#FFFFFF" stroke-width="1"/>
                </svg>
              </div>
          </li>
        {/* </NavLink> */}
        <NavLink to={"/"}>
          <li className="explore-button">
              <div className="explore-servers-icon">
                <img className="explore-servers-img">
                  {/* COMPASS ICON HERE */}
                </img>
                <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"></path></svg>
              </div>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
