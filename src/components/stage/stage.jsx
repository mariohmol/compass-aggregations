import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StageHeader from 'components/stage-header';
import StageEditor from 'components/stage-editor';

import styles from './stage.less';

/**
 * Display a single stage in the aggregation pipeline.
 */
class Stage extends PureComponent {
  static displayName = 'StageComponent';

  static propTypes = {
    stage: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    serverVersion: PropTypes.string.isRequired,
    stageChanged: PropTypes.func.isRequired,
    stageCollapseToggled: PropTypes.func.isRequired,
    stageDeleted: PropTypes.func.isRequired,
    stageToggled: PropTypes.func.isRequired
  }

  /**
   * Render the stage component.
   *
   * @returns {Component} The component.
   */
  render() {
    const editor = this.props.stage.isExpanded ? <StageEditor {...this.props} /> : null;
    return (
      <div className={classnames(styles.stage)}>
        <StageHeader {...this.props} />
        {editor}
      </div>
    );
  }
}

export default Stage;