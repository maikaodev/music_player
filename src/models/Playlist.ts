import { Album } from './Album';
export class Playlist implements PlaylistType {
  albums: AlbumType[] = [];
  Album: Album | undefined;
  addAlbum(data: AlbumData) {
    this.Album = new Album(data);
    this.albums.push(this.Album);
  }
  isFirstAlbum(index: number): boolean {
    if (index === 0) {
      return true;
    } else {
      return false;
    }
  }
  isLastAlbum(index: number): boolean {
    if (index === this.albums.length - 1) {
      return true;
    } else {
      return false;
    }
  }
}
