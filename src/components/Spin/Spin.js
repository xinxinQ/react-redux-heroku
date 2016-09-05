import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function Spin(props) {
  const styles = require('./Spin.scss');
  return (
    <div className={styles.spin}>
      {props.loaded || (
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      )}
    </div>
  );
}

Spin.propTypes = {
  loaded: PropTypes.bool.isRequired
};

export default connect(
  state => ({ loaded: state.reduxAsyncConnect.loaded })
)(Spin);
