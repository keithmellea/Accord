import React from "react";
import { useSelector } from 'react-redux'
import './UserBar.css'

function UserBar(){

   const user = useSelector(state => state.session.user)

   return (
      <div id="userbar__container">
         <div id="userbar">
            <div>{user.username}</div>
         </div>
      </div>
   )
}

export default UserBar;