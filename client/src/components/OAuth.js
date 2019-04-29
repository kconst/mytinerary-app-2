import React, { Component } from "react";

import { API_URL } from "../config";

export default class OAuth extends Component {
    state = {
        user: {},
        disabled: ""
    };

    componentDidMount() {


    }

    checkPopup() {
        const check = setInterval(() => {
            const { popup } = this;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check);
                this.setState({ disabled: "" });
            }
        }, 1000);
    }

    openPopup() {
        const { provider } = this.props;
        const width = 600,
            height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        const url = `${API_URL}/api/auth/${provider}`;

        return window.open(
            url,
            "",
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
        );
    }

    startAuth = () => {
        if (!this.state.disabled) {
            this.popup = this.openPopup();
            this.checkPopup();
            this.setState({ disabled: "disabled" });
        }
    };

    closeCard = () => {
        this.setState({ user: {} });
    };

    render() {

        const { provider } = this.props;
        const { disabled } = this.state;

        return (
            <div>

                <div className="button-wrapper fadein-fast">
                    <button
                        onClick={this.startAuth}
                        className={`${provider} ${disabled} button`}
                    >
                        {provider}
                    </button>
                </div>

            </div>
        );
    }
}
