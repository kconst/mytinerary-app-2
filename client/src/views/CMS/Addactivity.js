import React, { Component } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { addActivity, addAcSuccess, getActivities } from "../../actions/activityActions"
import { getCities } from "../../actions/citiesActions"
import { getItineraries } from "../../actions/itineraryActions"
import { connect } from "react-redux"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        flexDirection: "column"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
        color: "black"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: "column"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Addactivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            country: "",
            title: "",
            itineraryId: "",
            caption: "",
            activityImage: null,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickAfterAdd = this.onClickAfterAdd.bind(this);
        this.handleChangeSelectCity = this.handleChangeSelectCity.bind(this);
        this.handleChangeSelectItinerary = this.handleChangeSelectItinerary.bind(this);
    }

    handleChangeSelectCity = event => {
        const { cities } = this.props.cities
        const city = cities.find(city => city.name === event.target.value)
        this.setState({ name: event.target.value, country: city.country });
        this.props.getItineraries(city.name)
    };

    handleChangeSelectItinerary = event => {
        const { itineraries } = this.props.itineraries
        const itinerary = itineraries.find(itinerary => itinerary.title === event.target.value)
        this.setState({
            itineraryId: itinerary._id,
            title: itinerary.title
        });
    }

    onChange = (e) => {
        switch (e.target.name) {
            case 'activityImage':
                this.setState({ activityImage: e.target.files[0] });
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { caption, activityImage } = this.state;
        const itineraryId = this.state.itineraryId;

        let formData = new FormData();

        formData.append('caption', caption);
        formData.append('itineraryId', itineraryId);
        formData.append('activityImage', activityImage);

        this.props.addActivity(formData, itineraryId)

        this.setState({
            caption: ""
        })
    }

    onClickAfterAdd = () => {
        this.props.addAcSuccess()
    }

    componentDidMount() {
        this.props.getCities()
    }

    /* If page is accessed from a specific itinerary, it will get the info from city
    and itinerary automatically, if not, it will get it from the dropdown menus. 
    Below we check if props have been updated (so the function is only called when
    the props have been received) and if there is a city ID and an itinerary ID 
    it sets the state with that info */
    componentDidUpdate(prevProps) {
        if (prevProps.cities.cities !== this.props.cities.cities) {
            if (this.props.match.params.cityId) {
                const cities = this.props.cities.cities
                const city = cities.find(city => city.name === this.props.match.params.cityId)
                this.setState({ name: city.name, country: city.country });
                this.props.getItineraries(city.name)
            }
        }
        if (prevProps.itineraries.itineraries !== this.props.itineraries.itineraries) {
            if (this.props.match.params.itineraryId) {
                const itineraries = this.props.itineraries.itineraries
                const itinerary = itineraries.find(itinerary => itinerary._id === this.props.match.params.itineraryId)
                this.setState({
                    itineraryId: itinerary._id,
                    title: itinerary.title
                });
            }
        }
    }

    render() {
        const { classes } = this.props;
        const { cities } = this.props.cities
        const { itineraries } = this.props.itineraries
        const cityList = cities.map(city => <MenuItem value={city.name} key={city._id}>{city.name}, {city.country}</MenuItem>)
        const itineraryList = itineraries.map(itinerary => <MenuItem value={itinerary.title} key={itinerary._id}>{itinerary.title}</MenuItem>)
        const addAcSuccess = this.props.activities.addacsuccess;

        return (
            <div className="add-form">
                <h1>Add an activity </h1>
                <div className="select">
                    <p>Select city:</p>
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name">City</InputLabel>
                            <Select
                                value={this.state.name}
                                onChange={this.handleChangeSelectCity}
                                inputProps={{
                                    name: 'name',
                                    id: 'name',
                                }}
                            >
                                {cityList}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="title">Itinerary</InputLabel>
                            <Select
                                value={this.state.title}
                                onChange={this.handleChangeSelectItinerary}
                                inputProps={{
                                    name: 'title',
                                    id: 'title',
                                }}
                            >
                                {itineraryList}
                            </Select>
                        </FormControl>
                    </form>
                </div>

                {!addAcSuccess ? (<form encType="multipart/form-data" onSubmit={this.onSubmit} id="activity-form" >
                    <div className="add-activity">
                        <TextField
                            name="caption"
                            id="caption"
                            label="Description"
                            className={classes.textField}
                            value={this.state.caption}
                            onChange={this.onChange}
                            margin="normal"
                            color="primary"
                        />

                        <div>
                            <span>Upload image:</span> <input type="file" name="activityImage" onChange={this.onChange} />
                        </div>

                    </div>

                    <Button variant="contained" className={classes.button} size="medium" type="submit" form="activity-form">
                        Submit</Button>
                </form>) : (<div className="success">
                    <p>Activity added successfully!</p>
                    <Button variant="contained" className={classes.button} size="medium" onClick={this.onClickAfterAdd}>Add another activity</Button>
                </div>)}
            </div>
        );
    }
}

Addactivity.propTypes = {
    activities: PropTypes.object,
    classes: PropTypes.object.isRequired,
    addActivity: PropTypes.func,
    addacsuccess: PropTypes.bool,
    addAcSuccess: PropTypes.func,
    match: PropTypes.object,
    cities: PropTypes.object,
    itineraries: PropTypes.object,
    getItineraries: PropTypes.func,
    getCities: PropTypes.func
};

const mapStateToProps = (state) => ({
    activities: state.activities,
    addacsuccess: state.addacsuccess,
    cities: state.cities,
    itineraries: state.itineraries
})

export default connect(mapStateToProps, { addActivity, addAcSuccess, getCities, getItineraries, getActivities })(withStyles(styles)(Addactivity));