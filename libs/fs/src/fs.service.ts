import { when , tail } from 'rambdax'
import { Injectable } from '@nestjs/common';
import {readFile} from 'fs'
import { DATA_FOLDER } from 'lib/constants';

@Injectable()
export class FsService {
  read(filePath): Promise<string>{
    return new Promise((resolve, reject) => {
      readFile(filePath, (err, data) => {
        if(err) return reject(err)
        return resolve(data.toString())
      })
    })
  }

  async readFromData(filePath){
    const normalizedFilePath = when(x => x.startsWith('/'), tail)(filePath)
    const actualFilePath = `${DATA_FOLDER}/${normalizedFilePath}`
    return this.read(actualFilePath)
  }
}
