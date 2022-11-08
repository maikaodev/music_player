import { Album } from './Album';
import albums from '~/mocks/albums.json';

export class Playlist implements PlaylistType {
  //
  albums: AlbumType[];

  constructor() {
    this.albums = [];
  }

  addAlbum(data: AlbumData) {
    const _Album = new Album(data);
    this.albums.push(_Album);
  }

  isFirstAlbum(index: number): boolean {
    if (index === 0) {
      return true;
    }
    return false;
  }

  isLastAlbum(index: number): boolean {
    if (index === albums.length - 1) {
      return true;
    }
    return false;
  }
}
