import React from "react"
import logoimg from "../assets/taskicon.png"
import "./Navbar.css"

export default function Navbar() {
    return (
        <div className="Navbar">
            <div className="nav-left">
                <img classname="logoimg" src={logoimg} alt="" />
                <h1>Task Manager</h1>
            </div>
            <div className="nav-techstack">

            </div>
            <button>Login</button>
        </div>
    )
}