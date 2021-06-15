# API (Backend)

Here are some notes for the development of the backend of the PayUfirst (PUF) project.

## Linters

- File .editorconfig : Standardize configurations between different editors

  - Website: <https://editorconfig.org/>
  - Work alongside EditorConfig for VS Code Extension

- File .eslintrc : Configuration for ESLint

- File .prettierrc : Prettier configuration

## Git

- File .gitignore

  - Website to make gitignore file: <https://www.toptal.com/developers/gitignore>

- Initialize project: `git init`
- Add files to commit: `git add .`
- Configure user
  - `git config --global user.email "joaolggross@gmail.com"`
  - `git config --global user.name "João Gross"`
- Make commit: `git commit -m <message>`
- Create new branch: `git checkout -b develop`
  - Development always on develop branch
- See git tree: `gitk`
  - Run this command on Git Bash

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
  - These dependencies are not commited for production

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
- Add git hook to check files in the staged area:
  - `yarn husky add .husky/pre-commit "yarn lint-staged $1"`
- Add git hook to check commit message:
  - `yarn husky add .husky/commit-msg "yarn commitlint --edit $1"`
