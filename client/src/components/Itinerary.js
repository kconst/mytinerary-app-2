import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Activity from "./Activity"
import Comments from "./Comments"
import { connect } from "react-redux"
import { getActivities } from "../actions/activityActions"
import { getComments, addComment, deleteComment } from "../actions/commentActions"
import { addFavourite, deleteFavourite } from "../actions/authActions"
import { setItineraryRating } from "../actions/itineraryActions"
import { Link } from "react-router-dom"
import FavouriteIcon from '@material-ui/icons/Favorite';
import FavouriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import red from '@material-ui/core/colors/red';
import StarRatings from 'react-star-ratings';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  button: {
    margin: theme.spacing.unit,
  },
  icon: {
    color: red[800]
  }
});

class Itinerary extends Component {

  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.onClickAdd = this.onClickAdd.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
    this.changeRating = this.changeRating.bind(this)

    this.state = {
      notLoggedIn: false
    }
  }

  /* Function to handle collapse of itinerary cards. isOpen variable is passed from parent component as it has a function to close all other cards when one is open */
  handleExpandClick = () => {
    this.props.toggle(this.props.itinerary._id);
    if (!this.props.isOpen) {
      const itineraryId = this.props.itinerary._id
      this.props.getActivities(itineraryId);
      this.props.getComments(itineraryId)
    }
  };

  onClickAdd() {
    const date = new Date()
    const newFavourite = {
      itineraryId: this.props.itinerary._id,
      timestamp: date
    }

    this.props.addFavourite(newFavourite, this.props.user._id)
  }

  onClickDelete() {
    this.props.deleteFavourite(this.props.itinerary._id, this.props.user._id)
  }

  changeRating(newRating) {
    if (this.props.auth.isAuthenticated) {
      this.props.setItineraryRating(newRating, this.props.itinerary._id)
    } else {
      this.setState({
        notLoggedIn: true
      })
    }
  }

  render() {
    const { classes } = this.props;
    const itinerary = this.props.itinerary
    var isFavourite = false

    if (this.props.auth.favourites) {
      isFavourite = this.props.auth.favourites.find(favourite => favourite.itineraryId === itinerary._id)
    }

    return (
      <div className="itinerary-card">
        <Card className={classes.card}>
          <CardContent className="card-summary">

            <div className="profile-pic-container">
              <Avatar alt="User logo" src={require("../images/" + itinerary.user + ".png")} className={classes.bigAvatar} />
              <p>{itinerary.user}</p>
            </div>

            <div className="itinerary-title-details">
              <div className="title-fav"><h4>{itinerary.title}</h4>
                <div>
                  {this.props.auth.isAuthenticated ? (<div>{
                    isFavourite ? (
                      <IconButton className={classes.button} aria-label="Favourite" onClick={this.onClickDelete}>
                        <FavouriteIcon className={classes.icon} />
                      </IconButton>
                    ) : (
                        <IconButton className={classes.button} aria-label="Favourite" onClick={this.onClickAdd}>
                          <FavouriteBorderIcon />
                        </IconButton>
                      )
                  }</div>) : null
                  }
                </div>
              </div>

              <div className="itinerary-detail-preview">
                {/* <span>Rating: {itinerary.rating} </span> */}
                <span>Duration: {itinerary.duration} hours</span>
                <span>Price: {itinerary.price}</span>
                <p>{itinerary.hashtag}</p>
              </div>

              <StarRatings
                rating={itinerary.rating}
                starRatedColor="rgb(109, 122, 130)"
                starHoverColor="yellow"
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
                starDimension="30px"
              />

            </div>

          </CardContent>
          <Collapse in={this.props.isOpen} timeout="auto" mountOnEnter unmountOnExit>
            <CardContent>

              <Activity activities={this.props.activities} />
              <div className="back-link">
                {this.props.auth.isAuthenticated ? <Link to={`/cities/${this.props.itinerary.cityName}/${this.props.itinerary._id}/addactivity`}>Add an activity</Link> : null}
              </div>

              <Comments comments={this.props.comments} addComment={this.props.addComment} itinerary={this.props.itinerary} deleteComment={this.props.deleteComment} user={this.props.user} />

              <div className="back-link">
                {this.props.auth.isAuthenticated ? <Link to={`/cities/${this.props.itinerary.cityName}/${this.props.itinerary._id}/edititinerary`}>Edit itinerary</Link> : null}
              </div>

            </CardContent>
          </Collapse>
          <CardActions className="card-actions" disableActionSpacing>

            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.props.isOpen}
              aria-label="Show more"
            >
              {this.props.isOpen ? <p> Close </p> : <p> View all </p>}
            </IconButton>
          </CardActions>

        </Card>
      </div >
    );
  }
}

Itinerary.propTypes = {
  classes: PropTypes.object.isRequired,
  itinerary: PropTypes.object,
  loading: PropTypes.bool,
  getActivities: PropTypes.func,
  activities: PropTypes.object,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  getComments: PropTypes.func,
  comments: PropTypes.object,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
  user: PropTypes.object,
  getFavourites: PropTypes.func,
  favourites: PropTypes.object,
  addFavourite: PropTypes.func,
  deleteFavourite: PropTypes.func,
  auth: PropTypes.object,
  setItineraryRating: PropTypes.func
};

const mapStateToProps = (state) => ({
  activities: state.activities,
  comments: state.comments,
  auth: state.auth,
  user: state.auth.user,
})


export default connect(mapStateToProps, { getActivities, getComments, addComment, deleteComment, addFavourite, deleteFavourite, setItineraryRating })(withStyles(styles)(Itinerary))
