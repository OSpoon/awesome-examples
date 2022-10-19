# babel-plugin-module-imports



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
$ npm install babel-plugin-module-imports
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["module-imports"]
}
```

### Via CLI

```sh
$ babel --plugins module-imports script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["module-imports"]
});
```
