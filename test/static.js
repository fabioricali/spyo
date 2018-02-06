const Spyo = require('../');
const be = require('bejs');

describe('static', function () {

    describe('equal', function () {

        it('should be return true', function () {
            let a = {a: 1};
            let b = {a: 1};
            be.err.true(Spyo.equal(a, b));
        });

        it('should be return false', function () {
            let a = {a: 1};
            let b = {a: 2};
            be.err.false(Spyo.equal(a, b));
        });

    });

});