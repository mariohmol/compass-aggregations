import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DeleteStage from './delete-stage';
import AddAfterStage from './add-after-stage';
import ToggleStage from './toggle-stage';
import StageGrabber from './stage-grabber';
import StageCollapser from './stage-collapser';
import StageOperatorSelect from './stage-operator-select';

import styles from './stage-builder-toolbar.less';

/**
 * The stage builder toolbar component.
 */
class StageBuilderToolbar extends PureComponent {
  static displayName = 'StageBuilderToolbar';
  static propTypes = {
    allowWrites: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    stageOperator: PropTypes.string,
    index: PropTypes.number.isRequired,
    serverVersion: PropTypes.string.isRequired,
    stageOperatorSelected: PropTypes.func.isRequired,
    stageCollapseToggled: PropTypes.func.isRequired,
    stageToggled: PropTypes.func.isRequired,
    stageAddedAfter: PropTypes.func.isRequired,
    stageDeleted: PropTypes.func.isRequired,
    setIsModified: PropTypes.func.isRequired,
    isCommenting: PropTypes.bool.isRequired,
    openLink: PropTypes.func.isRequired,
    runStage: PropTypes.func.isRequired
  };

  /**
   * Renders the stage builder toolbar.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <div className={classnames(styles['stage-builder-toolbar'])}>
        <StageGrabber />
        <StageCollapser
          isExpanded={this.props.isExpanded}
          index={this.props.index}
          setIsModified={this.props.setIsModified}
          stageCollapseToggled={this.props.stageCollapseToggled}
        />
        <StageOperatorSelect
          allowWrites={this.props.allowWrites}
          stageOperator={this.props.stageOperator}
          index={this.props.index}
          isEnabled={this.props.isEnabled}
          isCommenting={this.props.isCommenting}
          stageOperatorSelected={this.props.stageOperatorSelected}
          setIsModified={this.props.setIsModified}
          serverVersion={this.props.serverVersion}
        />
        <ToggleStage
          index={this.props.index}
          isEnabled={this.props.isEnabled}
          runStage={this.props.runStage}
          setIsModified={this.props.setIsModified}
          stageToggled={this.props.stageToggled}
        />
        <div className={classnames(styles['stage-builder-toolbar-right'])}>
          <DeleteStage
            index={this.props.index}
            runStage={this.props.runStage}
            setIsModified={this.props.setIsModified}
            stageDeleted={this.props.stageDeleted}
          />
          <AddAfterStage
            index={this.props.index}
            stageAddedAfter={this.props.stageAddedAfter}
          />
        </div>
      </div>
    );
  }
}

export default StageBuilderToolbar;
