import React from "react"

export default function Main() {
    return (
        <div className="MainEl">
                       <h1>Fun facts about React</h1>

            <ul className="BodyText">
                <li>Was first released in 2013</li>
                <li>Was originally created by Jordan Walke</li>
                <li>Has well over 100K stars on GitHub</li>
                <img className="reactjs-iconBig" src="./src/reactjs-iconBig.png"/>
                <li>Is maintained by Facebook</li>
                <li>Powers thousands of enterprise apps, including mobile apps</li>
            </ul>

        </div>
        
    )
}