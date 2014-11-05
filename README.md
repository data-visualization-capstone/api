api
===

Node.js API for Stored and Retrieving GPS Data.

Running
===
Install Node Package Manager (NPM)

Download Dependencies:

``` npm install

Start Server

``` node server.js

Data
===

Users:
 - (String) id
 - (String) source

Location:
 - (String) id
 - (String) userId
 - (int) timestamp -> epoch time
 - (String) latitude
 - (String) longitude
