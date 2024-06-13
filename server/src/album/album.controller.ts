import { Schema } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { CreateCommentDto } from 'src/track/dto/create-comment.dto';
import { addTrackDto } from './dto/add-track.dto';

@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
    const { picture } = files;
    return this.albumService.create(dto, picture[0]);
  }

  @Post('/addTrack')
  addTrack(@Body() dto: addTrackDto) {
    return this.albumService.addTrack(dto);
  }

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.albumService.delete(id);
  }

  @Delete('/track/:trackId')
  deleteTrack(
    @Param('trackId') trackId: ObjectId,
    @Query('albumId') albumId: ObjectId,
  ) {
    console.log('trackId', trackId, 'albumId', albumId);
    return this.albumService.removeTrack(trackId, albumId);
  }
}
