import React, { useState, useEffect } from "react";
import {getServers} from "../../store/discover";
import { useDispatch, useSelector } from 'react-redux'
import './Discover.css'

function Discover() {

   const dispatch = useDispatch()

   // const [servers, setServers] = useState([]);
   // const servers = useSelector(state => )

   useEffect(() => {
      dispatch(getServers())
   })

   return (
      <div id="discover--container">
         <div id="discover">
            <div id="discover--svg">

            </div>
         </div>
      </div>
   )
}

export default Discover;