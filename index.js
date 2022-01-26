'use strict'

const abstractTransport = require('pino-abstract-transport');

function build(opts) {
  return abstractTransport( async function (source) {
    for await (let obj of source) {
      if (obj.err) {
        // error logs
        process.stdout.write(
          '|' +
          obj.level +
          '|' +
          (obj.rid || 'na') +
          '| ' +
          obj.msg +
          '. Err = ' +
          (obj?.err?.message || 'No message') +
          '. Stack: ' +
          (obj?.err?.stack || '').replace('\n', ',') +
          '\n',
        );
      } else {
        process.stdout.write('|' + obj.level + '|' + (obj.rid || 'na') + '| ' + obj.msg + '\n');
      }
    }
  }, {
    async close(err) {
      console.error(err);
    },
  })
}

module.exports = build;
module.exports.default = build;
