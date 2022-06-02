import { html, mounted } from '~/utils';
import './MusicList.css';

import { Player } from '~/models/Player';
import albums from '~/mocks/albums.json';
import { ControllersHTML, $Controllers } from './ControllersAudio/Controllers';

export function MusicList() {
  mounted(function () {
    const getUL = [
      {
        UL: document.querySelector<HTMLDListElement>('#listBeethoven')!,
      },
      {
        UL: document.querySelector<HTMLDListElement>('#listPrelude')!,
      },
    ];

    const $player = new Player();

    albums.forEach((album) => {
      $player.playlist.addAlbum(album);
    });

    let $albums = $player.playlist.albums;

    setAlbumToCreate();

    function setAlbumToCreate() {
      while ($player._albumIndex <= albums.length - 1) {
        $albums[$player._albumIndex].tracks.forEach((album, index) => {
          createListMusics(
            getUL[$player._albumIndex].UL,
            album.title,
            index,
            $player._albumIndex
          );
        });
        $player._albumIndex++;
      }
    }

    function createListMusics(
      list: HTMLDListElement,
      title: string,
      index: number,
      albumIndex: number
    ) {
      const newItem = document.createElement('li');
      const content = document.createTextNode(`0${index + 1} - ${title}`);
      newItem.setAttribute('id', `${albumIndex}${index}`);
      newItem.appendChild(content);
      list.appendChild(newItem);
    }
    $Controllers();
  });

  return html`
    <!-- first album -->
    <section class="albums">
      <!-- header -->
      <div class="header">
        <img src="./img/beethoven.png" alt="Beethoven" id="img" />
        <div class="description">
          <h2>Symphony Collection</h2>
          <p>Ludwig van Beethoven</p>
        </div>
      </div>
      <!--end header -->

      <ul class="list" id="listBeethoven"></ul>
    </section>
    <!-- end first album -->
    <!-- second album -->

    <section class="albums">
      <!-- header -->
      <div class="header">
        <img src="./img/chopin.png" alt="Beethoven" />
        <div class="description">
          <h2>Preludes Collection</h2>
          <p>Frédéric Chopin</p>
        </div>
      </div>
      <!--end header -->

      <ul class="list" id="listPrelude"></ul>
    </section>
    <!-- end second album -->
    <footer>${ControllersHTML()}</footer>
  `;
}
