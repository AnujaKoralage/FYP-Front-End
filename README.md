# ELECTRONIC WALLET BASED FOREX TRADING SYSTEM [Front end]

Overall target is to develop a platform to invest money for poor know ledged people on rich know ledged people, then rich knowledge people can invest more money and earn more profits. Also, poor knowledge people can earn money without taking more risks. This application will able to develop a strong relationship between low level investors (trader) and high-level investors (investor). By using this application low level investor able to gather more money and earn more profits for themselves and for the money supplier (high level investor). Also, low level investor can earn more reputation based on him/her past investing activities.

### Built with


* [AngularJS] 
* HTML5
* CSS3/ Bootstrap
* Sockjs
* [jQuery]
* NPM

### Prerequisites

You need git to clone the `FYP-Front-End` repository. You can get git from [here].

We also use a number of Node.js tools to initialize and test `FYP-Front-End`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `FYP-Front-End`

Clone the `FYP-Front-End` repository using git:

```
https://github.com/AnujaKoralage/FYP-Front-End.git
cd FYP-Front-End
```

If you just want to start a new project without the `angular-seed` commit history then you can do:

```
git clone --depth=1 https://github.com/AnujaKoralage/FYP-Front-End.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and AngularJS framework code. The tools
help us manage and test the application.

* We get the tools we depend upon and the AngularJS code via `npm`, the [Node package manager][npm].
* In order to run the end-to-end tests, you will also need to have the
  [Java Development Kit (JDK)][jdk] installed on your machine. Check out the section on
  [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically copy the downloaded AngularJS files to `app/lib` so we
can simply do:

```
npm install
```

Behind the scenes this will also call `npm run copy-libs`, which copies the AngularJS files and
other front end dependencies. After that, you should find out that you have two new directories in
your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/lib` - contains the AngularJS framework files and other front end dependencies

*Note copying the AngularJS files from `node_modules` to `app/lib` makes it easier to serve the
files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:4200`][local-app-url].

### Folders structure
At the top level, the repository is split into a client folder and a server folder.  The client folder contains all the client-side AngularJS application.  The server folder contains a very basic Express based webserver that delivers and supports the application.
Within the client folder you have the following structure:
* `node_modules` contains build tasks for Grunt along with other, user-installed, Node packages
* `dist` contains build results
* `src` contains application's sources
* `test` contains test sources, configuration and dependencies
* `vendor` contains external dependencies for the application

## Testing

There are two kinds of tests in the `angular-seed` application: Unit tests and end-to-end tests.

### Running Unit Tests

The `angular-seed` app comes preconfigured with unit tests. These are written in [Jasmine][jasmine],
which we run with the [Karma][karma] test runner. We provide a Karma configuration file to run them.

* The configuration is found at `karma.conf.js`.
* The unit tests are found next to the code they are testing and have a `.spec.js` suffix (e.g.
  `view1.spec.js`).

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to
check that a particular version of the code is operating as expected. The project contains a
predefined script to do this:

```
npm run test-single-run
```


<a name="e2e-testing"></a>
### Running End-to-End Tests

The `angular-seed` app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner. It uses native events and has
special features for AngularJS applications.

* The configuration is found at `e2e-tests/protractor-conf.js`.
* The end-to-end tests are found in `e2e-tests/scenarios.js`.

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor can
interact with it.

**Before starting Protractor, open a separate terminal window and run:**

```
npm start
```

In addition, since Protractor is built upon WebDriver, we need to ensure that it is installed and
up-to-date. The `angular-seed` project is configured to do this automatically before running the
end-to-end tests, so you don't need to worry about it. If you want to manually update the WebDriver,
you can run:

```
npm run update-webdriver
```

Once you have ensured that the development web server hosting our application is up and running, you
can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

**Note:**
Under the hood, Protractor uses the [Selenium Standalone Server][selenium], which in turn requires
the [Java Development Kit (JDK)][jdk] to be installed on your local machine. Check this by running
`java -version` from the command line.

If JDK is not already installed, you can download it [here][jdk-download].


## Updating AngularJS and other dependencies

Since the AngularJS framework library code and tools are acquired through package managers (e.g.
npm) you can use these tools to easily update the dependencies. Simply run the preconfigured script:

```
npm run update-deps
```

This will call `npm update` and `npm run copy-libs`, which in turn will find and install the latest
versions that match the version ranges specified in the `package.json` file.

If you want to update a dependency to a version newer than what the specificed range would permit,
you can change the version range in `package.json` and then run `npm run update-deps` as usual.


## Loading AngularJS Asynchronously

The `angular-seed` project supports loading the framework and application scripts asynchronously.
The special `index-async.html` is designed to support this style of loading. For it to work you must
inject a piece of AngularJS JavaScript into the HTML page. The project has a predefined script to help
do this:

```
npm run update-index-async
```

This will copy the contents of the `angular-loader.js` library file into the `index-async.html`
page. You can run this every time you update the version of AngularJS that you are using.


## Serving the Application Files

While AngularJS is client-side-only technology and it is possible to create AngularJS web apps that
do not require a backend server at all, we recommend serving the project files using a local
web server during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, XHR,
etc to function properly when an HTML page is opened via the `file://` scheme instead of `http://`.

### Running the App during Development

The `angular-seed` project comes preconfigured with a local development web server. It is a Node.js
tool called [http-server][http-server]. You can start this web server with `npm start`, but you may
choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from any folder by running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own web server, such as Apache or Nginx. Just
configure your server to serve the files under the `app/` directory.

### Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system, but
the general rule is that all you need in production are the files under the `app/` directory.
Everything else should be omitted.

AngularJS apps are really just a bunch of static HTML, CSS and JavaScript files that need to be
hosted somewhere they can be accessed by browsers.

If your AngularJS app is talking to the backend server via XHR or other means, you need to figure
out what is the best way to host the static files to comply with the same origin policy if
applicable. Usually this is done by hosting the files by the backend server or through
reverse-proxying the backend server(s) and web server(s).
