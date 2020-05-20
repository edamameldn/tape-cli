import { checkIfNeeded } from './../services/ffmpeg.service'
import { checkDependencies } from './../services/config.service'
import { install as installFfmpeg } from '../helpers/ffmpeg.helpers'
import { Command, flags } from '@oclif/command'
import * as inquirer from 'inquirer'
import * as chalk from 'chalk'

import ConfigService from '../services/config.service'

export default class Config extends Command {
  static description = 'Configuration'

  static examples = ['$ tape config']

  static flags = {
    help: flags.help({ char: 'h' }),
    setup: flags.boolean({ char: 's' }),
  }

  static args = [{ name: 'name', required: false }]

  async run() {
    const { flags } = this.parse(Config)

    if (flags.setup) {
      await this.fullSetup()
      return
    }

    const currentBucketName = await ConfigService.get('bucketName')

    const responses = await inquirer.prompt([
      {
        name: 'choice',
        message: 'What would you like to configure?',
        type: 'list',
        choices: [
          {
            name: `Change bucket name (current: ${chalk.yellow(
              currentBucketName
            )})`,
            short: 'Change bucket name',
            value: 'change_bucket_name',
          },
          {
            name: 'Setup',
            short: 'Setup 📼 Tape',
            value: 'full_setup',
          },
          {
            name: 'Cancel',
          },
        ],
      },
    ])

    if (responses.choice === 'change_bucket_name') {
      this.changeBucketName()
    }

    if (responses.choice === 'full_setup') {
      await this.fullSetup()
    }
  }

  async fullSetup() {
    await checkDependencies()
    await this.changeBucketName()
    if (checkIfNeeded()) {
      const { choice: redownload } = await inquirer.prompt([
        {
          name: 'choice',
          message: 'Reinstall dependencies?',
          type: 'list',
          choices: [
            {
              name: 'Nope.',
              value: false,
            },
            {
              name: 'Yes please!',
              value: true,
            },
          ],
        },
      ])

      if (redownload) {
        installFfmpeg()
      } else {
        this.log("You're good to go! 🎉")
        this.log('Some examples: tape image | tape video | tape video --gif')
      }
    } else {
      installFfmpeg()
    }
  }

  async changeBucketName() {
    const oldName = await ConfigService.get('bucketName')

    const { name } = await inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: `Enter bucket name  (current: ${chalk.yellow(oldName)})`,
      },
    ])

    if (name.length === 0) {
      this.log(`No input, using previous bucket name ${chalk.bold(oldName)}..`)
    }

    if (name.length === 0 && oldName.length === 0) {
      this.warn('Please set a bucket name.')
    }

    const newName = name || oldName

    this.log(`Bucket name set to: ${chalk.green(newName)}`)
    ConfigService.set('bucketName', newName)
  }
}
