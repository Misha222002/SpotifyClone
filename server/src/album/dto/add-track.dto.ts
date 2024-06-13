import { ObjectId } from 'mongoose';

export class addTrackDto {
  readonly trackId: ObjectId;
  readonly albumId: ObjectId;
}

export class deleteTrackDto {
  readonly trackId: ObjectId;
  readonly albumId: ObjectId;
}
