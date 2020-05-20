import * as path from 'path'
import * as fs from 'fs'
import { flags } from '@oclif/command'

export const isMac = () => process.platform === 'darwin'

export const copyToLocalOutput = (
  originalFile: string,
  outputPathOnly: string
) => {
  const newFilePath = path.join(outputPathOnly, path.basename(originalFile))
  fs.renameSync(originalFile, newFilePath)

  return newFilePath
}

export const commonFlags = {
  help: flags.help({ char: 'h' }),
  debug: flags.boolean({ char: 'd' }),
  local: flags.string({
    char: 'l',
    helpValue: '~/Documents',
  }), // dont upload
}
