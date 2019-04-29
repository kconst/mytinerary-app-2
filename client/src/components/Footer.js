import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import { Link, withRouter } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';
import BackIcon from '@material-ui/icons/ArrowBackIos';
/* import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
 */
const styles = () => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
});

class Footer extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CssBaseline />
                <AppBar position="fixed" color="default" className={classes.appBar}>

                    <div className="footer-icon">
                        {this.props.location.pathname !== "/" ? <IconButton color="inherit" onClick={this.goBack} >
                            <BackIcon fontSize="large" className="footer-link" />
                        </IconButton> : null}
                    </div>

                    <div className="footer-icon home-icon">
                        <IconButton color="inherit">
                            <Link to="/" className="footer-link"><HomeIcon fontSize="large" /></Link>
                        </IconButton>
                    </div>

                    <div className="footer-icon">
                        {/* <IconButton color="inherit" onClick={this.goForward}>
                            <ForwardIcon fontSize="large" className="footer-link" />
                        </IconButton> */}
                    </div>
                </AppBar>
            </Fragment>
        );
    }

}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object,
    location: PropTypes.object
};

export default withRouter(withStyles(styles)(Footer));