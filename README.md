# carbon-icons-lit

`@carbon/icons` for `lit`

This package is automatically updated when `@carbon/icons` updates. The version on this package is kept in sync with `@carbon/icons`.
. It pulls in the icons and exports them as `lit-html` `svg` tags. 
It is therefore very efficient and only includes very little code:

```bash
$ tree node_modules/carbon-icons-lit/
│ ...
├── user/ 
│   ├── 16.d.ts
│   ├── 16.js
│   ├── 20.d.ts
│   ├── 20.js
│   ├── 24.d.ts
│   ├── 24.js
│   ├── 32.d.ts
│   └── 32.js
└── ...
$ bat node_modules/carbon-icons-lit/16.*
───────┬───────────────────────────────────────────────────────────────
       │ File: user/16.d.ts
───────┼───────────────────────────────────────────────────────────────
   1   │ declare const _default: import("lit-html").TemplateResult<2>;
   2   │ export default _default;
───────┴───────────────────────────────────────────────────────────────
───────┬───────────────────────────────────────────────────────────────
       │ File: user/16.js
───────┼───────────────────────────────────────────────────────────────
   1   │ import { svg } from "lit-html";
   2   │ export default svg`<svg ...><path d="M8 2c1.4 0 2.5...</svg>`;
```
see all files here on [npm](https://www.npmjs.com/package/carbon-icons-lit?activeTab=code)

## Usage

```bash
npm i -D carbon-icons-lit
```

```js
import UserIcon from 'carbon-icons-lit/user/32';

@customElement('my-element')
export class MyElement extends LitElement {
  render() {
    return html`
        <div>
            ${UserIcon}
        </div>
    `
  }
}
```

