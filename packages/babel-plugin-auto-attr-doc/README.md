# babel-plugin-auto-attr-doc



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
$ npm install babel-plugin-auto-attr-doc
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["auto-attr-doc"]
}
```

### Via CLI

```sh
$ babel --plugins auto-attr-doc script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["auto-attr-doc"]
});
```
