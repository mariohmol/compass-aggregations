import reducer, {
  stageAdded,
  stageChanged,
  stageCollapseToggled,
  stageDeleted,
  stageMoved,
  stageOperatorSelected,
  stageToggled,
  STAGE_ADDED,
  STAGE_CHANGED,
  STAGE_COLLAPSE_TOGGLED,
  STAGE_DELETED,
  STAGE_MOVED,
  STAGE_OPERATOR_SELECTED,
  STAGE_TOGGLED } from 'modules/stages';

describe('stages module', () => {
  describe('#reducer', () => {
    context('when the action is undefined', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, { type: 'test' })[0].stage).to.equal('');
      });
    });

    context('when the action is stage changed', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, stageChanged('{}', 0))[0].stage).to.equal('{}');
      });
    });

    context('when the action is stage collapse toggled', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, stageCollapseToggled(0))[0].isExpanded).to.equal(false);
      });
    });

    context('when the action is stage toggled', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, stageToggled(0))[0].isEnabled).to.equal(false);
      });
    });

    context('when the action is stage operator selected', () => {
      context('when the stage is expanded', () => {
        it('returns the new state', () => {
          expect(reducer(undefined, stageOperatorSelected(0, '$collStats'))[0].stageOperator).
            to.equal('$collStats');
        });
      });

      context('when the stage is not expanded', () => {
        const state = [{
          isExpanded: false,
          stage: ''
        }];

        it('set the stage to expanded', () => {
          expect(reducer(state, stageOperatorSelected(0, '$collStats'))[0].isExpanded).
            to.equal(true);
        });

        it('returns the new state', () => {
          expect(reducer(state, stageOperatorSelected(0, '$collStats'))[0].stageOperator).
            to.equal('$collStats');
        });
      });
    });

    context('when the action is stage added', () => {
      it('returns the new state with an additional stage', () => {
        expect(reducer(undefined, stageAdded()).length).to.equal(2);
      });
    });

    context('when the action is stage deleted', () => {
      it('returns the new state with the deleted stage', () => {
        expect(reducer(undefined, stageDeleted(0))).to.deep.equal([]);
      });
    });

    context('when the action is stage moved', () => {
      const state = [
        {
          stage: '{}',
          isValid: true,
          isEnabled: true,
          stageOperator: '$match',
          isExpanded: true
        },
        {
          stage: '{ name: 1 }',
          isValid: true,
          isEnabled: true,
          stageOperator: '$project',
          isExpanded: true
        },
        {
          stage: '{ name: -1 }',
          isValid: true,
          isEnabled: true,
          stageOperator: '$sort',
          isExpanded: true
        }
      ];

      context('when moving to a higher position', () => {
        context('when not moving to the end', () => {
          const result = reducer(state, stageMoved(0, 1));

          it('shifts the stages from the toIndex lower', () => {
            expect(result[0].stage).to.equal('{ name: 1 }');
            expect(result[1].stage).to.equal('{}');
          });
        });

        context('when moving to the end', () => {
          const result = reducer(state, stageMoved(0, 2));

          it('shifts the stages from the toIndex lower', () => {
            expect(result[0].stage).to.equal('{ name: 1 }');
            expect(result[2].stage).to.equal('{}');
          });
        });
      });

      context('when moving to a lower position', () => {
        context('when the position is not the first', () => {
          it('shifts the stages from the toIndex higher', () => {
            expect(reducer(state, stageMoved(2, 1))).to.deep.equal([
              {
                stage: '{}',
                isValid: true,
                isEnabled: true,
                stageOperator: '$match',
                isExpanded: true
              },
              {
                stage: '{ name: -1 }',
                isValid: true,
                isEnabled: true,
                stageOperator: '$sort',
                isExpanded: true
              },
              {
                stage: '{ name: 1 }',
                isValid: true,
                isEnabled: true,
                stageOperator: '$project',
                isExpanded: true
              }
            ]);
          });
        });

        context('when the position is the first', () => {
          it('shifts the stages from the toIndex higher', () => {
            expect(reducer(state, stageMoved(2, 0))).to.deep.equal([
              {
                stage: '{ name: -1 }',
                isValid: true,
                isEnabled: true,
                stageOperator: '$sort',
                isExpanded: true
              },
              {
                stage: '{}',
                isValid: true,
                isEnabled: true,
                stageOperator: '$match',
                isExpanded: true
              },
              {
                stage: '{ name: 1 }',
                isValid: true,
                isEnabled: true,
                stageOperator: '$project',
                isExpanded: true
              }
            ]);
          });
        });
      });

      context('when moving to the same position', () => {
        it('returns the unmodified state', () => {
          expect(reducer(state, stageMoved(1, 1))).to.equal(state);
        });
      });
    });
  });

  describe('#stageAdded', () => {
    it('returns the STAGE_ADDED action', () => {
      expect(stageAdded()).to.deep.equal({
        type: STAGE_ADDED
      });
    });
  });

  describe('#stageChanged', () => {
    it('returns the STAGE_CHANGED action', () => {
      expect(stageChanged('{}', 0)).to.deep.equal({
        type: STAGE_CHANGED,
        index: 0,
        stage: '{}'
      });
    });
  });

  describe('#stageCollapseToggled', () => {
    it('returns the STAGE_COLLAPSE_TOGGLED action', () => {
      expect(stageCollapseToggled(0)).to.deep.equal({
        type: STAGE_COLLAPSE_TOGGLED,
        index: 0
      });
    });
  });

  describe('#stageDeleted', () => {
    it('returns the STAGE_DELETED action', () => {
      expect(stageDeleted(0)).to.deep.equal({
        type: STAGE_DELETED,
        index: 0
      });
    });
  });

  describe('#stageOperatorSelected', () => {
    it('returns the STAGE_OPERATOR_SELECTED action', () => {
      expect(stageOperatorSelected(0, '$collStats')).to.deep.equal({
        type: STAGE_OPERATOR_SELECTED,
        index: 0,
        stageOperator: '$collStats'
      });
    });
  });

  describe('#stageToggled', () => {
    it('returns the STAGE_TOGGLED action', () => {
      expect(stageToggled(0)).to.deep.equal({
        type: STAGE_TOGGLED,
        index: 0
      });
    });
  });

  describe('#stageMoved', () => {
    it('returns the STAGE_MOVED action', () => {
      expect(stageMoved(0, 5)).to.deep.equal({
        type: STAGE_MOVED,
        fromIndex: 0,
        toIndex: 5
      });
    });
  });
});