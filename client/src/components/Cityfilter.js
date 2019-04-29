import React, { Component } from "react";
import PropTypes from "prop-types"
import { debounce } from "lodash"
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        fontFamily: "inherit",        
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: "#7A7A7A",
        },
    },
});

class Cityfilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityFilter: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        // Debounce
        this.updateFilter = debounce(this.updateFilter, 500);
    }

    handleChange = (e) => {
        this.setState({
            cityFilter: e.target.value
        })
        // Debounced function
        this.updateFilter()
    }

    // Function to update the city filter (on parent component)
    updateFilter() {
        this.props.onChange(this.state.cityFilter)
    }
    
    render() {
        const { classes } = this.props;
        
        return (
            <div className="cities-filter">
                <p>Filter our current cities:</p>

                <FormControl className={classes.margin} >
                    <Input
                        classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                        }}
                        
                        placeholder="Search by city name"
                        value={this.state.cityFilter}
                        onChange={this.handleChange}
                    />
                </FormControl>
            </div>
        )
    }
}

Cityfilter.propTypes = {
    onChange: PropTypes.func,
    classes: PropTypes.object
}

export default withStyles(styles)(Cityfilter)