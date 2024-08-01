import React, { useState, useRef, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [renderBall, setRenderBall] = useState(false);
  const [posi, setPosi] = useState(0);
  const [ballPosition, setBallPosition] = useState({ left: "0px" });
  const playgroundRef = useRef(null);

  const buttonClickHandler = () => {
    setRenderBall(true);
    playgroundRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' && event.keyCode === 39) {
      setPosi((prevPosi) => {
        const newPos = prevPosi + 5;
        setBallPosition({ left: `${newPos}px` });
        return newPos;
      });
    }
  };

  useEffect(() => {
    const currentRef = playgroundRef.current;
    if (currentRef) {
      currentRef.addEventListener("keydown", handleKeyDown);
      return () => {
        currentRef.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []); // Empty dependency array to mimic componentDidMount and componentWillUnmount

  const renderBallOrButton = () => {
    if (renderBall) {
      return <div className="ball" style={ballPosition}></div>;
    } else {
      return <button className="start" onClick={buttonClickHandler}>Start</button>;
    }
  };

  return (
    <div ref={playgroundRef} className="playground" tabIndex="0">
      {renderBallOrButton()}
    </div>
  );
};

export default App;
