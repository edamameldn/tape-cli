import * as util from 'util'
import { exec as originalExec } from 'child_process'
import * as path from 'path'

import { BIN_DIR } from './config.service'

const FFMPEG = path.join(BIN_DIR, 'ffmpeg')

const exec = util.promisify(originalExec)

// Output path only, will use input video name
export const makeGif = (inputVideoFile: string, outputFile: string) => {
  console.info('xxx ---', inputVideoFile)
  return exec(
    `${FFMPEG} -i ${inputVideoFile} -filter_complex 'fps=10,scale=320:-1:flags=lanczos,split [o1] [o2];[o1] palettegen [p]; [o2] fifo [o3];[o3] [p] paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle' ${outputFile}.gif`
  )
}

export const compressVid = (inputVideoFile: string, outputFile: string) => {
  return exec(
    `${FFMPEG} -i ${inputVideoFile} -vcodec h264 -an -b:v 800k ${outputFile}`
  )
}

export default { makeGif, compressVid }
