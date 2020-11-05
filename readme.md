# Requirements

Docker, docker-compose - production build and database

Visual Studio Code, node.js - for development

# Installation

git clone git@github.com:TovarishN/vc.git VisionCraft

cd VisionCraft

npm i

# Run in docker
docker-compose -f compose.yml up

The web site is served on http://localhost:8080

There is a database admin site which is served on http://localhost:8081

Adminer credentials
   
      user: root
      password: example

#

It might take a while until containers are built and afterwards the database is initialized for the first time

## Run tests without debug
npm run test

## Develop
Open VisionCraft folder with Visual Studio Code

<img src="readme/Screenshot 2020-11-04 172345.png" />

## Debug configurations
Test - debug both client side and server side tests.

Client - serve client with parcel bundler on http://localhost:1234 with attached debugger 

Server - launch server only  (not very useful)

Client + Server - debug both client and server side





