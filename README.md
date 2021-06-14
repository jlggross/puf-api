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
