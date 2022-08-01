import * as core from '@actions/core'
import * as github from '@actions/exec'
import { UnitTestRunner, assertLibCode } from '@remix-project/remix-tests'
import * as fs from 'fs/promises'

async function execute () {
  const currentDirectory = process.cwd()
  const sourceFolder = core.getInput('source-folder') || ''
  const sourceFile = core.getInput('source-file') || ''
  const testRunner = new UnitTestRunner()

  console.log('sourceFolder: ', sourceFolder)
  console.log('sourceFile: ', sourceFile)
  console.log('currentDirectory: ', currentDirectory)

  await core.group("Initialize Tests", async () => {
    await testRunner.init()
    const testFileContent = await fs.readFile(sourceFile, 'utf8')
    const testDirContent = await fs.readdir(sourceFolder)

    console.log('testFileContent: ', testFileContent)
    console.log('testDirContent: ', testDirContent)
  })

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