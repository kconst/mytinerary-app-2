import React, { Component } from "react"
import Amsterdam from "../images/Amsterdam.jpg"
import Barcelona from "../images/Barcelona.jpg"
import Berlin from "../images/Berlin.jpg"
import Chicago from "../images/Chicago.jpg"
import Copenhagen from "../images/Copenhagen.jpg"
import Dublin from "../images/Dublin.jpg"
import Lisbon from "../images/Lisbon.jpg"
import London from "../images/London.jpg"
import Losangeles from "../images/Losangeles.jpg"
import Paris from "../images/Paris.jpg"
import Rome from "../images/Rome.jpg"
import Vienna from "../images/Vienna.jpg"

import Slider from "react-slick";


class Carousel extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        };
        return (
            <div>
                <Slider {...settings} className="container">
                    <div className="container landing-slider">
                        <div className="row">
                            <div className="col">
                                <img className="landing-pic" src={Amsterdam} alt="Amsterdam" />
                            </div>
                            <div className="col">
                                <img className="landing-pic" src={Barcelona} alt="Barcelona" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <img className="landing-pic" src={Berlin} alt="Berlin" />
                            </div>
                            <div className="col">
                                <img className="landing-pic" src={Chicago} alt="Chicago" />
                            </div>
                        </div>
                    </div>
                    <div className="container  landing-slider">
                        <div className="row">
                            <div className="col">
                                <img className="landing-pic" src={Copenhagen} alt="Copenhagen" />
                            </div>
                            <div className="col">
                                <img className="landing-pic" src={Dublin} alt="Dublin" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <img className="landing-pic" src={Lisbon} alt="Lisbon" />
                            </div>
                            <div className="col">
                                <img className="landing-pic" src={London} alt="London" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="container  landing-slider">
                            <div className="row">
                                <div className="col">
                                    <img className="landing-pic" src={Losangeles} alt="Losangeles" />
                                </div>
                                <div className="col">
                                    <img className="landing-pic" src={Paris} alt="Paris" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <img className="landing-pic" src={Rome} alt="Rome" />
                                </div>
                                <div className="col">
                                    <img className="landing-pic" src={Vienna} alt="Vienna" />                                </div>
                            </div>
                        </div>
                    </div>

                </Slider>
            </div>
        );
    }
}


export default Carousel