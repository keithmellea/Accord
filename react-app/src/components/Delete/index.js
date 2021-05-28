import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteServer } from "../../store/servers"
import './Delete.css'


function Delete() {

   let dispatch = useDispatch()

   const { id } = useParams();

   const deleteServ = (e) => {
      e.preventDefault();
      dispatch(deleteServer(id))
   }

   const servers = useSelector((state) => {
      return state.servers.list.servers;
    });

    useEffect(() => {

    },[servers])

    if(!servers) return null;


   const server = servers[id]

   console.log("THIS SHOULD BE THE PARAMS ID", id)
   console.log("THIS SHOULD BE THE SERVER", server)

   return(
      <div>
         <form onSubmit={deleteServ}>
            <h1>Do you want to delete server {server.name}?</h1>
            <button type="submit">Delete</button>
            <NavLink to="/">
               <button>Cancel</button>
            </NavLink>
         </form>
      </div>
   )
}

export default Delete;