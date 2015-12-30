# EPA-V 0.0.1
Technology Stack
	Javascript
	Nodejs
	Angularjs
	Travis CI
	Mocha
	Karma
	Bower.io
	Gulp
	Hound CI
IDE for development
 	Webstorm v8/9/10
	 Plugins for Webstorm - JSLint, JSHint
deployement server
  	Heroku
Tools Prerequisites
	nodejs
	gulp
	karma-cli
Hound CI Limitations
 Hound Ci is a code review tool which basically does style checks. Certain limitation with hound is that it does not consider external       javascript libraries that has been preloaded, so  comments such as "Expected an assignment or function call and instead saw an expression.Add a line note" from hound are not valid.

Installation Process:
1. git clone https://github.com/cprakash-comtech/EPA
2. Navigate to directory where EPA has been cloned
3. Run npm install 
4. gulp dev (creates the build, start the server)

Current Deployment Process:
1.Contributor to the repository raises a pull request to merge to master branch
2.TravisCi runs the checks(mocha test cases and build).
3.As soon as the pull request is merged, the code gets auto deplpyed to heroku.

Working Prototype:
https://infinite-atoll-4296.herokuapp.com/#/
