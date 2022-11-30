import {Schema, models, model} from "mongoose";

export interface PlaylistModel {
  color?: string;
  name: string;
  owner: string;
  slug: string;
  spotifyId: string;
  upvote: number;
}

const schema = new Schema<PlaylistModel>({
  color: {type: String, required: false},
  name: {type: String, required: true},
  owner: {type: String, required: true},
  slug: {type: String, required: true},
  spotifyId: {type: String, required: true},
  upvote: {type: Number, required: true},
})

export const Playlist = models.Playlist || model<PlaylistModel>("Playlist", schema);

export type PlaylistModelWithId = PlaylistModel & { id: string };
