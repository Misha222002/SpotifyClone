import { FileService, FileType } from './../files/file.service';
import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './schemas/track.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

export interface getAllProps {
  tracks: Track[];
  totalCount: number;
}

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    try {
      const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

      const track = await this.trackModel.create({
        ...dto,
        listens: 0,
        audio: audioPath,
        picture: picturePath,
      });
      return track;
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(count = 10, offset = 0): Promise<getAllProps> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    const totalCount = await this.trackModel.countDocuments();
    return { tracks: tracks, totalCount };
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = (await this.trackModel.findById(id)).populate('comments');
    return track;
  }
  async delete(id: ObjectId): Promise<Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    this.fileService.removeFile(track.picture);
    this.fileService.removeFile(track.audio);
    await Promise.all(
      track.comments.map((comment) =>
        this.commentModel.deleteOne({ _id: comment._id }),
      ),
    );
    return track._id;
  }
  async addComent(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
  async listen(id: Schema.Types.ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<getAllProps> {
    try {
      const tracks = await this.trackModel.find({
        name: { $regex: new RegExp(query, 'i') },
      });
      const totalCount = tracks.length;
      return { tracks, totalCount };
    } catch (e) {
      console.log(e);
    }
  }
}
