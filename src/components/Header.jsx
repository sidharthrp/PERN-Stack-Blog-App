import React from "react";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import './Header.css'
import { NavLink } from "react-router-dom";

function Header(){
    
    const activeStyle = {
        
        fontSize : "22px",
        color: "white"
    }

    return(
        <div >
            <div className="flex">
            <NavLink to="/" className="nav-heading">WANDERING SID</NavLink>
            <div className="buttons">
                <NavLink to={"/write"} className="nav" style={({isActive})=> isActive ? activeStyle: null}>Write</NavLink>
                <NavLink to={"/about"} className="nav" style={({isActive})=> isActive ? activeStyle: null}>About</NavLink>
                <NavLink to={"/contact"} className="nav" style={({isActive})=> isActive ? activeStyle: null}>Contact</NavLink>
                <Avatar >S</Avatar>
            </div>
            </div>
            <Divider />
            
    </div>
    )
}

export default Header;