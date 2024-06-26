import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './files/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    TrackModule,
    AlbumModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),
    FileModule,
  ],
})
export class AppModule {}
