import { Playlist } from './Playlist';
export class Player implements PlayerType {
  album: AlbumType | null = null;
  playing: boolean = false;
  playlist: PlaylistType = new Playlist();
  trackUrl: string | null = null;
  _albumIndex: number = 0;
  _trackIndex: number = 0;
  set albumIndex(value: number) {
    if (value > 0 && value <= this.playlist.albums.length - 1) {
      this._albumIndex = value;
    } else {
      this._albumIndex = 0;
      this._trackIndex = 0;
    }
  }
  get albumIndex() {
    return this._albumIndex;
  }
  set trackIndex(value: number) {
    if (value <= this.playlist.albums[this.albumIndex].tracks.length - 1) {
      this._trackIndex = value;
    }
  }
  get trackIndex() {
    return this._trackIndex;
  }
  play(): void {
    this.playing = true;
    this.album = this.playlist.albums[this.albumIndex];
    this.trackUrl = this.album.tracks[this.trackIndex].url;
  }
  pause(): void {
    this.playing = false;
  }
  nextTrack(): void {
    this.trackIndex++;
    if (
      this.trackIndex ===
      this.playlist.albums[this.albumIndex].tracks.length - 1
    ) {
      this.albumIndex++;
      this.trackIndex = 0;
    }
  }
  prevTrack(): void {
    if (this.trackIndex > 0) {
      this.trackIndex--;
    } else if (this.albumIndex > 0) {
      this.albumIndex--;
      this.trackIndex = this.playlist.albums[this.albumIndex].tracks.length - 1;
    } else {
      this.albumIndex = this.playlist.albums.length - 1;
      this.trackIndex = this.playlist.albums[this.albumIndex].tracks.length - 1;
    }
  }
}
