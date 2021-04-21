# Some useful Auth0 Rules
[Rules](https://auth0.com/docs/rules) are code snippets written in JavaScript that are executed as part of the authentication pipeline in [Auth0](https://www.auth0.com/). This happens every time a user authenticates to an application. Rules enable very powerful customizations and extensions to be easily added to Auth0.

### Supported Node runtime
At this time, both Node 4 and Node 8 are supported to run your Webtask code, however Node 4 is going out of [Long-term support](https://github.com/nodejs/Release#release-schedule). Migration guide [here](https://auth0.com/docs/migrations/guides/extensibility-node8).

### Avaiable Modules in Rules
* Webtask Modules: https://auth0-extensions.github.io/canirequire/
* Additional Modules: https://auth0.com/docs/appliance/modules

### Info for beginners
* Rules are executed after user authentication so they are part of the authorization process.
* Rules are run in order, so logically ordering your rules is important.
* Read Auth0 [best practices](https://auth0.com/docs/best-practices/rules) on Rules.

