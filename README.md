# Spyo
Observe an object, check when it's change.

<a href="https://travis-ci.org/fabioricali/spyo" target="_blank"><img src="https://travis-ci.org/fabioricali/spyo.svg?branch=master" title="Build Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>

## Installation

### Node.js
```
npm install spyo --save
```

### Browser

#### Local
```html
<script src="node_modules/spyo/dist/spyo.min.js"></script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/spyo/dist/spyo.min.js"></script>
```

## Example
```javascript
const Spyo = require('spyo');

const myObject = {
    firstName: 'Mike',
    lastName: 'Red'
};

const mySpy = new Spyo(myObject);

myObject.firstName = 'John';

mySpy.onChange((different) => {
    console.log('is different:', different);
});
```

## API

<a name="Spyo"></a>

## Spyo
**Kind**: global class  

* [Spyo](#Spyo)
    * [new Spyo(obj, [opts])](#new_Spyo_new)
    * _instance_
        * [.refresh(obj)](#Spyo+refresh)
        * [.check()](#Spyo+check) ⇒ [<code>Spyo</code>](#Spyo)
        * [.watch()](#Spyo+watch) ⇒ [<code>Spyo</code>](#Spyo)
        * [.unwatch()](#Spyo+unwatch) ⇒ [<code>Spyo</code>](#Spyo)
        * [.isWatching()](#Spyo+isWatching) ⇒ <code>boolean</code>
        * [.onChange(callback)](#Spyo+onChange) ⇒ [<code>Spyo</code>](#Spyo)
        * [.isChanged()](#Spyo+isChanged) ⇒ <code>boolean</code>
        * [.reset()](#Spyo+reset) ⇒ [<code>Spyo</code>](#Spyo)
    * _static_
        * [.isEqual(a, b, exclude)](#Spyo.isEqual) ⇒ <code>boolean</code>
        * [.isIterable(obj)](#Spyo.isIterable) ⇒ <code>boolean</code>
        * [.isObject(obj)](#Spyo.isObject) ⇒ <code>boolean</code>
        * [.isArray(obj)](#Spyo.isArray) ⇒ <code>boolean</code>

<a name="new_Spyo_new"></a>

### new Spyo(obj, [opts])
Create instance

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>obj</td><td><code>Object</code></td><td></td><td><p>object that you want watch</p>
</td>
    </tr><tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>configuration object</p>
</td>
    </tr><tr>
    <td>[opts.autoWatch]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>auto watch</p>
</td>
    </tr><tr>
    <td>[opts.checkMs]</td><td><code>number</code></td><td><code>50</code></td><td><p>interval in milliseconds for every check</p>
</td>
    </tr><tr>
    <td>[opts.refreshHandler]</td><td><code>function</code></td><td><code></code></td><td><p>refresh data source every check</p>
</td>
    </tr><tr>
    <td>[opts.exclude]</td><td><code>String</code> | <code>Array</code></td><td><code></code></td><td><p>exclude a property or more from check</p>
</td>
    </tr><tr>
    <td>[opts.autoReset]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>reset changes detected after check</p>
</td>
    </tr>  </tbody>
</table>

<a name="Spyo+refresh"></a>

### spyo.refresh(obj)
Refresh data source object

**Kind**: instance method of [<code>Spyo</code>](#Spyo)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>obj</td>
    </tr>  </tbody>
</table>

<a name="Spyo+check"></a>

### spyo.check() ⇒ [<code>Spyo</code>](#Spyo)
Check if it's different and call `onChange` callback

**Kind**: instance method of [<code>Spyo</code>](#Spyo)  
<a name="Spyo+watch"></a>

### spyo.watch() ⇒ [<code>Spyo</code>](#Spyo)
Start watching

**Kind**: instance method of [<code>Spyo</code>](#Spyo)  
<a name="Spyo+unwatch"></a>

### spyo.unwatch() ⇒ [<code>Spyo</code>](#Spyo)
Stop watching

**Kind**: instance method of [<code>Spyo</code>](#Spyo)  
<a name="Spyo+isWatching"></a>

### spyo.isWatching() ⇒ <code>boolean</code>
Detect if check is active

**Kind**: instance method of [<code>Spyo</code>](#Spyo)  
<a name="Spyo+onChange"></a>

### spyo.onChange(callback) ⇒ [<code>Spyo</code>](#Spyo)
Fired when object is isChanged

**Kind**: instance method of [<code>Spyo</code>](#Spyo)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="Spyo+isChanged"></a>

### spyo.isChanged() ⇒ <code>boolean</code>
Check if object is changed

**Kind**: instance method of [<code>Spyo</code>](#Spyo)  
<a name="Spyo+reset"></a>

### spyo.reset() ⇒ [<code>Spyo</code>](#Spyo)
Reset changes detected

**Kind**: instance method of [<code>Spyo</code>](#Spyo)  
<a name="Spyo.isEqual"></a>

### Spyo.isEqual(a, b, exclude) ⇒ <code>boolean</code>
Check if two object are equals (deep check)

**Kind**: static method of [<code>Spyo</code>](#Spyo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>a</td><td><code>object</code></td><td><p>first object</p>
</td>
    </tr><tr>
    <td>b</td><td><code>object</code></td><td><p>second object</p>
</td>
    </tr><tr>
    <td>exclude</td><td><code>Array</code></td><td><p>exclude properties from check</p>
</td>
    </tr>  </tbody>
</table>

<a name="Spyo.isIterable"></a>

### Spyo.isIterable(obj) ⇒ <code>boolean</code>
Check if is an array or an plain object

**Kind**: static method of [<code>Spyo</code>](#Spyo)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>obj</td>
    </tr>  </tbody>
</table>

<a name="Spyo.isObject"></a>

### Spyo.isObject(obj) ⇒ <code>boolean</code>
Check for plain object

**Kind**: static method of [<code>Spyo</code>](#Spyo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>obj</td><td><code>*</code></td>
    </tr>  </tbody>
</table>

<a name="Spyo.isArray"></a>

### Spyo.isArray(obj) ⇒ <code>boolean</code>
Check for array

**Kind**: static method of [<code>Spyo</code>](#Spyo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>obj</td><td><code>*</code></td>
    </tr>  </tbody>
</table>


## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/spyo/blob/master/CHANGELOG.md">here</a>

## License
Spyo is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>