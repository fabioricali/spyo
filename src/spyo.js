const extend = require('defaulty');
const clone = require('clone');
const arrayme = require('arrayme');

/**
 * @class
 */
class Spyo {

    /**
     * Create instance
     * @param obj {Object} object that you want watch
     * @param [opts] {Object} configuration object
     * @param [opts.autoWatch=true] {boolean} auto watch
     * @param [opts.checkMs=50] {number} interval in milliseconds for every check
     * @param [opts.refreshHandler=null] {Function} refresh data source every check
     * @param [opts.exclude=null] {String|Array} exclude a property or more from check
     * @param [opts.autoReset=false] {boolean} reset changes detected after check
     */
    constructor(obj, opts = {}) {

        if (!Spyo.isIterable(obj))
            throw new TypeError('An object or an array is required');

        this.opts = extend.copy(opts, {
            autoWatch: true,
            checkMs: 50,
            refreshHandler: null,
            exclude: null,
            autoReset: false
        });

        this.opts.exclude = arrayme(this.opts.exclude);

        this.obj = obj;
        this.objCopy = clone(this.obj);

        this._onChange = () => {
        };

        this._intervalObject = null;

        this._lastState = null;

        if (this.opts.autoWatch)
            this.watch();
    }

    /**
     * Refresh data source object
     * @param obj
     */
    refresh(obj) {
        if (!Spyo.isIterable(obj))
            throw new TypeError('An object or an array is required');
        this.obj = obj;
    }

    /**
     * Check if it's different and call `onChange` callback
     * @returns {Spyo}
     */
    check() {
        if (typeof this.opts.refreshHandler === 'function')
            this.refresh(this.opts.refreshHandler());
        let state = this.isChanged();
        if (state !== this._lastState) {
            this._lastState = state;
            this._onChange.call(this, state, this);
        }
        if (this.opts.autoReset)
            this.reset();
        return this;
    }

    /**
     * Start watching
     * @returns {Spyo}
     */
    watch() {
        this._intervalObject = setInterval(() => {
            this.check();
        }, this.opts.checkMs);
        return this;
    }

    /**
     * Stop watching
     * @returns {Spyo}
     */
    unwatch() {
        clearInterval(this._intervalObject);
        this._intervalObject = null;
        return this;
    }

    /**
     * If check is active
     * @returns {boolean}
     */
    isWatching() {
        return Boolean(this._intervalObject);
    }

    /**
     * Fired when object is isChanged
     * @param callback
     * @returns {Spyo}
     */
    onChange(callback) {
        this._onChange = callback;
        return this;
    }

    /**
     * Check if object is changed
     * @returns {boolean}
     */
    isChanged() {
        return !Spyo.isEqual(
            this.obj,
            this.objCopy,
            this.opts.exclude
        );
    }

    /**
     * Reset changes detected
     * @returns {Spyo}
     */
    reset() {
        this._lastState = null;
        this.objCopy = clone(this.obj);
        return this;
    }

    /**
     * Check if two object are equals (deep check)
     * @param a {object} first object
     * @param b {object} second object
     * @param exclude {Array} exclude properties from check
     * @returns {boolean}
     */
    static isEqual(a, b, exclude = []) {
        if (Spyo.isIterable(a) && Spyo.isIterable(b)) {
            if (Object.keys(a).length !== Object.keys(b).length)
                return false;
            for (let prop in a) {
                if (exclude.indexOf(prop) === -1)
                    if (!(a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) || !Spyo.isEqual(a[prop], b[prop], exclude)) {
                        return false;
                    }
            }
            return true;
        } else {
            return Object.is(a, b);
        }
    }

    /**
     * Check if is an array or an plain object
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