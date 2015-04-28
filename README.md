# Data Visualization Capstone API

A RESTful backend API for storing and retrieving GPS data for use in spatial data visualizations.

More information on the project can be found at the [Data Visualization Capstone's Front-End Repository](https://github.com/data-visualization-capstone/web)

Development:
---

> Open Terminal

```javascript
# Change directory into desired folder:
$ cd ~/path/to/folder/api

# Download repository from GitHub
$ git clone git@github.com:data-visualization-capstone/api.git

# After installing Node Package Manager, get dependencies
$ npm install

# Start the server
$ node server.js
```

Tips:
___

1.) Install nodemon for watching changes and auto-restarting the server.
> May require 'sudo' for permissions

```javascript
$ npm install -g nodemon
$ nodemon server.js
```

Testing:
---

Test the API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)

When the local development server is running, API requests can be send to [localhost:8080/api](http://localhost:8080/api), for example: [localhost:8080/api/users](http://localhost:8080/api/users)


Additional Sources and Libraries:
--- 

- [William Mora](http://www.williammora.com/)'s [Node.js & Socket.io Tutorial](http://www.williammora.com/2013/03/nodejs-tutorial-building-chatroom-with.html) & [Github Repo](https://github.com/wmora/nodejs-express-socketio-chatroom)
- [Scotch.io's RESTful API Tuorial](http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4) - [thanks to Chris Sevilleja](http://scotch.io/author/chris)
- [Node.js](http://nodejs.org/)
- [Underscore.js](http://underscorejs.org/)
- [Moment.js](http://momentjs.com/)
- [Express](http://expressjs.com/)

Authors
---
- [Alex Johnson](https://github.com/alexjohnson505)
- [Dana Bucci](https://github.com/danabucci)
