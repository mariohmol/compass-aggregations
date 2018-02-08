import React, { Component } from 'react';
import classnames from 'classnames';
import InputToolbar from 'components/input-toolbar';
import InputWorkspace from 'components/input-workspace';

import styles from './input.less';

class Input extends Component {
  static displayName = 'InputComponent';

  /**
   * Render the input component.
   *
   * @returns {Component} The component.
   */
  render() {
    return (
      <div className={classnames(styles.input)}>
        <InputToolbar {...this.props} />
        <InputWorkspace {...this.props} />
      </div>
    );
  }
}

export default Input;