import React from 'react'
import darkSky from "../styles/img/poweredby-oneline-darkbackground.png"
import nodeImg from "../styles/img/node-js-736399_960_720.png"
import reactImg from "../styles/img/640px-React-icon.svg.png"
import expressImg from "../styles/img/Expressjs.png"
const Header = () => {
    return (
        <div className="flex-container">
            <nav id="header" className="navbar navbar-expand-md navbar-dark fixed-top">
                <div className="left">
                    <a className="navbar-brand" href="https://darksky.net/poweredby/"><img className="img-header" src={darkSky} /></a>
                </div>
                <div className="right">
                    <img className="img-node" src={nodeImg} />
                    <img className="img-node" src={reactImg} />
                    <img className="img-node" src={expressImg} />
                </div>
            </nav>
        </div>
    )
}

export default Header
