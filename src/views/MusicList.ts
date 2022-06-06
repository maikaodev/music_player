import { mounted } from '~/utils';
import './MusicList.css';

import { Player } from '~/models/Player';
import albums from '~/mocks/albums.json';

export function MusicList() {
  mounted(function () {
    const $player = new Player();

    albums.forEach((album) => {
      $player.playlist.addAlbum(album);
    });

    let $albums = $player.playlist.albums;

    setAlbumToCreate();

    function setAlbumToCreate() {
      while ($player._albumIndex <= albums.length - 1) {
        createMainContent(
          $albums[$player._albumIndex].title,
          $albums[$player._albumIndex].artist,
          $albums[$player._albumIndex].cover,
          $player._albumIndex.toString()
        );

        $albums[$player._albumIndex].tracks.forEach((track, index) => {
          createListMusics(track.title, index, $player._albumIndex);
        });
        $player._albumIndex++;
      }
    }
    function createMainContent(
      titleH2: string,
      artist: string,
      cover: string,
      albumIndex: string
    ) {
      const main = document.querySelector('main')!;
      const newSection = document.createElement('section');
      newSection.classList.add('albums');
      main.appendChild(newSection);

      const newDivHeader = document.createElement('div');
      newDivHeader.classList.add('header');

      newSection.appendChild(newDivHeader);

      const newImg = document.createElement('img');
      newImg.src = cover;
      newImg.alt = titleH2;

      newDivHeader.appendChild(newImg);

      const newDivDescription = document.createElement('div');
      newDivDescription.classList.add('description');

      newDivHeader.appendChild(newDivDescription);

      const newH2 = document.createElement('h2');
      const contentH2 = document.createTextNode(titleH2);
      newH2.appendChild(contentH2);

      const newParagraph = document.createElement('p');
      const contentParagraph = document.createTextNode(artist);

      newParagraph.appendChild(contentParagraph);

      newDivDescription.appendChild(newH2);
      newDivDescription.appendChild(newParagraph);

      const newUL = document.createElement('ul');
      newUL.classList.add('list');
      newUL.setAttribute('id', `list${albumIndex}`);
      newUL.setAttribute('index', `${albumIndex}`);
      newSection.appendChild(newUL);
    }

    function createListMusics(
      title: string,
      index: number,
      albumIndex: number
    ) {
      const ul = document.getElementById(`list${albumIndex}`)!;

      const newLi = document.createElement('li');
      newLi.setAttribute('index', `${index}`);
      newLi.classList.add('song');

      const contentLi = document.createTextNode(`0${index + 1} - ${title}`);

      newLi.setAttribute('id', `${albumIndex}${index}`);
      newLi.appendChild(contentLi);
      ul.appendChild(newLi);
    }
  });
}
