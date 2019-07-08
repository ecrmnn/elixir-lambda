'use strict';

const { execSync } = require('child_process');

const handle = async (event, context, callback) => {
  const eventString = `~s(${JSON.stringify(event)})`;
  const contextString = `~s(${JSON.stringify(context)})`;

  try {
    const stdout = execSync(`cd src/ && mix run -e 'Lambda.handle(${eventString}, ${contextString})'`);

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
