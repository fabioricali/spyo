const Spyo = require('../');
const be = require('bejs');

describe('static', function () {

    describe('isEqual', function () {

        it('should be return true', function () {
            let a = {a: 1};
            let b = {a: 1};
            be.err.true(Spyo.isEqual(a, b));
        });

        it('should be return false', function () {
            let a = {a: 1};
            let b = {a: 2};
            be.err.false(Spyo.isEqual(a, b));
        });

        it('deep, should be return true', function () {
            let a = {a: 1, c: {d: [1,2]}};
            let b = {a: 1, c: {d: [1,2]}};
            be.err.true(Spyo.isEqual(a, b));
        });

        it('deep, should be return false', function () {
            let a = {a: 1, c: {d: [1,2]}};
            let b = {a: 1, c: {d: [3,2]}};
            be.err.false(Spyo.isEqual(a, b));
        });

        it('numeric value, should be return false', function () {
            let a = {a: 1};
            let b = {a: '1'};
            be.err.false(Spyo.isEqual(a, b));
        });

        it('boolean value, should be return false', function () {
            let a = {a: 0};
            let b = {a: false};
            be.err.false(Spyo.isEqual(a, b));
        });

        it('array, should be return true', function () {
            let a = [1,2];
            let b = [1,2];
            be.err.true(Spyo.isEqual(a, b));
        });

        it('array, should be return false', function () {
            let a = [1,2];
            let b = [1,1];
            be.err.false(Spyo.isEqual(a, b));
        });

        it('object in array, should be return true', function () {
            let a = [1, {a: 2}];
            let b = [1, {a: 2}];
            be.err.true(Spyo.isEqual(a, b));
        });

        it('object in array, should be return false', function () {
            let a = [1, {a: 2}];
            let b = [1, {a: 3}];
            be.err.false(Spyo.isEqual(a, b));
        });

        it('exclude, should be return true', function () {
            let a = {a: 2, b: 5};
            let b = {a: 3, b: 5};
            be.err.true(Spyo.isEqual(a, b, ['a']));
        });

        it('exclude deeper, should be return true', function () {
            let a = {a: 3, b: 5, c: {d: [{e:3}]}};
            let b = {a: 3, b: 5, c: {d: [{e:4}]}};
            be.err.true(Spyo.isEqual(a, b, ['e']));
        });

        it('exclude deeper, should be return false', function () {
            let a = {a: 3, b: 5, c: {d: [{e:3}]}};
            let b = {a: 3, b: 4, c: {d: [{e:4}]}};
            be.err.false(Spyo.isEqual(a, b, ['e']));
        });

    });

    describe('isObject', function () {
        it('should be return true', function () {
            be.err.true(Spyo.isObject({}));
        });
        it('should be return false', function () {
            be.err.false(Spyo.isObject([]));
        });
    });
});