#!/usr/bin/env node

import inquirer from 'inquirer';
import fetch from 'node-fetch';
import qs from 'qs';

const cliArgs = process.argv.slice(2);
const defaultUrl = cliArgs[0];

const main = async () => {
  try {
    const questions = [];

    let url = defaultUrl;
    if (!url) {
      questions.push({
        name: 'url',
        message: 'Enter the API URL:',
        validate: input => !!input || 'URL cannot be empty'
      });
    }

    questions.push(
      {
        name: 'method',
        message: 'Choose the HTTP method:',
        type: 'list',
        choices: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        default: 'GET'
      },
      {
        name: 'contentType',
        message: 'Select the Content-Type:',
        type: 'list',
        choices: [
          'text/plain',
          'application/json',
          'application/x-www-form-urlencoded'
        ],
        default: 'text/plain'
      }
    );

    const answers = await inquirer.prompt(questions);

    url = url || answers.url;
    const { method, contentType } = answers;

    let bodyText = null;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const { requestBody } = await inquirer.prompt([
        {
          name: 'requestBody',
          message: `Enter raw body text (JSON, XML, or text). Use \\n for new lines if needed:`,
          type: 'input'
        }
      ]);
      bodyText = requestBody.trim();
    }

    const headers = {
      'Content-Type': contentType
    };

    const options = {
      method,
      headers
    };

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      if (contentType === 'application/x-www-form-urlencoded') {
        // Convert manually entered string to key-value object
        const parsed = Object.fromEntries(new URLSearchParams(bodyText));
        options.body = qs.stringify(parsed);
      } else {
        options.body = bodyText;
      }
    }

    const res = await fetch(url, options);

    const text = await res.text();
    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = text;
    }

    if (!res.ok) {
      console.error(`\n❌ Error ${res.status}: ${res.statusText}`);
    }

    console.log('\n✅ Response:');
    console.log(typeof result === 'object' ? JSON.stringify(result, null, 2) : result);

  } catch (err) {
    console.error('\n❌ Unexpected Error:', err.message);
  }
};

main();