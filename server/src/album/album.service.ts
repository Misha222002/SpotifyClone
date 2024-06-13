import { FileService, FileType } from './../files/file.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { Album, AlbumDocument } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { addTrackDto, deleteTrackDto } from './dto/add-track.dto';
import { Track } from 'src/track/schemas/track.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    try {
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
      const album = await this.albumModel.create({
        ...dto,
        picture: picturePath,
      });
      return album;
    } catch (e) {
      console.log(e);
    }
  }
  async addTrack(dto: addTrackDto): Promise<Album> {
    const album = await this.albumModel.findById(dto.albumId);
    album.tracks.push(dto.trackId);
    await album.save();
    return album;
  }

  async removeTrack(
    trackId: mongoose.Schema.Types.ObjectId,
    albumId: mongoose.Schema.Types.ObjectId,
  ): Promise<Album> {
    const album = await this.albumModel.findById(albumId);

    console.log(album.tracks, trackId);

    album.tracks = album.tracks.filter(
      (id) => id.toString() !== trackId.toString(),
    );
    await album.save();
    return album;
  }

  async getAll(): Promise<Album[]> {
    const albums = await this.albumModel.find();
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    return album;
  }

  async delete(id: ObjectId): Promise<Types.ObjectId> {
    const album = await this.albumModel.findByIdAndDelete(id);
    return album._id;
  }
}
