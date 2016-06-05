# winston-gke
Winston logger decorator for use with Google Container Engine's "fluentd-cloud-logging-gke" container

Google Container Engine makes it really easy to get your logs from stdout to Google Cloud Logging, but Winston's
Console transport doesn't play nice by default. Pass any logger instance to `winston-gke` and it will configure things for you.

## Available Log Levels

These match what's available with Google Cloud Logging:

* debug
* info
* warning
* error
* critical

## Usage

```javascript
var winston = require('winston');
var gke = require('winston-gke');

var logger = gke(new winston.Logger());

logger.debug('debug!'); // {"severity":"DEBUG","message":"debug!"}
logger.info('info!', {somekey: 'This is some metadata'}); // {"severity":"INFO","message":"info!","meta":{"somekey":"This is some metadata"}}
```
