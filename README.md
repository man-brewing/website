# M.A.N. Brewing
The website frontend for Matt, Andy, and Nate's (M.A.N.) adventures into homebrewing. The site is also a test platform for the contributors to learn new technologies and test out web development.

## Hosting
A dynamic DNS service ([no-ip](https://www.noip.com/)) is used to direct traffic for the registered URL to a home server. This server uses [nginx](https://www.nginx.com) to reverse proxy connections to the appropriate endpoint since the hardware plays host to both this site and the [TeamCity](https://www.jetbrains.com/teamcity/) continuous integration platform that deploys this site automatically via GitHub hooks.

## beerroom/environment
This page is the dashboard for the beer room environment monitoring software which can be found [here](https://github.com/man-brewing/environment_monitor). [Chart.js](https://www.chartjs.org/) is used for graphing both the room temperature and humidity as well as outside/ambient data. The site is run on [Node](https://nodejs.org/en/) and can be deployed using `npm install` to download necessary packages and then `node man_brewing.js` to start the application.

## Backend
Data is stored using [MySQL](https://www.mysql.com/) and accessed via the [mysql npm package](https://www.npmjs.com/package/mysql).
