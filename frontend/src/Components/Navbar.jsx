import React, { useState } from 'react'
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FaSignInAlt } from 'react-icons/fa';

function Navbar(){
    const [navColour, updateNavbar] = useState(false);
    function scrollHandler() {
      if (window.scrollY >= 400) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    }
    window.addEventListener("scroll", scrollHandler);

    return(
        <Box>
            <div className="navbar fixed z-50 bg-gray-900 shadow-sm bg-opacity-60 bg-clip-padding blur-backrop-filter">
                <div className="navbar">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl color ">SkyBank</a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li><NavLink to="#" className={"color"}> Home </NavLink></li>
                            <li><NavLink to="/auth/login" className={"activate"}><FaSignInAlt style={{marginTop: "3px", color:"white", marginRight:"5px"}}/> Login </NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Navbar;