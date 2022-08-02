import * as core from '@actions/core'
import * as cli from '@actions/exec'
import * as fs from 'fs'
import * as path from 'path'

async function execute () {
  const sourceFolder = core.getInput('source-folder')
  const sourceFile = core.getInput('source-file')
  const currentCompilerUrl = core.getInput('compiler-url')
  const workingDirectory = process.cwd()

  await cli.exec('ls')
  const yarnLock = path.join(workingDirectory, 'yarn.lock')
  const isYarnRepo = fs.existsSync(yarnLock)
  const packageLock = path.join(workingDirectory, 'package-lock.json')
  const isNPMrepo = fs.existsSync(packageLock)

  if (isYarnRepo) {
    await cli.exec('yarn', ['global', 'add', '@remix-project/remix-tests'])
  } else if (isNPMrepo) {
    await cli.exec('npm', ['install', '@remix-project/remix-tests', '-g'])
  } else {
    await cli.exec('npm', ['init', '-y'])
    await cli.exec('npm', ['install', '@remix-project/remix-tests', '-g'])
  }
  console.log(await fs.promises.readFile(isYarnRepo ? yarnLock : packageLock))
  console.log('sourceFolder: ', sourceFolder)
  console.log('sourceFile: ', sourceFile)


  await core.group("Run tests", async () => {

  })
}

execute().catch(error => {
  if (typeof (error) !== 'string') {
    if (error.message) error = error.message
    else {
      try { error = 'error: ' + JSON.stringify(error) } catch (e) { console.log(e) }
    }
  }
  core.setFailed(error)
})