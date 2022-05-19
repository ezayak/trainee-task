import './group-label.style.scss';
import React from 'react';
import { Link } from 'react-router-dom';

class GroupLabel extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            ...props
        };
    }

    render() { 
        return (
            <div className='navigation-label'>
                <span><Link to='/'>{ this.props.name }</Link></span>
            </div>
        );
    }
}

export { GroupLabel };