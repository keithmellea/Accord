import React, { useState, useEffect } from "react";
import {getServers} from "../../store/discover";
import { useDispatch, useSelector } from 'react-redux'
function Discover() {

   const dispatch = useDispatch()

   // const [servers, setServers] = useState([]);
   // const servers = useSelector(state => )

   useEffect(() => {
      dispatch(getServers())
   })

   return (
      <div>

      </div>
   )
}

export default Discover;