import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file) {
    try {
      const fileException = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileException;
      const filePath = path.resolve(__dirname, '..', '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string) {
    fs.unlink(
      path.resolve(__dirname, '..', '..', 'static', fileName),
      (err) => {
        if (err) console.log(err);
      },
    );
  }
}
