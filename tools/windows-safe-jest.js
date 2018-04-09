const shell = require('shelljs') // eslint-disable-line import/no-extraneous-dependencies

/* remove backslash from env var 'TMP' watchman on windows */
if (process.env.TERM === 'msys' && process.env.TMP.endsWith('\\')) {
  // eslint-disable-next-line dot-notation
  shell.env['TMP'] = process.env.TMP.substr(0, process.env.TMP.length - 1)
}

shell.exec('jest')
