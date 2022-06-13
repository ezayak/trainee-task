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
        this.timerId = setTimeout(() => { 
            this.state.toggleAlert();
        }, this.props.timeOut);
    }
    
    componentWillUnmount() { 
        clearTimeout(this.timerId);
    }

    render() { 
        const { message } = this.state;
        return (
            <div className="alert-container">
                <div className="alert-message">{ message }</div>
            </div>
        );
    };
}

export default Alert;