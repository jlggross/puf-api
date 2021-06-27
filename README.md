# API (Backend)

Here are some notes for the development of the backend of the PayUfirst (PUF) project.

## **Technologies and packages**

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

8. Koa.js : Framework

9. Environment Variables

10. Database

- PostgreSQL Configuration
- Beekeeper Studio: Visualize database
- Prisma: Schema, Generation and Migration
  - CRUD in the database
- Insomnia: Test routes and requests (GET, POST, PUT, DELETE)

11. Authentication

- JWT (JSON Web Token)
- Bcrypt
- Basic Auth (HTTP)

12. Automated Tests

## **Install latest stable node version**

- Tutorial: <https://blog.geekhunter.com.br/update-node-js-tutorial-facil-rapido/>

```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

## **Linters**

- File .editorconfig : Standardize configurations between different editors

  - Website: <https://editorconfig.org/>
  - Work alongside EditorConfig for VS Code Extension

- File .eslintrc : Configuration for ESLint

- File .prettierrc : Prettier configuration

## **Git**

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

8. Add files to last commit

```
git commit --amend  # Able to edit commit message
```

```
git commit --amend --no-edit # Do not edit last commit message
```

## **Yarn**

- Initialize Yarn Project: `yarn init`. This creates a package.json file
  - question name (api): puf-api
  - question version (1.0.0): 0.0.0
  - question description:
  - question entry point (index.js):
  - question repository url:
  - question author (João Gross <joaolggross@gmail.com>): João Gross
  - question license (MIT):
  - question private: true

## **Commit Quality**

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

### **Configure commitlint**

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

### **Configure lint-staged**

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

### **Initialize Husky**

- Init Husky: `yarn husky install`
- Husky adds git hooks
  - Add commands to run before or after git
- Add git hook to pass eslint in files inside the staged area:
  - `yarn husky add .husky/pre-commit "yarn lint-staged $1"`
  - Files are formatted before commit
- Add git hook to check commit message:
  - `yarn husky add .husky/commit-msg "yarn commitlint --edit $1"`
  - Commit message structure is checked before commit

### **Install eslint**

- Install command:

```bash
yarn add --dev prettier eslint eslint-config-prettier eslint-plugin-json eslint-plugin-prettier
```

## **Babel**

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

## **Nodemon**

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

## **Task Management**

1. ClickUp: <https://clickup.com/>
2. teamwork: <https://www.teamwork.com/>
3. Asana: <https://asana.com/>
   1. Has subtasks inside a card
4. Trello: <https://trello.com/pt-BR>
5. Jira: <https://www.atlassian.com/br/software/jira>
6. GitHub Project

## **Koa.js**

- Similar to Express, but simpler
- Does middleware management
- Install koa: `yarn add koa`
- To run the server: `yarn dev`
  - Access in the browser: localhost:3000

### **Koa Body Parser**

- Github: <https://github.com/koajs/bodyparser>
- Install: `yarn add koa-bodyparser`

### **Koa Router**

- Router middleware for koa
- Website: <https://www.npmjs.com/package/@koa/router>
- Github: <https://github.com/koajs/router>
  - API reference: <https://github.com/koajs/router/blob/master/API.md>
- Install: `yarn add @koa/router`

## **Environment Variables**

- File: .env
- Extension for VS Code: DotENV
- NPM package: dotenv
  - Website: <https://www.npmjs.com/package/dotenv>
  - Install: `yarn add dotenv`
- NPM package: dotenv-safe
  - Website: <https://www.npmjs.com/package/dotenv-safe>
  - Install: `yarn add dotenv-safe`
  - The same as dotenv, but also reads any variables defined in '.env.example'
    - '.env.example' has the same variables as '.env' but with no values
    - '.env.example' is versionated

## **Database: PostgreSQL**

- Latest PostgreSQL docker image: <https://hub.docker.com/_/postgres>
- Configure Docker Desktop for WSL 2: <https://docs.docker.com/docker-for-windows/wsl/>

1. Create docker-compose.yml
2. Configure docker-compose.yml
3. Run `docker-compose up -dC`
   1. This will download postgres docker image from docker repository if not yet downloaded
4. Run `docker ps -a`
   1. To check running docker images
5. Run `docker exec -it db bash`
   1. Enter container 'db' and open bash
6. Run `docker logs -f db` to check image logs

### **Work with Database: Prisma**

- Website: <https://www.prisma.io/>
  - Others
    - Sequelize: <http://sequelize.org/>
    - Mongoose: <https://mongoosejs.com/>
    - TypeORM: <https://typeorm.io/#/>
- Install: `yarn add prisma`
- Prisma support to JavaScript and Typescript
- Prisma support to MySQL, PostgreSQL, SQLite
- VS Code Extension: Prisma
  - Highlight and autocompletion

1. Create a file prisma/schema.prisma
2. Configure 'schema.prisma'
   1. Steps here: <https://www.prisma.io/docs/concepts/components/prisma-client>
3. Run `yarn prisma generate` to create '@prisma/client' in node_modules/
4. Create database with Prisma Migrate `yarn prisma migrate dev --preview-feature`
   1. Postgres docker image must be running
   2. Choose name for migration

- Everytime we change the prisma schema we have to create a new Prisma Client:

```
yarn prisma generate
```

### **ER Modeling**

- MySQL Worbench: <https://www.mysql.com/products/workbench/>
- dbdiagram.io: <https://dbdiagram.io/home>

### **pgAdmin and Beekeper Studio**

pgAdmin:

- Used to visualize the database
- Website: <https://www.pgadmin.org/download/>

Beekeeper Studio

- Website: <https://www.beekeeperstudio.io/>
- Configuration:
  - Connection Type: postgres
  - Host: localhost
  - Port: 9900
  - User: puf_admin
  - Password: puf_pass
  - Default Database: puf
  - Save Connection: PUF LOCAL

## **Authentication (Stateless)**

Information for authentication:

- Login
  - Email (Username)
  - Magiclink
- Password

Authentication steps:

1. User inserts email and password to login
2. Server identifies user in the database and returns the user a token
   1. JWT (JSON Web token)
3. JWT is stored in the front-end (user)
4. For every request the user send the JWT to the server for authentication
   1. Stateless approach (no user session state is saved)

### **Asymmetric Cryptography**

User A

- Public key
- Private key

User B

- Public key
- Private key

Message flow for authenticity:

1. User A wants to send message to user B
2. User A cryptographs his message with his private key and send to User B
3. User B takes cryptographed message and uses public key from User A to access the message original content

Message flow for privacy:

1. User A wants to send message to user B
2. User A cryptographs his message with public key from User B and send to User B
3. User B takes cryptographed message and uses his private key A to access the message original content

### **JWT (JSON Web Token)**

More info: <https://dev.to/brunobertolini/tudo-o-que-voce-precisa-saber-sobre-json-web-tokens-5dn7>

Pattern with

- Header: Object with meta informations
  - Algorithm: Most used is HS256
- Payload: Message to be sent
  - Other informations: User id
- Signature: Hash with origin private key (guarantees authenticity)
  - Payload must not have sensitive information

Website: <https://jwt.io/>

Project dependency:

```bash
yarn add jsonwebtoken
```

### **User password in the database**

- We have to save the passwords in the database with criptography (hashed password)
  - Use of one-way criptography
- To check the users password we take the password the user informed, criptograph it and compare with the criptographed password already in the database.
  - This can be done with `bcript.compare(password, hashedPassword)`.

Project dependency:

```bash
yarn add bcryptjs
```

### **Basic Auth (HTTP)**

- Basic Auth from HTTP treats email and password in the header, instead of the payload of the request
- In Insomnia we can choose set a **GET** operation to localhost:\<port\>/login
  - Body: No Body
  - Auth: Basic Auth
- The header of the GET message will have a string similar to: ""Basic \<base64 encoded user:password\>"

  - The username and the password are encoded in base64

- More on HTTP Authentication: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication>

### **Resume**

1. JWT: Use of private key for authentication. The user will use this token to make all the requests to the server when logged in the system.

2. Bcrypt: Used to cryptograph and information. It is not possible do decryptograph. Used to save the user password in the database.

3. Basic Auth (HTTP): Encode username and password provided by the user when trying to make a login. The API decoded this information and later see if the user is authorized.

### **HTTPS**

- Use of asynchronous cryptography

## **Automated Tests**

- Tests are used to check is the functions are returning the expected values.
- It serves as an extra documentation about how each function works.
- Abstractions to tests are not desired in automated tests, because tests must be clear.

- TDD (Test-Driven Development): FAIL -> PASS -> REFACTOR -> FAIL

### Jest

- Website: <https://jestjs.io/pt-BR/>
- Dependency: `yarn add --dev jest`
- Run: `yarn jest`

- Test Types (test Pyramid)

  - Unit
    - Fast test, but more expensive (takes time to make them).
  - Integration
    - Test integration between different parts of the code.
    - Ensures that the system is working properly.
    - Most cost-effective tests oin the Test Pyramid.
  - UI (User Interface)
    - Also called E2E (End-to-End) tests.
    - Cheaper, less tests to make, easier to make, but takes more time to execute.
    - End to End Framework: <https://www.cypress.io/>
      - Cypress tests the interface
      - It is an online tool
    - Detox: <https://github.com/wix/Detox>
      - Much use with React Native

#### **Unit Test**

Test steps:

```javascript
describe('User module', () => {
	it('should return credentials by basic authentication token', () => {
		// Preparation
		// Execution
		// Expected return
	})
})
```

#### **Integration Test**

- Package: supertest
- Website: <https://www.npmjs.com/package/supertest>
- Yarn dev dependency:

```bash
yarn add --dev supertest
```

- Run specific test: `yarn test src/routes.test.js`
