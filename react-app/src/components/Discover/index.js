import React, { useState, useEffect } from "react";
import {getServers} from "../../store/discover";
import { useDispatch, useSelector } from 'react-redux'
import './Discover.css'

function Discover() {

   const dispatch = useDispatch()

   // const [servers, setServers] = useState([]);
   const servers = useSelector(state => state.servers)

   useEffect(() => {
      dispatch(getServers())
   })

   return (
      <div id="discover--container">
         <div id="discover__sidebar">
            <h1 id="discover__sidebar--title">Discover</h1>
         </div>
         <div id="discover">
            <div id="discover__svg--container">
               <div id="discover--svg"></div>
               {
                  <div></div>
               }
            </div>
         </div>
      </div>
   )
}

export default Discover;