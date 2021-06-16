# API (Backend)

Here are some notes for the development of the backend of the PayUfirst (PUF) project.

## Technologies and packages

1. Linters: See Linters section

- Configuration files for eslint and prettier

2. Git: See Git section

- Most used git commands
- Use of gitk to see commit tree

3. Yarn: See Yarn section

- Initialize a Yarn project
- Used to add dependencies and development dependencies to our project
  - This dependencies are search and downloaded from the npm repository

4. Commit Quality: See Commit Quality section

- Husky used alongside other packages to check git commits
- Packages lint-staged, prettier, eslint, eslint-config-prettier, eslint-plugin-json, and eslint-plugin-prettier are used in the pre-commit step
- Packages commitlint, @commitlint/config-conventional, and @commitlint/cli are used to check the structure of the git commit message

5. Node.js: Used latest node version

6. VS Code: Development IDE

7. Babel : Transpiler

- We are able to use ES modules import structure and babel transpiles to CommonJS

## Install latest stable node version

- Tutorial: <https://blog.geekhunter.com.br/update-node-js-tutorial-facil-rapido/>

```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

## Linters

- File .editorconfig : Standardize configurations between different editors

  - Website: <https://editorconfig.org/>
  - Work alongside EditorConfig for VS Code Extension

- File .eslintrc : Configuration for ESLint

- File .prettierrc : Prettier configuration

## Git

- File .gitignore

  - Website to make gitignore file: <https://www.toptal.com/developers/gitignore>

1. Initialize project: `git init`
2. Add files to commit: `git add .`
3. Configure user

- `git config --global user.email "joaolggross@gmail.com"`
- `git config --global user.name "João Gross"`

4. Make commit: `git commit -m <message>`
5. Create new branch: `git checkout -b develop`

- Development always on develop branch

6. See git tree: `gitk`

- Run this command on Git Bash

7. Return to last commit: `git reset HEAD@{1} --soft`

- '--soft' : files return to staged area

## Yarn

- Initialize Yarn Project: `yarn init`. This creates a package.json file
  - question name (api): puf-api
  - question version (1.0.0): 0.0.0
  - question description:
  - question entry point (index.js):
  - question repository url:
  - question author (João Gross <joaolggross@gmail.com>): João Gross
  - question license (MIT):
  - question private: true

## Commit Quality

- Conventional Commits Website: <https://www.conventionalcommits.org/en/v1.0.0/>
  - The objective is to standardize commits for machines and humans
- How to configure the project so that commits are in this standard?

- Libraries:
  - lint-staged: <https://www.npmjs.com/package/lint-staged>
  - @commitlint/config-conventional: <https://www.npmjs.com/package/@commitlint/config-conventional>
  - @commitlint/cli: <https://www.npmjs.com/package/@commitlint/cli>
  - husky: <https://www.npmjs.com/package/husky>
- Add then as development dependency: `yarn add --dev <packages>`
  - `yarn add --dev lint-staged @commitlint/config-conventional @commitlint/cli husky`
  - These dependencies are not committed for production

### Configure commitlint

- Add to package.json:

```JSON
{
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
}
```

### Configure lint-staged

- Add to package.json:

```JSON
{
  "scripts": {
    "fix": "run-s \"fix:* {@}\" --",
    "fix:lint": "eslint --fix --no-error-on-unmatched-pattern",
    "fix:format": "prettier --write",
    "format": "yarn fix:format 'src/**/*.(js|ts|md|json)'",
    "lint": "yarn fix:lint src/**/*.{js,ts,md,json}",
  }

  "lint-staged": {
    "./app/**/*.{js,td,md,json}": [
      "yarn fix"
    ]
  }
}
```

- This dependency runs commands on the files in the gits staged area
- Files in the staged area are files added to be committed
- We need to add another development dependency to use 'run-s':
  - `yarn add --dev npm-run-all`

### Initialize Husky

- Init Husky: `yarn husky install`
- Husky adds git hooks
  - Add commands to run before or after git
- Add git hook to pass eslint in files inside the staged area:
  - `yarn husky add .husky/pre-commit "yarn lint-staged $1"`
  - Files are formatted before commit
- Add git hook to check commit message:
  - `yarn husky add .husky/commit-msg "yarn commitlint --edit $1"`
  - Commit message structure is checked before commit

### Install eslint

- Install command:

```bash
yarn add --dev prettier eslint eslint-config-prettier eslint-plugin-json eslint-plugin-prettier
```

## Babel

1. Description

- Babel is a transpiler. It is important so we can use ES modules and babel converts to CommonJS

2. Install command:

```bash
yarn add --dev @babel/cli @babel/core @babel/node @babel/preset-env
```

3. Configure babel: New file babel.config.js

- Packages for babel configuration: `yarn add --dev @babel/plugin-proposal-optional-chaining babel-plugin-module-resolver`

4. Script in package.json:

```JSON
"scripts:" {
  "prebuild": "rm -Rf ./dist",
  "build": "babel src --extensions \".js\" --ignore \"*.spec.js,*.test.js\" --out-dir dist --copy-files",
}
```

- Build application for production

## Nodemon

1. Description

- Puts the application up and running and listens to changes in the code.
- After every change nodemon refreshes the application that is running

2. Install command: `yarn add --dev nodemon`

3. Script in package.json:

```JSON
"scripts": {
  "dev": "nodemon --legacy-watch --exec babel-node src/index.js"
}
```

- For Windows 10 users, using WSL 2 in VS Code, the '-L' option for nodemon is required in order to enable hot reload. It turns out that WSL2 doesn't fully support inotify on the Windows filesystem (being handled by the 9P filesystem protocol), so 'legacy watcher' is needed.
  - Hot reload problem with WSL 2: <https://stackoverflow.com/questions/63402588/how-can-nodemon-be-made-to-work-with-wsl-2>
  - Using WSL 2 with VS Code: <https://docs.microsoft.com/pt-br/windows/wsl/tutorials/wsl-vscode>
  - WSL 2, VSCode, zsh, oh my zsh, spaceship, and Remote WSL: <https://mateusmlo.medium.com/guia-windows-terminal-wsl-2-e-vs-code-24a4635bef41>
