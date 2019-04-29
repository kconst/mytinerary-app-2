import React, { Component } from 'react';
import { Link } from "react-router-dom"
import logo from "../images/MYtineraryLogo.png"
import arrowIcon from "../images/circled-right-2.png"
import Footer from "../components/Footer"

class Landing1 extends Component {
    render() {
        return (
            <div >
                <div className="header">
                    <img src={logo} alt="MYtinerary logo" className="logo2" />
                </div>

                <div className="landing">
                    <p className="welcome-text2">Find your perfect trip, designed by insiders who know and love their cities</p>
                    <h2 className="start-title">Start browsing</h2>
                    <div><Link to="/cities"><img src={arrowIcon} alt="arrow icon" className="arrow-icon"></img></Link>
                    </div>
                    <p className="welcome-text2">Want to build your own MYtinerary?</p>

                    <div className="home-links">
                        <Link to="/login">Log In</Link>
                        <Link to="/createaccount">Create account</Link>
                    </div>
                </div>
                <Footer className="container" />
            </div>
        )
    }
}

export default Landing1