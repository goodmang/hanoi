import React, { Component } from 'react';
import './header.css';

const MIN_HEIGHT = 5;
const MAX_HEIGHT = 10;

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = { height: MIN_HEIGHT };
    }

    onInputChange(str) {
        let height = parseInt(str, 10);
        if (height && height <= MAX_HEIGHT && height >= MIN_HEIGHT) {
            this.setState({height});
            this.props.onHeightChange(height);
        }
    }

    render() {
        return (
            <div>
                <h1>Towers of Hanoi</h1>
                <label htmlFor="towerHeight">Tower Height</label>
                <input 
                    type="number"
                    min="5"
                    max="10"
                    value={this.state.height}
                    onChange={event => this.onInputChange(event.target.value)}/>
                <button
                    onClick={(event => this.props.onStart(event))}>
                    Start
                </button>
            </div>
        );
    }
}


export default Header;