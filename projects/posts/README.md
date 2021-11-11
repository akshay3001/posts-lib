# Posts lib

Library that uses JSON Placeholder's Post API https://jsonplaceholder.typicode.com/

## Installation

```bash
  npm i posts-lib-poc
```

## Usage

Import PostsModule in app.module.ts

```javascript
import { PostsModule } from "posts-lib-poc";
```

In Markup use

```html
<lib-posts></lib-posts>
```

Supported query params

```javascript
_page
_end
_order,
_q,
_sort,
_start,
```

For more documentation on how to use - https://github.com/typicode/json-server
