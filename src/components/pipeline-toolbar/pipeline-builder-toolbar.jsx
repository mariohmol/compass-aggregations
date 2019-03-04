import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextButton, IconButton } from 'hadron-react-buttons';
import { Tooltip } from 'hadron-react-components';
import { Dropdown, MenuItem, ButtonGroup, Button } from 'react-bootstrap';
import OverviewToggler from './overview-toggler';
import CollationCollapser from './collation-collapser';

import { TOOLTIP_EXPORT_TO_LANGUAGE } from '../../constants';

import styles from './pipeline-builder-toolbar.less';

/**
 * The pipeline builder toolbar component.
 */
class PipelineBuilderToolbar extends PureComponent {
  static displayName = 'PipelineBuilderToolbarComponent';

  static propTypes = {
    clonePipeline: PropTypes.func.isRequired,
    exportToLanguage: PropTypes.func.isRequired,
    newPipeline: PropTypes.func.isRequired,
    newPipelineFromText: PropTypes.func.isRequired,

    nameChanged: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,

    setIsModified: PropTypes.func.isRequired,
    isModified: PropTypes.bool.isRequired,

    collationCollapseToggled: PropTypes.func.isRequired,
    isCollationExpanded: PropTypes.bool.isRequired,

    isOverviewOn: PropTypes.bool.isRequired,
    toggleOverview: PropTypes.func.isRequired,

    isModified: PropTypes.bool.isRequired,

    /**
     * Saved Pipelines
     */
    savedPipeline: PropTypes.object.isRequired, // TODO List of saved-pipelines.
    savedPipelinesListToggle: PropTypes.func.isRequired,
    getSavedPipelines: PropTypes.func.isRequired,
    saveCurrentPipeline: PropTypes.func.isRequired
  };

  /**
   * Name change event handler.
   *
   * @param {Object} evt
   */
  onNameChange = evt => {
    this.props.nameChanged(evt.target.value);
    this.props.setIsModified(true);
  };

  handleSavedPipelinesOpen = () => {
    this.props.getSavedPipelines();
    this.props.savedPipelinesListToggle(1);
  };

  handleSavedPipelinesClose = () => {
    this.props.savedPipelinesListToggle(0);
  };

  modifiedText() {
    if (!this.props.isModified) {
      return null;
    }
    return <span>Modified</span>;
  }

  renderIsModifiedIndicator() {
    const isModifiedClassName = classnames({
      [styles['is-modified']]: true,
      [styles['is-modified-on']]: this.props.isModified
    });

    return (
      <div className={isModifiedClassName}>
        <span>Modified</span>
      </div>
    );
  }

  /**
   * Renders the pipeline builder toolbar.
   *
   * @returns {React.Component} The component.
   */
  render() {
    const clickHandler = this.props.savedPipeline.isListVisible
      ? this.handleSavedPipelinesClose
      : this.handleSavedPipelinesOpen;

    const savePipelineClassName = classnames({
      btn: true,
      'btn-xs': true,
      'btn-default': !this.props.isModified || this.props.name.trim() === '',
      'btn-primary': this.props.isModified && this.props.name.trim() !== '',
      [styles['pipeline-builder-toolbar-save-pipeline-button']]: true
    });
    const inputClassName = classnames({
      [styles['pipeline-builder-toolbar-name']]: true
    });

    return (
      <div className={classnames(styles['pipeline-builder-toolbar'])}>
        <OverviewToggler
          isOverviewOn={this.props.isOverviewOn}
          toggleOverview={this.props.toggleOverview}
        />
        <IconButton
          title="Toggle Saved Pipelines"
          className={classnames(
            'btn',
            'btn-xs',
            'btn-default',
            styles['pipeline-builder-toolbar-open-saved-pipelines-button']
          )}
          iconClassName="fa fa-folder-open-o"
          clickHandler={clickHandler}
        />
        <CollationCollapser
          isCollationExpanded={this.props.isCollationExpanded}
          collationCollapseToggled={this.props.collationCollapseToggled}
        />
        <div
          className={classnames(
            styles['pipeline-builder-toolbar-add-wrapper']
          )}>
          <span>{this.props.name || 'Untitled'}</span>
          -
          {this.renderIsModifiedIndicator()}
          {/* <input
            placeholder="Enter a pipeline name..."
            onChange={this.onNameChange}
            className={inputClassName}
            type="text"
            value={this.props.name}
          /> */}
        </div>

        <Dropdown pullRight as={ButtonGroup}>
          <Button
            className={savePipelineClassName}
            variant="success"
            onClick={this.props.saveCurrentPipeline}
            // disabled={this.props.name.trim() === '' || !this.props.isModified}
            >
            Save
          </Button>

          <Dropdown.Toggle
            className="btn-primary btn-xs"
            split
            variant="success"
            id="dropdown-split-basic"
          />

          <Dropdown.Menu>
            <MenuItem onClick={this.props.clonePipeline}>
              Clone Pipeline
            </MenuItem>
            <MenuItem onClick={this.props.newPipeline}>New Pipeline</MenuItem>
            <MenuItem onClick={this.props.newPipelineFromText}>
              New Pipeline From Text
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        <div
          className={styles['pipeline-builder-toolbar-export-to-language']}
          data-tip={TOOLTIP_EXPORT_TO_LANGUAGE}
          data-for="export-to-language"
          data-place="top"
          data-html="true">
          <IconButton
            className="btn btn-xs btn-default"
            iconClassName={classnames(styles['export-icon'])}
            clickHandler={this.props.exportToLanguage}
            title="Export To Language"
          />
          <Tooltip id="export-to-language" />
        </div>
      </div>
    );
  }
}

export default PipelineBuilderToolbar;
