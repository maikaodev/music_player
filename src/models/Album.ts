export class Album implements AlbumType {
  //
  artist: string;
  cover: string;
  title: string;
  tracks: TrackData[];

  constructor({ artist, cover, title, tracks }: AlbumData) {
    this.artist = artist;
    this.cover = cover;
    this.title = title;
    this.tracks = tracks;
  }

  getUrlFromIndex(index: number): string | null {
    if (index === 0 || index <= this.tracks.length - 1) {
      return this.tracks[index].url;
    } else {
      return null;
    }
  }
  isFirstTrack(index: number): boolean {
    if (index === 0) {
      return true;
    } else {
      return false;
    }
  }
  isLastTrack(index: number): boolean {
    if (index === this.tracks.length - 1) {
      return true;
    } else {
      return false;
    }
  }
}
