CPU load performance monitoring applicatin

## testing alarm / highlight functionality

In order to quickly test the functionality of the application under high / low load you can alter just 2 files:

1. - backend/routes/cpuLoad.js - you can add 1 to the result on line 7 / set it to a value of 1 and higher
2. src/utils/constants.js - remove a zero from first 3 variables - making the application query backend at 1 second intervals, displaying more recent load time and checking the load over last 12 seconds.

## Overall codestructure

The application consts of 2 components - :

### src/App.js

smart component responsible for all of the state / logic of the application

### src/components/Chart

simple wrapper component around Apex chart libraryfor passing the necessary configuration.

### backend/server.js

Express js configureation for the server

### routes/cpuLoad

api for querying the cpu load of the computer.

### src/utils/api.js

holds the functionality for communicatiing with the server

### src/utils/annotations.js

File keeping logicfor managing annotations - the configuration for adding the red highlights of high CPU usage time

### src/utils/alert.js

Simple alertingfunctionality that calls a normal alert when the loadstateofthe applicationchanges.

### src/utils/options.js

Apex charts configuration options

### src/utils/constants.js

constants for setting the application update speed, length of duration that needs to be viewed

### src/utils/helpers.js

utility functions for array manipulations, creating initial dummy data and etc.

### src/utils/load.js

load state functionality - checking whether system is under high or low load.
