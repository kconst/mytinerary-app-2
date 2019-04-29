import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions"
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';
import { CountryDropdown } from 'react-country-region-selector';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: "column",
        alignItems: "center"
    },
    input: {
        margin: theme.spacing.unitn,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    select: {
        marginTop: theme.spacing.unit * 2,
        fontSize: "1.2rem",
        width: 195
    },
    button: {
        margin: 30,
        marginLeft: "auto",
        marginRight: "auto",
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
    paper: {
        position: 'absolute',
        top: "10%",
        left: "10%",
        right: "10%",
        bottom: "10%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflow: "scroll",
    },
});



class Createaccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            first_name: "",
            last_name: "",
            country: "",
            msg: null,
            alert: false,
            checked: false,
            regSuccess: false,
            userImage: null,
            open: false,
            imgPreview: null
        };
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleCloseAlert = this.handleCloseAlert.bind(this)
        this.handleChecked = this.handleChecked.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.clearImg = this.clearImg.bind(this)
        this.clearImg = this.clearImg.bind(this)
        this.selectCountry = this.selectCountry.bind(this)
    }

    componentDidMount() {
        this.props.clearErrors()
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === "REGISTRATION_FAIL") {
                this.setState({ msg: error.msg.msg, alert: true })
            } else {
                this.setState({ msg: null })
            }
        }

        if (prevProps.isAuthenticated === false && isAuthenticated === true) {
            this.setState({
                regSuccess: true
            })
            this.props.history.push("/cities/all");
        }
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    handleOpenModal = () => {
        this.setState({ open: true });
    };

    handleCloseModal = () => {
        this.setState({ open: false });
    };

    handleCloseAlert = () => {
        this.setState({ alert: false });
    };

    handleChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    onChange = (e) => {
        switch (e.target.name) {
            case 'userImage':
                if (e.target.files[0]) {
                    this.setState({
                        userImage: e.target.files[0],
                        imgPreview: URL.createObjectURL(e.target.files[0])
                    });
                }
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };

    clearImg = () => {
        this.setState({
            userImage: null,
            imgPreview: null
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        if (this.state.checked) {
            const { username, password, email, first_name, last_name, country, userImage } = this.state

            let formData = new FormData();

            formData.append('username', username);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('country', country);
            formData.append('userImage', userImage);

            // Attempt to register
            this.props.register(formData)
        } else {
            this.setState({
                msg: "You have to agree to MYtinerary's terms and conditions to be able to create account.",
                alert: true
            })
        }
    }

    render() {
        const { classes } = this.props;
        const { alert } = this.state
        return (
            <div>
                <h3 className="title">Create account</h3>

                <div><Snackbar
                    open={alert}
                    onClose={this.handleCloseAlert}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id"><ErrorIcon />  {this.state.msg}</span>}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    autoHideDuration={6000}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleCloseAlert}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />

                    <form encType="multipart/form-data" className={classes.container} noValidate autoComplete="off" id="register-form" onSubmit={this.onSubmit}>

                        <div>

                            {!this.state.imgPreview ?
                                (<div className="upload-userpic"><label htmlFor="userpic">Click to select picture</label>
                                    <input type="file" name="userImage" onChange={this.onChange} id="userpic" className={classes.input} style={{ display: 'none' }} /></div>) :
                                (<div className="upload-userpic">
                                    <img src={this.state.imgPreview} alt="preview"></img>
                                    <span onClick={this.clearImg} className="clear-img">X</span>
                                </div>)
                            }

                        </div>

                        <div>
                            <InputLabel htmlFor="username" className="form-label">Username:</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                                className={classes.input}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" className="form-label">Password:</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                className={classes.input}
                                type="password"

                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" className="form-label">Email:</InputLabel>
                            <Input
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                className={classes.input}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="first_name" className="form-label">First name:</InputLabel>
                            <Input
                                id="first_name"
                                name="first_name"
                                value={this.state.first_name}
                                onChange={this.onChange}
                                className={classes.input}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="last_name" className="form-label">Last name:</InputLabel>
                            <Input
                                id="last_name"
                                name="last_name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                className={classes.input}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="country" className="form-label">
                                Country:
                            </InputLabel>

                            <CountryDropdown
                                className="country-select"
                                value={this.state.country}
                                onChange={(val) => this.selectCountry(val)} />
                        </div>

                        <div className="terms">
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleChecked}
                                value="checked"
                            />
                            <p>I agree to MYtinerary&apos;s <span className="terms-link" onClick={this.handleOpenModal} >Terms & Conditions</span></p>
                        </div>
                        <Modal
                            open={this.state.open}
                            onClose={this.handleCloseModal}
                        >
                            <div className={classes.paper} >
                                <h3>MYtinerary terms and ametconditions</h3>
                                <p>Lorem ipsum, dolor sit  consectetur adipisicing elit. Minus cum mollitia molestiae eveniet harum error dolorum molestias voluptates. Provident veritatis beatae iste ratione, aspernatur quos quam perferendis nihil. Consequatur, nemo!</p>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus cum mollitia molestiae eveniet harum error dolorum molestias voluptates. Provident veritatis beatae iste ratione, aspernatur quos quam perferendis nihil. Consequatur, nemo!</p>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus cum mollitia molestiae eveniet harum error dolorum molestias voluptates. Provident veritatis beatae iste ratione, aspernatur quos quam perferendis nihil. Consequatur, nemo!</p>
                                <span onClick={this.handleCloseModal} className="terms-link">Close</span>
                            </div>
                        </Modal>
                        <Button variant="contained" className={classes.button} size="medium" type="submit" form="register-form">
                            Create Account</Button>
                    </form></div>

            </div>
        )
    }
}

Createaccount.propTypes = {
    classes: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func,
    history: PropTypes.object
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.errors
})

export default connect(mapStateToProps, { register, clearErrors })(withStyles(styles)(Createaccount))