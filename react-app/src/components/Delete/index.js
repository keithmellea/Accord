import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteServer, getServer } from "../../store/servers"
import './Delete.css'


function Delete() {

   let dispatch = useDispatch()
   let history = useHistory()

   const { id } = useParams();

   const server = useSelector((state) => {
      return state.servers.current.server;
   });

   const deleteServ = (e) => {
      e.preventDefault();
      dispatch(deleteServer(Number(id)))
      history.push("/")
   }

   useEffect(() => {
      dispatch(getServer(Number(id)))
    },[server])

    if(!server) return null;


   // const server = servers[id]


   return(
      <div id="delete__container">
         <form onSubmit={deleteServ}>
            <h1>Do you want to delete server {server?.name}?</h1>
            <button type="submit">Delete</button>
            <NavLink to="/">
               <button>Cancel</button>
            </NavLink>
         </form>
      </div>
   )
}

export default Delete;