import React, { Component } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addItinerary, addItSuccess } from "../../actions/itineraryActions"
import { getCities } from "../../actions/citiesActions"
import { connect } from "react-redux"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
});


class AddItinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            country: "",
            title: "",
            user: "",
            duration: "",
            price: "",
            hashtag: [],
            cityName: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickAfterAdd = this.onClickAfterAdd.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    handleChangeSelect = event => {
        const { cities } = this.props.cities
        const city = cities.find(city => city.name === event.target.value)
        this.setState({ name: event.target.value, country: city.country });
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    onSubmit = e => {
        e.preventDefault();

        const hashtags = this.state.hashtag.replace("#", "").split(", ")

        const newItinerary = {
            title: this.state.title,
            user: this.state.user,
            duration: this.state.duration,
            price: this.state.price,
            hashtag: hashtags,
            cityName: this.state.name
        }
        this.props.addItinerary(newItinerary, this.props.match.params.cityId)
    }
    onClickAfterAdd = () => {
        this.props.addItSuccess()
    }
    componentDidMount() {
        this.props.getCities()
    }

    /* If page is accessed from a specific city, it will get the info from 
    the city automatically, if not, it will get it from the dropdown menu.
    Below we check if props have been updated (so the function is only called
    when the props have been received) and if there is a city ID it sets 
    the state with that info */
    componentDidUpdate(prevProps) {
        if (prevProps.cities.cities !== this.props.cities.cities) {
            if (this.props.match.params.cityId) {
                const cities = this.props.cities.cities
                const city = cities.find(city => city.name === this.props.match.params.cityId)
                this.setState({ name: city.name, country: city.country });
            }
        }
    }
    render() {
        const { classes } = this.props;
        const addItSuccess = this.props.itineraries.additsuccess
        const { cities } = this.props.cities;
        const cityList = cities.map(city => <MenuItem value={city.name} key={city._id}>{city.name}, {city.country}</MenuItem>)
        return (
            <div className="add-form">
                <h1>Add an itinerary</h1>

                {!addItSuccess ? (
                    <div>
                        <div className="select">
                            <p>Select city:</p>
                            <form className={classes.root} autoComplete="off">
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="name">City</InputLabel>
                                    <Select
                                        value={this.state.name}
                                        onChange={this.handleChangeSelect}
                                        inputProps={{
                                            name: 'name',
                                            id: 'name',
                                        }}
                                    >
                                        {cityList}
                                    </Select>
                                </FormControl>
                            </form>
                        </div>

                        <form id="itinerary-form" className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>

                            <TextField
                                name="title"
                                id="title"
                                label="Title"
                                className={classes.textField}
                                value={this.state.title}
                                onChange={this.onChange}
                                margin="normal"
                                color="primary"
                            />

                            <TextField
                                name="user"
                                id="user"
                                label="User"
                                className={classes.textField}
                                value={this.state.user}
                                onChange={this.onChange}
                                margin="normal"
                            />

                            <TextField
                                name="duration"
                                id="duration"
                                label="Duration (hours)"
                                className={classes.textField}
                                value={this.state.duration}
                                onChange={this.onChange}
                                margin="normal"
                            />

                            <div className="price-form">
                                <InputLabel htmlFor="price" className="price-label">Price</InputLabel>
                                <Select
                                    value={this.state.price}
                                    className="price-select"
                                    onChange={this.onChange}
                                    inputProps={{
                                        name: 'price',
                                        id: 'price',
                                    }}
                                >
                                    <MenuItem value="$">$</MenuItem>
                                    <MenuItem value="$$">$$</MenuItem>
                                    <MenuItem value="$$$">$$$</MenuItem>
                                </Select>
                            </div>

                            <TextField
                                name="hashtag"
                                id="hashtag"
                                label="Hashtags (e.g. Art, History)"
                                className={classes.textField}
                                value={this.state.hashtag}
                                onChange={this.onChange}
                                margin="normal"
                            />

                            <div className="add-form-btn">
                                <Button variant="contained" className={classes.button} size="medium" type="submit" form="itinerary-form">
                                    Submit</Button>
                            </div>
                        </form>
                    </div>

                ) : (<div className="success">
                    <p>Itinerary added successfully!</p>
                    <Button variant="contained" className={classes.button} size="medium" onClick={this.onClickAfterAdd}>Add another itinerary</Button>
                </div>)}
            </div>
        );
    }
}

AddItinerary.propTypes = {
    itineraries: PropTypes.object,
    classes: PropTypes.object.isRequired,
    addItinerary: PropTypes.func,
    additsuccess: PropTypes.bool,
    addItSuccess: PropTypes.func,
    match: PropTypes.object,
    getCities: PropTypes.func,
    cities: PropTypes.object
};

const mapStateToProps = (state) => ({
    itineraries: state.itineraries,
    additsuccess: state.addsuccess,
    addItSuccess: state.addSuccess,
    cities: state.cities
})

export default connect(mapStateToProps, { addItinerary, addItSuccess, getCities })(withStyles(styles)(AddItinerary));