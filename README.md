[![NPM](https://nodei.co/npm/callfetch.png)](https://www.npmjs.com/package/callfetch)


[![GitHub Sponsors](https://img.shields.io/github/sponsors/ankitkrks1?label=GitHub%20Sponsors&logo=github)](https://github.com/sponsors/ankitkrks1)

# callfetch

Simple CLI to call APIs using fetch — interactively choose method, headers and body or pass a URL directly.

Author: Ankit K Kashyap

## What is this all about?

`callfetch` is a small Node.js command-line tool for quickly calling HTTP APIs. It's useful for testing endpoints, debugging webhooks, or making one-off requests without writing code. It supports interactive prompts for method, content-type and body, and accepts a URL argument for quick requests.

## Installation

Using npx (no install required):

```bash
npx callfetch https://example.com/api
```

Install globally with npm:

```bash
npm i -g callfetch
# then run
callfetch https://example.com/api
```

Or add to your project:

```bash
npm i callfetch
# require/import and use if needed (the package is a CLI entrypoint)
```

## How to host / use / run

- Quick call by passing URL as first argument:

```bash
npx callfetch https://httpbin.org/get
```

- Interactive mode (no URL provided):

```bash
#npx callapi
npx callfetch
# You'll be prompted for URL, method, content-type and body (for POST/PUT/PATCH)
```

- Run directly with Node (for development):

```bash
node cli.js https://example.com
```

### What prompts look like
- URL (if not provided)
- HTTP method: GET, POST, PUT, DELETE, PATCH
- Content-Type: text/plain, application/json, application/x-www-form-urlencoded
- For POST/PUT/PATCH — you'll be asked for raw body text. If using `application/x-www-form-urlencoded`, the tool will parse key=value pairs and send a proper urlencoded body.

## Examples

GET request:

```bash
npx callfetch https://httpbin.org/get
```

POST JSON (interactive):

```bash
npx callapi
# choose POST, application/json, then paste JSON body
```

POST form urlencoded (interactive):

Enter body like:

```
name=Ankit&msg=hello
```

The CLI will convert that into `application/x-www-form-urlencoded` format.

## For development

1. Clone the repo
2. Install dependencies

```bash
npm i
```

3. Run locally

```bash
npm start
# or
node cli.js
```

## Files included in the package

Only `cli.js` is included in the published package (see `package.json` `files` field).

## Notes & edge cases

- `node-fetch` is used and the package is ESM (`type: "module"`).
- If you provide malformed JSON for a JSON content-type, the server may reject it — the CLI does not validate JSON before sending.
- `application/x-www-form-urlencoded` input is expected as `key=value&key2=value2` or similar; the CLI will parse it using URLSearchParams and re-encode using `qs`.

## License

MIT

## Donations / Support

If you like this project and want to support maintenance and development, you can:

Buy me a Dosha :

[![Open Collective](https://img.shields.io/opencollective/all/sharemydisk?logo=open-collective)](https://opencollective.com/sharemydisk)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/ankitkrks1?label=GitHub%20Sponsors&logo=github)](https://github.com/sponsors/ankitkrks1)
