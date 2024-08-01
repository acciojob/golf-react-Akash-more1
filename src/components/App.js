import React, { Component, useState, createRef } from "react";
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderBall: false,
            posi : 0,
            ballPosition: { left: "0px" }
        };
        this.playgroundRef = createRef(); 
        this.renderChoice = this.renderBallOrButton.bind(this);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    };

    buttonClickHandler() {
    this.setState({renderBall: true});
    this.playgroundRef.current.focus();
   }
    renderBallOrButton() {
		if (this.state.renderBall) {
		    return <div className="ball" style={this.state.ballPosition}></div>
		} else {
		    return <button className="start" onClick={this.buttonClickHandler} >Start</button>
		}
    }

    handleKeyDown(event) {
        if (event.key === 'ArrowRight' && event.keyCode === 39) {
          this.setState((prevState) => {
            const newPos = prevState.posi + 5;
            return {
              posi: newPos,
              ballPosition: { left: `${newPos}px` },
            };
          });
        }
      }

    // bind ArrowRight keydown event
    componentDidMount() {
        this.playgroundRef.current.addEventListener("keydown", this.handleKeyDown);
        this.playgroundRef.current.focus();
  }

  componentWillUnmount() {
    this.playgroundRef.current.removeEventListener("keydown", this.handleKeyDown);
  }

    render() {
        return (
            <div ref={this.playgroundRef} className="playground" tabIndex="0">
                {this.renderBallOrButton()}
            </div>
        )
    }
}


export default App;
