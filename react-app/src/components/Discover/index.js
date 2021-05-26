import React, { useState, useEffect } from "react";
import {getServers} from "../../store/discover";
import { useDispatch, useSelector } from 'react-redux'
import './Discover.css'
function Discover() {

   const dispatch = useDispatch()

   // const [servers, setServers] = useState([]);
   const servers = useSelector(state => state.discover.servers)
   console.log(servers)
   useEffect(() => {
      dispatch(getServers())
   },[dispatch])

   if(!servers) return null;

   return (
      <div id="discover--container">
         {/* <NavBar /> */}
         <div id="discover__sidebar">
            <h1 id="discover__sidebar--title">Discover</h1>
         </div>
         <div id="discover">
            <div id="discover__svg--container">
               <h1 id="discover__svg--title">Servers</h1>
               <div id="discover--svg"></div>
            </div>

            <div id="discover__servers">
               {servers.map((server)=> (
                  <div className="server__container">
                     <div className="server__container--img">
                        <img src={server.img_url}></img>
                     </div>
                     <div className="server__container--title">{server.name}</div>
                     <form>
                     <button class="server__container--button">Join</button>
                     </form>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Discover;