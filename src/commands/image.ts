import * as chalk from 'chalk'
import GithubIssueOnErrorCommand from '../github-issue-on-error-command'

import { CopyFormats } from '../helpers/copy.helpers'
import { deviceToFriendlyString } from '../helpers/device.helpers'
import { getDeviceOrientation } from '../helpers/orientation.helpers'
import { uploadFile } from '../helpers/s3'
import { commonFlags, copyToLocalOutput } from '../helpers/utils'
import {
  AndroidScreenshotService,
  ConfigService,
  DeviceService,
  XcodeScreenshotService,
} from '../services'
import { processImage } from '../services/ffmpeg.service'
import { getFrameOptions } from './../helpers/frame.helpers'

export default class Image extends GithubIssueOnErrorCommand {
  static description = 'Take screenshots of iOS/Android devices/simulators'

  static examples = [
    `$ tape image
🎉 Screenshot uploaded. Copied URL to clipboard 🔖 ! -> \n https://example.com/image.png
`,
  ]

  static flags = commonFlags

  static aliases = ['i', 'screenshot', 'img']

  async run() {
    const { flags } = this.parse(Image)

    const device = await DeviceService.getActiveDevice()

    if (!device) return
    this.log(`📱 Device: ${deviceToFriendlyString(device)}`)

    const ScreenshotKlass =
      device.type === 'android'
        ? AndroidScreenshotService
        : XcodeScreenshotService

    const screenshot = new ScreenshotKlass({ device, verbose: flags.debug })
    const rawOutputFile = await screenshot.save()

    const orientation = await getDeviceOrientation(device)
    const recordingSettings = await ConfigService.getRecordingSettings()

    const frameFlags = {
      noframe: flags.noframe,
      selectframe: flags.selectframe,
      frame: flags.frame,
    }
    const frameOptions = await getFrameOptions(
      rawOutputFile,
      'image',
      frameFlags,
      { deviceName: device.name },
      recordingSettings
    )

    const outputFilePathWithoutExtension = rawOutputFile.replace('-raw.png', '')

    const outputFilePath = await processImage(
      rawOutputFile,
      outputFilePathWithoutExtension,
      orientation,
      frameOptions
    )

    if (flags.local) {
      const localFilePath = copyToLocalOutput(outputFilePath, flags.local)
      this.log(`\n 🎉 Saved locally to ${localFilePath}.`)
      // execSync(`open ${localFilePath}`)
    } else {
      try {
        await uploadFile(outputFilePath, {
          copyToClipboard: !flags.nocopy,
          fileType: 'Screenshot',
          format: flags.format as CopyFormats,
          log: true,
          metadata: {
            os: device.type,
            deviceName: device.name,
            deviceId: device.id,
          },
        })
      } catch (error) {
        if (flags.debug) {
          this.error(error)
        }
        this.error(`${chalk.dim(error?.message)}`)
      }
    }

    screenshot.destroy()
  }
}
