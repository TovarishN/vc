# Requirements

Docker, docker-compose - production build and database

Visual Studio Code, node.js - for development

# Installation

git clone git@github.com:TovarishN/vc.git VisionCraft

cd VisionCraft

npm i

# Run in docker
docker-compose -f compose.yml up

   http://localhost:8080

it might take a while until containers are built

## Develop
Open VisionCraft folder with Visual Studio Code

<img src="readme/Screenshot 2020-11-04 172345.png" />


## Debug configurations
Test - debug both client side and server side tests.

Client - serve client with parcel bundler on http://localhost:1234 with attached debugger 

Server - launch server only  (not very useful)

Client + Server - debug both client and server side



