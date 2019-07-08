'use strict';

const { execSync } = require('child_process');

const handle = async (event, context, callback) => {
  const eventString = `~s(${JSON.stringify(event)})`;
  const contextString = `~s(${JSON.stringify(context)})`;

  const mixPath = '../bin/elixir/1.8.0/bin/mix';

  try {
    const stdout = execSync([
      'cd src/',
      `${mixPath} run -e 'Lambda.handle(${eventString}, ${contextString})'`,
    ].join(' && '));

    const stdoutString = stdout.toString();
    const output = stdoutString.split('\n');

    if (output[0].includes('Compiling') && output[0].includes('(.ex)')) {
      output.shift();
    }

    callback(null, {
      statusCode: 200,
      body: output.toString(),
    });
  } catch (error) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(error),
    });
  }
};

module.exports.handle = handle;
