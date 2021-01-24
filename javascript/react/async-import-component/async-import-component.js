/**
 * Usage
 * const Home = asyncImport(() => import('../pages/home/expenseHome'));
 *
 * USED FOR ROUTE-CHUCKING (CODE SPLITTING)
 * Reference: https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
 */

import React, { Component } from "react";

export default function asyncImport(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this._isMounted = true;
      this.state = {
        component: null
      };
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      if (this._isMounted)
        this.setState({
          component
        });
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    render() {
      const Component = this.state.component;
      return Component ? <Component {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}
