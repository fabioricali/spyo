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

        Spyo.isEqual(this.obj, this.objCopy);
    }

    /**
     * Check if two object are equals (deep check)
     * @param a {object}
     * @param b {object}
     * @returns {boolean}
     */
    static isEqual(a, b) {
        if (Spyo.isIterable(a) && Spyo.isIterable(b)) {
            if (Object.keys(a).length !== Object.keys(b).length)
                return false;
            for (let prop in a) {
                if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
                    if (!Spyo.isEqual(a[prop], b[prop]))
                        return false;
                } else
                    return false;
            }

            return true;
        } else {
            return Object.is(a, b);
        }
    }

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    static isIterable(obj) {
        return Spyo.isObject(obj) || Spyo.isArray(obj);
    }

    /**
     * Check for plain object
     * @param obj {*}
     * @returns {boolean}
     */
    static isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    /**
     * Check for array
     * @param obj {*}
     * @returns {boolean}
     */
    static isArray(obj) {
        return Array.isArray(obj);
    }
}

module.exports = Spyo;