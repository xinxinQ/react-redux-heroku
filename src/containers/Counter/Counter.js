import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { customFetch } from '../../utils/utils';
import { Button } from 'react-bootstrap';
import Helmet from 'react-helmet';
import * as actionCreators from '../../actions/counter';
import serialize from 'serialize-javascript';

export class Counter extends Component { // eslint-disable-line

  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    counter: PropTypes.any,
    counterLoadState: PropTypes.object.isRequired
  };

  render() {
    const {
      increment, decrement, incrementIfOdd, incrementAsync,
      counter, counterLoadState, load
    } = this.props;
    const styles = require('./Counter.css');
    return (
      <div className="container">
        <Helmet title="计数器"/>
        <div className={styles.counterPage}>
          <img
            alt="Counter"
            src={require('./Counter.png')}
            className={styles.counter}
          />
          {' '}
          <Button onClick={increment}>+</Button>
          {' '}
          <Button onClick={decrement}>-</Button>
          {' '}
          <Button onClick={incrementIfOdd}>Increment if odd</Button>
          {' '}
          <Button onClick={() => incrementAsync()}>Increment async</Button>
          {' '}
          <Button
            bsStyle={counterLoadState.loaded ? 'success' : 'danger'}
            onClick={load}
          >
            load
          </Button>
          <br/><br/>
          @asyncConnect传给组件的值：
          <pre>{serialize(counter, { space: 4 })}</pre>
          <br/><br/>
          counter当前的加载状态:
          <pre>{serialize(counterLoadState, { space: 4 })}</pre>
        </div>
      </div>
    );
  }
}

export default asyncConnect(
  [
    {
      key: 'counter',
      promise: () => customFetch('/counter')
    }
  ],
  state => ({ counterLoadState: state.reduxAsyncConnect.loadState.counter }),
  actionCreators
)(Counter);
