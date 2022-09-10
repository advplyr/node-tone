const spawn = require('child_process').spawn
const tagPayloadParser = require('./tagPayloadParser')

function run(command, filepath, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(module.exports.TONE_PATH || 'tone', [command, filepath, ...args], { encoding: 'utf8' })

    const dataout = []
    const errorout = []
    proc.stdout.on('data', (data) => dataout.push(data))
    proc.stderr.on('data', (data) => errorout.push(data))

    var ExitCode = 0
    proc.on('exit', code => {
      ExitCode = code
    })
    proc.on('error', err => reject(err))
    proc.on('close', () => {
      if (ExitCode > 0) {
        reject(dataout.join(''))
      } else {
        resolve(dataout.join(''))
      }
    })
  })
}

module.exports.dump = async (file) => {
  if (!file) throw new Error('Invalid parameters')
  const response = await run('dump', file, ['--format', 'json'])
  return JSON.parse(response.replace(/[\n\r]+/g, ' ')) // Remove carriage returns
}

module.exports.tag = (file, tagPayload) => {
  if (!file || !tagPayload) throw new Error('Invalid parameters')
  const args = tagPayloadParser(tagPayload)
  return run('tag', file, args)
}