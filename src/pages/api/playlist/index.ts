import type { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CARD_COLOR } from "~/config/common.config";
import { dbConnect } from "~/libraries/mongoose.library";
import { Playlist } from "~/models/Playlist.model";
import { getPlaylist } from "./[id]";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  if (req.method == "GET") {
    const playlists = await getPlaylists();
    res.status(200).send({data: playlists});
  } 
  else if (req.method == "POST") {
    const createdPlaylist = await createPlaylist(req.body);
    res.status(201).send({data: createdPlaylist});
  }
}

async function getPlaylists() {
  const result = await Playlist.find();
  return result.map((doc) => {
    return{
      color: doc.color || DEFAULT_CARD_COLOR,
      id: doc._id,
      name: doc.name,
      owner: doc.owner,
      slug: doc.slug,
      spotifyId: doc.spotifyId,
      upvote: doc.upvote
    };
  });
}

async function createPlaylist(obj : unknown) {
  const result = await Playlist.create(obj)
  return getPlaylist(result.id)
}


export type Response = any;
