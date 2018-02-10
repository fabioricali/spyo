const Spyo = require('../');
const be = require('bejs');

describe('Spyo', function () {
    this.timeout(2000);

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

    it('detect if check is active, should be return true', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        const mySpy = new Spyo(myObject);

        myObject.firstName = 'John';
        mySpy.onChange((different, me) => {
            console.log('is different:', different);
        });

        setTimeout(()=>{
            if(mySpy.isWatching()) {
                mySpy.unwatch();
                done();
            }
        },500);
    });

    it('detect if check is active, should be return false', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        const mySpy = new Spyo(myObject);

        myObject.firstName = 'John';
        mySpy.onChange((different, me) => {
            me.unwatch();
            console.log('is different:', different);
        });

        setTimeout(()=>{
            if(!mySpy.isWatching()) {
                done();
            }
        },500);
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

    it('simulate immutable, reset, should be return false', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        const mySpy = new Spyo(myObject);

        const myNewObject = Object.assign({}, myObject);

        myNewObject.firstName = 'John';

        mySpy.reset(myNewObject);

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
            refreshHandler: getData
        });

        mySpy.onChange((different, me) => {
            console.log(me.obj.firstName);
            console.log('is different:', different);
            me.unwatch();
            be.err(done).true(different);
        });
    });

    it('simulate immutable and autoReset, should be return true', function (done) {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        let i = 0;

        function getData() {
            const myNewObject = Object.assign({}, myObject);
            myNewObject.firstName = 'John-' + Math.random();
            return myNewObject;
        }

        const mySpy = new Spyo(myObject, {
            autoReset: true,
            refreshHandler: getData
        });

        mySpy.onChange((different, me) => {
            ++i;
            console.log(me.obj.firstName);
            console.log('is different:', different);
            setTimeout(() => {
                me.unwatch();
                be.err(done).true(i > 1);
            }, 1500);

        });
    });
});