export class Album implements AlbumType {
  constructor(data: AlbumData) {
    this.artist = data.artist;
    this.cover = data.cover;
    this.title = data.title;
    this.tracks = data.tracks;
  }
  artist: string;
  cover: string;
  title: string;
  tracks: TrackData[];
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
