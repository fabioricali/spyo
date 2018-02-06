const extend = require('defaulty');
const clone = require('clone');

class Spyo {

    constructor(obj, opts = {}) {

        if (!Spyo.isObject(obj))
            throw new TypeError('An object is required');

        this.opts = extend.copy(opts, {
            autoCheck: true,
            checkMs: 50
        });

        this.objCopy = clone(obj);
        this.obj = obj;

        Spyo.equal(this.obj, this.objCopy);
    }

    /**
     * Check if two object are equals (deep check)
     * @param a {object}
     * @param b {object}
     * @returns {boolean}
     */
    static equal(a, b) {
        if (Object.keys(a).length !== Object.keys(b).length)
            return false;
        for (let prop in a) {
            if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
                if (!Spyo.equal(a[prop], b[prop]))
                    return false;
            } else
                return false;
        }

        return true;
    }

    /**
     * Check for plain object
     * @param obj {*}
     * @returns {boolean}
     */
    static isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
}

module.exports = Spyo;