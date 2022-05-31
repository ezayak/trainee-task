import React from "react";
import './alert.style.scss';

class Alert extends React.Component { 
    constructor(props) { 
        super(props);

        this.state = {
            message: props.message,
            toggleAlert: props.toggleAlert
        }
    };

    componentDidMount() { 
        const timerId = setTimeout(() => { 
            this.state.toggleAlert();
        }, this.props.timeOut);
    }
    
    componentWillUnmount() { 
        clearTimeout(this.timerId);
    }

    render() { 
        return (
            <div className="alert-container">
                <div className="alert-message">{ this.state.message }</div>
            </div>
        );
    };
}

export default Alert;