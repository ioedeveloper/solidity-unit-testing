import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as fs from 'fs/promises'

async function execute () {
  const sourceFolder = core.getInput('source-folder')
  const sourceFile = core.getInput('source-file')
  const currentCompilerUrl = core.getInput('compiler-url')

  exec.exec('ls')
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