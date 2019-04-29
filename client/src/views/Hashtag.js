import React, { Component } from "react"
import PropTypes from "prop-types"
import { getAllItineraries } from "../actions/itineraryActions"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Itinerary from "../components/Itinerary"
import Loader from "../components/Loader"

class Hashtag extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {};
    }

    // function to collapse all other cards when a specific one is open
    toggle(id) {
        this.setState({ collapse: this.state.collapse === id ? null : id });
    }

    componentDidMount() {
        // get itineraries for this city, city ID is taken from the route
        this.props.getAllItineraries();

    }

    render() {
        const { itineraries } = this.props.itineraries
        const currentHashtag = this.props.match.params.hashtag

        const filteredItineraries = itineraries.filter(itinerary => itinerary.hashtag.includes(currentHashtag))

        const itineraryList = filteredItineraries.map((itinerary, index) => <Itinerary itinerary={itinerary} key={index} isOpen={this.state.collapse === itinerary._id} toggle={this.toggle} />)

        const isLoading = this.props.itineraries.loading

        return (
            <div className="city-info">
                <h1 className="city-title">{this.props.match.params.id}</h1>
                <h4>MYtineraries with #{currentHashtag}:</h4>

                {isLoading ?
                    (<Loader />) :
                    (<div>
                        {(itineraries.length !== 0) ?
                            (<div>{itineraryList}</div>) :
                            (<p>Sorry, there no itineraries for this city yet.</p>)
                        }</div>
                    )
                }
                <div className="back-link">

                    {this.props.auth.isAuthenticated ? (<div className="back-link"><Link to={`/cities/${this.props.match.params.id}/additinerary`}>Add another itinerary</Link>
                        <Link to={`/cities/${this.props.match.params.id}/editcity`}>Edit city</Link></div>) : null}

                    <Link to="/cities/all">Go back to the Cities page</Link>
                </div>
            </div>
        )
    }
}

Hashtag.propTypes = {
    match: PropTypes.object,
    loading: PropTypes.bool,
    getAllItineraries: PropTypes.func,
    itineraries: PropTypes.object,
    favourites: PropTypes.object,
    user: PropTypes.object,
    auth: PropTypes.object
}

const mapStateToProps = (state) => ({
    itineraries: state.itineraries,
    loading: state.loading,
    auth: state.auth,
    user: state.auth.user,
    favourites: state.favourites
})

export default connect(mapStateToProps, { getAllItineraries })(Hashtag)
