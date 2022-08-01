import * as core from '@actions/core'
import * as github from '@actions/exec'

async function execute () {
  const currentDirectory = process.cwd()
  const sourceFolder = core.getInput('source-folder') || ''
  const sourceFile = core.getInput('source-file') || ''

  console.log('sourceFolder: ', sourceFolder)
  console.log('sourceFile: ', sourceFile)
  console.log('currentDirectory: ', currentDirectory)

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