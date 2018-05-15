import React from 'react';
import { mount } from 'enzyme';

import StagePreview from 'components/stage-preview';
import styles from './stage-preview.less';
import loadingStyles from '../loading-overlay/loading-overlay.less';

describe('StagePreview [Component]', () => {
  context('when the stage operator is not $out', () => {
    let component;

    beforeEach(() => {
      component = mount(
        <StagePreview
          documents={[{ name: 'test' }]}
          isValid
          isEnabled
          isComplete
          index={0}
          runOutStage={sinon.spy()}
          gotoOutResults={sinon.spy()}
          isLoading={false} />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the wrapper div', () => {
      expect(component.find(`.${styles['stage-preview']}`)).to.be.present();
    });

    it('renders the documents', () => {
      expect(component.find(`.${styles['stage-preview-documents']}`)).to.be.present();
    });
  });

  context('when the stage operator is $out', () => {
    context('when the execution is not complete', () => {
      let component;

      beforeEach(() => {
        component = mount(
          <StagePreview
            documents={[{ name: 'test' }]}
            isValid
            isEnabled
            isComplete={false}
            index={0}
            runOutStage={sinon.spy()}
            gotoOutResults={sinon.spy()}
            isLoading={false}
            stageOperator="$out" />
        );
      });

      afterEach(() => {
        component = null;
      });

      it('renders the wrapper div', () => {
        expect(component.find(`.${styles['stage-preview']}`)).to.be.present();
      });

      it('does not render the documents', () => {
        expect(component.find(`.${styles['stage-preview-documents']}`)).to.not.be.present();
      });

      it('renders the out text', () => {
        expect(component.find(`.${styles['stage-preview-out-text']}`)).to.be.present();
      });

      it('renders the save button', () => {
        expect(component.find(`.${styles['stage-preview-out-button']}`)).to.be.present();
      });
    });

    context('when the execution is complete', () => {
      let component;

      beforeEach(() => {
        component = mount(
          <StagePreview
            documents={[{ name: 'test' }]}
            isValid
            isEnabled
            isComplete
            index={0}
            runOutStage={sinon.spy()}
            gotoOutResults={sinon.spy()}
            isLoading={false}
            stageOperator="$out" />
        );
      });

      afterEach(() => {
        component = null;
      });

      it('renders the wrapper div', () => {
        expect(component.find(`.${styles['stage-preview']}`)).to.be.present();
      });

      it('does not render the documents', () => {
        expect(component.find(`.${styles['stage-preview-documents']}`)).to.not.be.present();
      });

      it('renders the out text', () => {
        expect(component.find(`.${styles['stage-preview-out-text']}`)).to.be.present();
      });

      it('renders the link', () => {
        expect(component.find(`.${styles['stage-preview-out-link']}`)).to.be.present();
      });
    });
  });

  context('when the preview is loading', () => {
    context('when the stage operator is $out', () => {
      let component;

      beforeEach(() => {
        component = mount(
          <StagePreview
            documents={[]}
            isValid
            isEnabled
            isLoading
            index={0}
            isComplete={false}
            runOutStage={sinon.spy()}
            gotoOutResults={sinon.spy()}
            stageOperator="$out" />
        );
      });

      afterEach(() => {
        component = null;
      });

      it('renders the loading overlay', () => {
        expect(component.find(`.${loadingStyles['loading-overlay-box-text']}`)).
          to.have.text('Persisting Documents...');
      });
    });

    context('when the stage operator is not $out', () => {
      let component;

      beforeEach(() => {
        component = mount(
          <StagePreview
            documents={[]}
            isValid
            isEnabled
            isLoading
            isComplete={false}
            index={0}
            runOutStage={sinon.spy()}
            gotoOutResults={sinon.spy()}
            stageOperator="$match" />
        );
      });

      afterEach(() => {
        component = null;
      });

      it('renders the loading overlay', () => {
        expect(component.find(`.${loadingStyles['loading-overlay-box-text']}`)).
          to.have.text('Loading Preview Documents...');
      });
    });
  });
});
