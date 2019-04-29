import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }


    render() {
        const { component: Component, auth, ...rest } = this.props;

        if (this.props.auth.isAuthenticated === null) {
            return <div>Loading</div>
        }

        return (
            <Route {...rest} render={props => auth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/login" />
                )
            }
            />
        )
    }
}

PrivateRoute.propTypes = {
    auth: PropTypes.object,
    component: PropTypes.func
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);