import React, { Component } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addCity, addSuccess } from "../../actions/citiesActions"
import { connect } from "react-redux"

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
    }
});


class Addcity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            country: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickAfterAdd = this.onClickAfterAdd.bind(this);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault();
        const newCity = {
            name: this.state.name,
            country: this.state.country
        }
        this.props.addCity(newCity)
    }
    onClickAfterAdd = () => {
        this.props.addSuccess()
    }
    render() {
        const { classes } = this.props;
        const addSuccess = this.props.cities.addsuccess
        return (
            <div className="add-form">
                <h1>Add a city</h1>

                {!addSuccess ? (<form id="city-form" className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
                    <TextField
                        name="name"
                        id="name"
                        label="Name"
                        classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                        }} value={this.state.name}
                        onChange={this.onChange}
                        margin="normal"
                        color="primary"
                    />
                    <TextField
                        name="country"
                        id="country"
                        label="Country"
                        className={classes.textField}
                        value={this.state.country}
                        onChange={this.onChange}
                        margin="normal"
                    />
                    <div className="add-form-btn">
                        <Button variant="contained" className={classes.button} size="medium" type="submit" form="city-form">
                            Submit</Button>
                    </div>
                </form>) : (<div className="success">
                    <p>City added successfully!</p>
                    <Button variant="contained" className={classes.button} size="medium" onClick={this.onClickAfterAdd}>Add another city</Button>
                </div>)}
            </div>
        );
    }
}

Addcity.propTypes = {
    cities: PropTypes.object,
    classes: PropTypes.object.isRequired,
    addCity: PropTypes.func,
    addsuccess: PropTypes.bool,
    addSuccess: PropTypes.func
};

const mapStateToProps = (state) => ({
    cities: state.cities,
    addsuccess: state.addsuccess,
    addSuccess: state.addSuccess
})

export default connect(mapStateToProps, { addCity, addSuccess })(withStyles(styles)(Addcity));