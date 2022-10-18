# babel-plugin-generate-api-doc



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
$ npm install babel-plugin-generate-api-doc
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["generate-api-doc"]
}
```

### Via CLI

```sh
$ babel --plugins generate-api-doc script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["generate-api-doc"]
});
```
