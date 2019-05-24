import reducer, { setViewOn, SET_VIEW_ON } from 'modules/view-on';

describe('viewOn module', () => {
  describe('#setViewOn', () => {
    it('returns the SET_VIEW_ON action', () => {
      expect(setViewOn('foo')).to.deep.equal({
        type: SET_VIEW_ON,
        ns: 'foo'
      });
    });
  });

  describe('#reducer', () => {
    context('when the action is not toggle sample', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, { type: 'test' })).to.equal(null);
      });
    });

    context('when the action is toggle sample', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, setViewOn('foo'))).to.equal('foo');
      });
    });
  });
});
