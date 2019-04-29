import React, { Component } from 'react';
import { Link } from "react-router-dom"
import logo from "../images/MYtineraryLogo.png"
import arrowIcon from "../images/circled-right-2.png"
import Header from "../components/Header"
import Carousel from "../components/Carousel"

class Landing extends Component {
    render() {
        return (
            <div>

                <Header />

                <div>
                    <img src={logo} alt="MYtinerary logo" className="logo" />
                </div>

                <div className="landing">
                    <p className="welcome-text">Find your perfect trip, designed by insiders who know and love their cities</p>
                    
                    <div><Link to="/cities"><img src={arrowIcon} alt="arrow icon" className="arrow-icon2"></img></Link>
                    </div>
                    <p className="welcome-text popular">Popular MYtineraries</p>
 
                </div>

                <Carousel />
            </div>
        )
    }
}

export default Landing