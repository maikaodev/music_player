import { html, mounted } from '~/utils';
import { ControlTimeHTML, $ControlTime } from './ControlTime';
import './Controllers.css';
import { Player } from '~/models/Player';
import albums from '~/mocks/albums.json';

export function Controllers() {
  mounted(function () {
    //  PICKING UP ELEMENTS
    const audioElement = document.querySelector<HTMLAudioElement>('#audio')!;
    const playElement = document.querySelector('#play')!;
    const previousElement = document.querySelector('#previous')!;
    const nextElement = document.querySelector('#next')!;
    const seekbar = document.querySelector<HTMLInputElement>('#seekbar')!;
    const imgPlayPause =
      document.querySelector<HTMLImageElement>('#playPause')!;

    // PASSING THE PARAMETERS TO THE CHILD COMPONENT
    $ControlTime(audioElement, seekbar);

    const $player = new Player();
    albums.forEach((album) => {
      $player.playlist.addAlbum(album);
    });

    let currentElement;
    let element: HTMLElement;
    let itemAdded = false;
    let addSong: boolean = true;
    let getAlbumIndex: number;
    let getTrackIndex: number;

    getStatus();

    // FUNCTIONS

    function getStatus() {
      const savedStatus = localStorage.getItem('savedStatus');

      if (savedStatus === 'true') {
        const $albumIndex = localStorage.getItem('albumIndex');
        const $trackIndex = localStorage.getItem('trackIndex');

        $player._albumIndex = Number($albumIndex);
        $player._trackIndex = Number($trackIndex);
        $player.pause();
        setClassSelected(
          $player._albumIndex.toString(),
          $player._trackIndex.toString()
        );
      }
    }

    playElement.addEventListener('click', () => {
      if ($player.playing) {
        $player.pause();
      } else {
        $player.play();
      }
      setSong();
    });

    previousElement.addEventListener('click', () => {
      $player.prevTrack();
      $player.play();
      addSong = true;
      setSong();
    });

    nextElement.addEventListener('click', () => {
      nextTrack();
    });

    function nextTrack() {
      $player.nextTrack();
      $player.play();
      addSong = true;
      setSong();
    }

    function setSong() {
      if (addSong) {
        if ($player.trackUrl) {
          audioElement.src = $player.trackUrl;
        } else {
          alert('Faixa não encontrada!');
          return;
        }
      }

      if ($player.playing) {
        imgPlayPause.src = './img/pause.svg';
        audioElement.play();
      } else {
        imgPlayPause.src = './img/play.svg';
        audioElement.pause();
      }

      if (itemAdded) {
        removeClassSelected();
      }

      setClassSelected(
        $player._albumIndex.toString(),
        $player._trackIndex.toString()
      );

      savingStatus(
        $player._albumIndex.toString(),
        $player._trackIndex.toString()
      );

      addSong = false;
    }

    audioElement.addEventListener('ended', () => {
      if (
        $player._albumIndex === albums.length - 1 &&
        $player._trackIndex === $player.album!.tracks.length - 1
      ) {
        $player._albumIndex = 0;
        $player._trackIndex = 0;
        addSong = true;
        $player.pause();
        setSong();
      } else {
        nextTrack();
      }
    });

    function setClassSelected(albumIndex: string, trackIndex: string) {
      currentElement = document.getElementById(`${albumIndex}${trackIndex}`)!;
      currentElement.classList.add('selected');
      element = currentElement;
      itemAdded = true;
    }
    function removeClassSelected() {
      element = document.querySelector('.selected')!;
      element.classList.remove('selected');
    }
    function savingStatus(albumIndex: string, trackIndex: string) {
      localStorage.setItem('albumIndex', albumIndex);
      localStorage.setItem('trackIndex', trackIndex);
      localStorage.setItem('savedStatus', 'true');
    }

    window.addEventListener('click', (e) => {
      let $element = e.target as HTMLElement;
      getAlbumIndex = Number($element.getAttribute('data-album-index'));
      getTrackIndex = Number($element.getAttribute('data-track-index'));

      if (
        getAlbumIndex === $player._albumIndex &&
        getTrackIndex === $player._trackIndex
      ) {
        return;
      } else if ($element.getAttribute('data-name') === 'song') {
        $player._albumIndex = getAlbumIndex;
        $player._trackIndex = getTrackIndex;
        $player.play();
        addSong = true;
        setSong();
      }
    });
  });
  return html`<section class="controller">
    ${ControlTimeHTML()}
    <audio id="audio"></audio>

    <div>
      <ul class="list">
        <li id="previous">
          <button>
            <img src="./img/prev.svg" alt="Previous" />
          </button>
        </li>
        <li id="play">
          <button>
            <img src="./img/play.svg" alt="Play/Pause" id="playPause" />
          </button>
        </li>
        <li id="next">
          <button>
            <img src="./img/next.svg" alt="Next" />
          </button>
        </li>
      </ul>
    </div>
  </section>`;
}
