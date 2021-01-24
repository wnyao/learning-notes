import React, { useState, useEffect } from "react";

const App = () => {
  return (
    <div className="App">
      <Timer />
      <Timer2 />
      <Countdown />
    </div>
  );
};

// Countdown
const Countdown = () => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return <div>Countdown: {time}</div>;
};

// Timer
const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(time + 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return <div>Timer: {time}</div>;
};

class Timer2 extends React.Component {
  timer;
  state = {
    time: 0,
  };

  constructor(props) {
    super(props);
    this.timer = setInterval(this.incrementTime, 1000);
  }

  incrementTime = () => {
    this.setState({
      time: this.state.time + 1,
    });
  };

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    const { time } = this.state;
    return <div>Timer (class component version): {time}</div>;
  }
}

export default App;
