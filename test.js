'use strict';

var gke = require('./');
var winston = require('winston');

var stdMocks = require('std-mocks');
var expect = require('expect');

describe('winston-gke', function() {

  it('sets log levels that match google stackdriver\'s level', function() {
    var logger = gke(new winston.Logger());

    expect(logger.debug).toBeA(Function);
    expect(logger.info).toBeA(Function);
    expect(logger.warning).toBeA(Function);
    expect(logger.error).toBeA(Function);
    expect(logger.critical).toBeA(Function);
  });

  it('sets winston\'s minimum log level to level passed', function() {
    var onLog = expect.createSpy();
    var logger = gke(new winston.Logger(), 'info');

    stdMocks.use();

    logger.on('logging', onLog);
    logger.debug('message');
    expect(onLog.calls.length).toBe(0);
    logger.info('message');
    expect(onLog.calls.length).toBe(1);

    stdMocks.restore();
    stdMocks.flush();

  });

  it('defaults winston\'s minimum log level to debug', function() {
    var onLog = expect.createSpy();
    var logger = gke(new winston.Logger());

    stdMocks.use();

    logger.on('logging', onLog);
    logger.debug('message');
    expect(onLog.calls.length).toBe(1);

    stdMocks.restore();
    stdMocks.flush();

  });

  it('formats console output to JSON consumable by the fluentd-cloud-logging-gke container', function() {
    var output;
    var logger = gke(new winston.Logger());

    stdMocks.use();

    logger.warning('message');
    stdMocks.restore();
    output = stdMocks.flush();

    expect(output.stdout).toEqual('{"severity":"WARNING","message":"message"}\n');

    stdMocks.use();

    logger.info('info message', { anything: 'This is metadata' });
    stdMocks.restore();
    output = stdMocks.flush();

    expect(output.stdout).toEqual('{"meta":{"anything":"This is metadata"},"severity":"INFO","message":"info message"}\n');

  });

});
