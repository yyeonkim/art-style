import { IArtwork } from "../types";

class Artwork {
  name = "";
  category = "";
  url = "";
  artist = "";
  label = [] as string[];

  constructor(artwork: IArtwork) {
    this.name = artwork.name;
    this.category = artwork.category;
    this.url = artwork.url;
    this.artist = artwork.artist;
    this.label = [...artwork.label];
  }
}

export default Artwork;
