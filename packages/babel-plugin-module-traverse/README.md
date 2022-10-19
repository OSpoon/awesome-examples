# babel-plugin-module-traverse



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-module-traverse
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["module-traverse"]
}
```

### Via CLI

```sh
$ babel --plugins module-traverse script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["module-traverse"]
});
```
