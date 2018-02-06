const Spyo = require('../');

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

    it('first', function () {
        const myObject = {
            firstName: 'Mike',
            lastName: 'Red'
        };

        const mySpy = new Spyo(myObject);

        myObject.firstName = 'John';
        console.log(myObject);
    });
});