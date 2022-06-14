import './group-label.style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class GroupLabel extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            ...props
        };
    }

    render() {
        const toLink = this.props.name === 'all' ? '' : `/category/${this.props.name}`;
        const { name } = this.props;

        return (
            <div className='navigation-label'>
                <span><Link to={toLink}>{ name }</Link></span>
            </div>
        );
    }

}

GroupLabel.propTypes = {
    name: PropTypes.string
}

export { GroupLabel };