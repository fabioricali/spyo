const Spyo = require('../');
const be = require('bejs');

describe('Spyo', function () {

    it('should be return type error', function (done) {

        try {
            new Spyo(null);
            done('error');
        } catch (e) {
            console.log(e);
            done();
        }
    });

    it('update object, should be return true', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        const mySpy = new Spyo(myObject);

        myObject.firstName = 'John';
        mySpy.onChange((different, me) => {
            console.log('is different:', different);
            me.unwatch();
            be.err(done).true(different);
        });
    });

    it('no changes, should be return false', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        const mySpy = new Spyo(myObject);

        mySpy.onChange((different, me) => {
            console.log('is different:', different);
            me.unwatch();
            be.err(done).false(different);
        });
    });

    it('simulate immutable, should be return true', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        const mySpy = new Spyo(myObject);

        const myNewObject = Object.assign({}, myObject);

        myNewObject.firstName = 'John';

        mySpy.refresh(myNewObject);

        mySpy.onChange((different, me) => {
            console.log('is different:', different);
            me.unwatch();
            be.err(done).true(different);
        });
    });

    it('simulate immutable, sync, should be return false', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        const mySpy = new Spyo(myObject);

        const myNewObject = Object.assign({}, myObject);

        myNewObject.firstName = 'John';

        mySpy.sync(myNewObject);

        mySpy.onChange((different, me) => {
            console.log('is different:', different);
            me.unwatch();
            be.err(done).false(different);
        });
    });

    it('simulate immutable and getter function, should be return true', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        function getData() {
            const myNewObject = Object.assign({}, myObject);
            myNewObject.firstName = 'John';
            return myNewObject;
        }

        const mySpy = new Spyo(myObject, {
            refreshHandler: getData()
        });

        mySpy.onChange((different, me) => {
            console.log('is different:', different);
            me.unwatch();
            be.err(done).true(different);
        });
    });
});