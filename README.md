# bytion

This back end server has 3 functions

1. Provide a RESTful API that enables the simulation of a event from GitHub (its webhook API)
2. Provides a RESTful API for logging events of interest (emails w/microsoft.com) in the event to a DB
3. A websockets server to communicate with the browser SPA to dynamically update it when an event comes in (simulated by the POST in step 1)


Run it by issueing the command 'npm test' after cloning and installing it
