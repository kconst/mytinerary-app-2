import React, { Component } from "react"
import { connect } from "react-redux"
import Itinerary from "../components/Itinerary"
import { getAllItineraries } from "../actions/itineraryActions"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            msg: "Please login to see your dashboard.",
        };
    }

    // function to collapse all other cards when a specific one is open
    toggle(id) {
        this.setState({ collapse: this.state.collapse === id ? null : id });
    }

    componentDidMount() {
        this.props.getAllItineraries()
    }

    render() {
        const { itineraries } = this.props.itineraries
        var favourites = []
        var itineraryList = []

        if (this.props.auth.isAuthenticated && this.props.auth.favourites) {
            favourites = this.props.auth.favourites
            itineraryList = favourites.map((favourite, index) => {
                for (var i = 0; i < itineraries.length; i++) {
                    if (favourite.itineraryId === itineraries[i]._id) {
                        return <Itinerary itinerary={itineraries[i]} key={index} isOpen={this.state.collapse === itineraries[i]._id} toggle={this.toggle} />
                    }
                }
            })
        }

        const msg = this.state.msg
        /* var userImage = null
        if (this.props.user.userImage) {
            userImage = this.props.user.userImage
        } else if (this.props.user.googleImage) {
            userImage = this.props.user.userImage
        } */

        return (

            <div>
                {this.props.user ?
                    <div className="dashboard">
                        <div className="dashboard-header">
                            {/* <img src={this.props.user.userImage} className="dashboard-img"></img> */}
                            <h2>{this.props.user.first_name}&apos;s Dashboard</h2>
                        </div>
                        <h4>Favourite itineraries</h4>

                        {favourites.length !== 0 ? <div className="itinerary-list">{itineraryList}</div> : <div className="no-favs"><p>You haven&apos;t added any favourites yet.</p><Link to="/cities/all">Start browsing</Link></div>}

                    </div>
                    : (<div className="result">{msg}</div>)
                }
            </div>
        )
    }
}

Dashboard.propTypes = {
    itineraries: PropTypes.object,
    loading: PropTypes.object,
    auth: PropTypes.object,
    favourites: PropTypes.object,
    getAllItineraries: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    itineraries: state.itineraries,
    loading: state.loading,
    auth: state.auth,
    user: state.auth.user,
})

export default connect(mapStateToProps, { getAllItineraries })(Dashboard)