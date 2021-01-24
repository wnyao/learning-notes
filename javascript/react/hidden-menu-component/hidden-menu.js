/**
 * Auto hide menubar based on scroll state
 *
 * Reference: Medium's pwa menu bar
 */
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
    state = {
        isScroll: false,
        isScrollDown: false,
        currentY: window.scrollY
    };
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillMount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    handleScroll = () => {
        const currentY = window.scrollY;
        this.setState({
            currentY,
            isScrollDown: currentY > this.state.currentY,
            isScroll: currentY !== this.state.currentY
        });
    };
    render() {
        const style = {
            position: "fixed",
            width: "100%",
            backgroundColor: "blue",
            transition: "transform .3s",
            transform: this.state.isScrollDown
                ? "translateY(-110%)"
                : "translateY(0)"
        };
        return (
            <div
                style={{
                    height: "1000px"
                }}
            >
                <div className="App" style={style}>
                    <h1>Hello CodeSandbox</h1>
                    <h2>Start editing to see some magic happen!</h2>
                </div>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
