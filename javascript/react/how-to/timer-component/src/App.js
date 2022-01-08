import {useEffect, useState, useRef, useCallback} from 'react';

// using setInterval
const useCountdown = (duration) => {
  const [countdown, setCountdown] = useState(duration / 1000);

  useEffect(() => {
    if (countdown <= 0) return; 

    const interval = setInterval(() => {
      setCountdown(countdown => countdown - 1);
    }, 1000);

    return () => clearInterval(interval)
  }, [countdown]);

  return countdown;
}

// using time to calculate timer
const useTimer = (duration) => {
  const endTime = Date.now() + duration; // get end time
  const [countdown, setCountdown] = useState(endTime - Date.now());
  const prevTime = useRef(Date.now()); // storing previous time to ref to prevent alter

  const timer = useCallback(() => {
    const now = Date.now()
    const diff = now - prevTime.current;

    if (diff >= 1000) {
      prevTime.current = now
      setCountdown(countdown => countdown - diff)
    }

    requestAnimationFrame(timer)
  }, [])

  const time = (() => {
    const durationTime = Math.floor(countdown / 1000); // total seconds
    const hours   = Math.floor(durationTime / 3600) // 1 hour = 60 minutes = 3600 seconds
    const minutes = Math.floor(durationTime / 60) % 60
    const seconds = durationTime % 60

    const time = `
    ${hours.toString().padStart(2, '0')}:
    ${minutes.toString().padStart(2, '0')}:
    ${seconds.toString().padStart(2, '0')}
    `;

    return durationTime < 0 ? '00:00:00' : time;
  })();

  useEffect(() => {
    timer();
  }, [timer]);

  return time;
}

class TimerClassComponent extends React.Component {
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

function App() {
  const duration = 10000;
  const countdown = useCountdown(duration);
  const timer = useTimer(duration);

  return (
    <div className="App">
      {countdown}
      <br/>
      {timer}
      <br/>
      <TimerClassComponent />
    </div>
  );
}

export default App;

