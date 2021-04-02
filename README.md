# NextJS Boilerplate

this project is a boilerplate to use in new project to avoid the configuration from zero, it has some capabilities such as:

-

but if you want to create a project from zero you can follow the steps bellow

# Getting Started with Nextjs

1. First, we need to create the project running the following commands;

```bash
npx create-next-app
# or
yarn create next-app
```

this command will generate a project with nextjs base project with the basic project configuration.

2. Configuring typescript on project (optional)

- create a `tsconfig.json` file in the root of the project
- run the command `yarn dev` or `npm run dev`
  - this command will detect that you want to use typescript and tell you to install some dependencies (`typescript @types/react @types/node`), you just need to follow the instructions, and run `yarn dev` or `npm run dev` again and the next will populate the `tsconfig.json` with the typescript config options.
- rename the files with jsx to `.tsx`

3. Create a `.editorconfig` file with the following options or with the options that you generally use, this file is to force the editor to use the same file formating in any env

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

4. Configuring eslint to force a style guide and fix or indicate some errors

- run `npx eslint --init`, this command will initialize the eslint config and prompt you some details about the configuration, so you can define the config based on your preferences, on finish this command will create a `.eslintrc` file with the extension that you selected.
- install the plugin eslint-plugin-react-hooks with the command ` npm install eslint-plugin-react-hooks --save-dev` or  `yarn add eslint-plugin-react-hooks --dev` to validade the use of react hooks
  - insert this configs on your `.eslintrc` file:
  ```
  {
    "plugins": [
      // ...
      "react-hooks"
    ],
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "rules": {
      // ...
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn".
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  }
  ```
- create a `.eslintignore` file to make the eslint ignore files that we dont need to check the style with the following content:

```
node_modules
jest.config.js
.next
```

5. Configuring prettier to force code style guide

- install this devDependencies `eslint-plugin-prettier eslint-config-prettier prettier`
- set this options on `.eslintrc` file:
```
{
 "extends": [
    // ...
    "plugin:prettier/recommended"
  ],
  "plugins": [
    // ...
    "prettier"
  ],
 "rules": {
    // ...
    "prettier/prettier": "error"
 }
}
```

6. Config husky and lint-staged to use git hooks (optional)

- install `husky lint-staged` as devDependencies
- configure husky with `yarn husky init` or `npx husky init`
- on `package.json` file create a section just like the following content:
```
"lint-staged": {
    "*.ts": [
      "eslint --fix -f html -o eslint.html"
    ]
  },
```
- on file `./husky/pre-commit` set this content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install lint-staged
```

7. Config commitlint with husky
- install `@commitlint/cli @commitlint/config-conventional` like devDependencies
- create a `commitlint.config.js` file
```javascript
module.exports = { extends: ['@commitlint/config-conventional'] };
```
- run the command `npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'` to configure the hook on husky

8. Config jest to create automated tests
- install the devDependencies `jest @types/jest @babel/preset-typescript @testing-library/jest-dom @testing-library/react`
- set jest env on `.eslintrc`
```
  "env": {
    // ...
    "jest": true
  },
```
- create a `jest.config.js` file
```javascript
module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/"
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts']
}
```
- config babel create a `.babelrc` file
```
{
  "presets": ["next/babel", "@babel/preset-typescript"]
}
```
- create a `.jest/setup.ts` file
```
import '@testing-library/jest-dom';
```
- set on lint-staged hooks to run the tests on commits
```
"lint-staged": {
    "*.ts": [
      "eslint --fix -f html -o eslint.html",
      "jest --bail --findRelatedTests"
    ]
  }
```

9. Config of styled-components
- install the dependencies `styled-components`
- install the devDependencies `jest-styled-components babel-plugin-styled-components @types/styled-components`
- set babel config
```
"plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": true
      }
    ]
  ]
```
- create a `_document.tsx` file
```typescript
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```
- creating a global style (optional)
  - create `src/styles/global.ts`
  ```typescript
  import { createGlobalStyle } from 'styled-components';

  const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  `;

  export default GlobalStyles;
  ```
  - create `src/pages/_app.tsx`
  ```typescript
  import { AppProps } from 'next/app';
  import Head from 'next/head';
  import GlobalStyles from 'styles/global';

  const App = ({ Component, pageProps }: AppProps) => {
    return (
      <>
        <Head>
          <title>NextJS Boilerplate</title>
          <link rel="shortcut icon" href="/img/icon" />
          <meta
            name="description"
            content="A simple project to be used like base with the config of typescript, styled components and NextJS"
          />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </>
    );
  };

  export default App;
  ```
- setting styled-components with jest, just need to add the following content to `.jest/steup.ts`
```
import 'jest-styled-components';
```

10. Configure PWA support on nextJS
- install depentencies `next-pwa webpack@4`
- create a `next.config.js` in the root of project
```javascript
const withPWA = require('next-pwa');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProduction
  }
});
```
- create a `public/manifest.json` file
```javascript
{
  "name": "NextJS - Boilerplate",
  "short_name": "NextJS Boilerplate",
  "icons": [
    {
      "src": "/img/icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/img/icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "background_color": "#638ecf",
  "description": "NextJS boilerplate using styled-components, jest, eslint and more.",
  "display": "fullscreen",
  "start_url": "/",
  "theme_color": "#638ecf"
}
```







