// @flow
/* eslint-env mocha */
import { it, describe } from 'mocha';
import { expect } from 'chai';

import parseArgs, { InvalidArgument, InvalidConfig } from '../../parser/args';

describe('parseArgs(args, args)', () => {
  describe('when config args is string', () => {
    it('should map first argument to named argument', () => {
      const expected = { file: 'file.js' };

      const actual = parseArgs('file', ['file.js']);

      expect(actual).to.deep.equal(expected);
    });

    describe('when the arguments length is not 1', () => {
      it('should throw for zero arguments', () => {
        const fn = () => parseArgs('file', []);

        expect(fn).to.throw(InvalidArgument);
      });
    });

    describe('when the argument lenght is larger than 1', () => {
      it('should throw exception', () => {
        const fn = () => parseArgs('file', ['file1.js', 'file2.js']);

        expect(fn).to.throw(InvalidArgument);
      });
    });
  });

  describe('when config args is array', () => {
    describe('when length of args matches config', () => {
      it('should parse arguments into array', () => {
        const expected = {
          file1: 'file1.js',
          file2: 'file2.js',
        };

        const actual = parseArgs(
          ['file1', 'file2'],
          ['file1.js', 'file2.js'],
        );

        expect(actual).to.deep.equal(expected);
      });
    });

    describe('when lengtht of args does not match config', () => {
      it('should throw InvalidArgument exception', () => {
        const fn = () => parseArgs(['file1', 'file2'], ['file1.js']);

        expect(fn).to.throw(InvalidArgument);
      });
    });
  });

  describe('when config is invalid type', () => {
    it('should throw InvalidConfig exception', () => {
      // $FlowSuppress intentional error
      const fn = () => parseArgs(null, []);

      expect(fn).to.throw(InvalidConfig);
    });
  });
});