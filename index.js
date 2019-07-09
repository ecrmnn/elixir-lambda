'use strict';

const { execSync } = require('child_process');

const handle = async (event, context, callback) => {
  // const eventString = `~s(${JSON.stringify(event)})`;
  // const contextString = `~s(${JSON.stringify(context)})`;

  const binary = 'src/_build/prod/rel/lambda/bin/lambda_rc_exec.sh';

  try {
    const stdout = execSync(`${binary} eval 'Lambda.handle()'`, {
      encoding: 'utf8',
    });

    const output = stdout.split('\n');

    callback(null, {
      statusCode: 200,
      body: output[0],
    });
  } catch (error) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(error),
    });
  }
};

module.exports.handle = handle;
