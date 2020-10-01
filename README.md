# @dn-l/react-bootstrap-toggle

React toggle component based on Bootstrap 4

[Playground](https://codesandbox.io/s/dn-lreact-bootstrap-toggle-example-g7mrj?file=/src/styles.scss)

## Quickstart

1. Install npm package:

```bash
npm i @dn-l/react-bootstrap-toggle
```

```bash
yarn add @dn-l/react-bootstrap-toggle
```

2. Add styles to your `scss/sass` file (Toggle component follows button padding variables):

```scss
@import "~bootstrap/scss/_functions";
@import "~bootstrap/scss/_variables";

.bootstrap-toggle {
  .animate {
    transition: $transition-base;
  }

  .caption {
    padding: $btn-padding-y $btn-padding-x;
  }
}
```

3. That's it! Component accepts some [additional props](src/index.tsx#L14) for your convenience. Usage:

```js
import Toggle from "@dn-l/react-bootstrap-toggle";

<Toggle />;
```
