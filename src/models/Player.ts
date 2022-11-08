import { Playlist } from './Playlist';
import albums from '~/mocks/albums.json';

export class Player implements PlayerType {
  //
  album: AlbumType | null;
  playing: boolean;
  playlist: PlaylistType;
  _albumIndex: number;
  _trackIndex: number;
  trackUrl: string | null;

  constructor() {
    this.album = null;
    this.playing = false;
    this.playlist = new Playlist();
    this._albumIndex = 0;
    this._trackIndex = 0;
    this.trackUrl = null;
  }

  get albumIndex() {
    return this._albumIndex;
  }
  set albumIndex(value) {
    if (value <= albums.length - 1) {
      this._albumIndex = value;
    }
    return;
  }
  get trackIndex() {
    return this._trackIndex;
  }
  set trackIndex(value) {
    if (value <= this.playlist.albums[this._albumIndex].tracks.length - 1) {
      this._trackIndex = value;
    }
    return;
  }
  play(): void {
    this.playing = true;
    this.album = this.playlist.albums[this._albumIndex];
    this.trackUrl = this.album.getUrlFromIndex(this._trackIndex);
  }
  pause(): void {
    this.playing = false;
  }
  nextTrack(): void {
    if (!this.playlist.albums[this._albumIndex].isLastTrack(this._trackIndex)) {
      this._trackIndex++;
      return;
    }
    if (
      this.playlist.albums[this._albumIndex].isLastTrack(this._trackIndex) &&
      this.playlist.isLastAlbum(this._albumIndex)
    ) {
      this._albumIndex = 0;
      this._trackIndex = 0;
      return;
    }
    this._albumIndex++;
    this._trackIndex = 0;
  }
  prevTrack(): void {
    if (
      !this.playlist.albums[this._albumIndex].isFirstTrack(this._trackIndex)
    ) {
      this._trackIndex--;
      return;
    }
    if (!this.playlist.isFirstAlbum(this._albumIndex)) {
      this._albumIndex--;
      this._trackIndex =
        this.playlist.albums[this._albumIndex].tracks.length - 1;
      return;
    }
    if (
      this.playlist.isFirstAlbum(this._albumIndex) &&
      this.playlist.albums[this._albumIndex].isFirstTrack(this.trackIndex)
    ) {
      this._albumIndex = albums.length - 1;
      this._trackIndex = albums[this._albumIndex].tracks.length - 1;
    }
  }
}
