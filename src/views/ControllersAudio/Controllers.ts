import { html, mounted } from '~/utils';
import { ControlTimeHTML, $ControlTime } from './ControlTime';
import './Controllers.css';
import { Player } from '~/models/Player';
import albums from '~/mocks/albums.json';

export { ControllersHTML, $Controllers };

function $Controllers() {
  mounted(function () {
    // PICKING UP ELEMENTS

    const audioElement = document.querySelector<HTMLAudioElement>('#audio')!;
    const playElement = document.querySelector('#play')!;
    const previousElement = document.querySelector('#previous')!;
    const nextElement = document.querySelector('#next')!;
    const seekbar = document.querySelector<HTMLInputElement>('#seekbar')!;

    // PASSING THE PARAMETERS TO THE CHILD COMPONENT
    $ControlTime(audioElement, seekbar);

    const $player = new Player();

    albums.forEach((album) => {
      $player.playlist.addAlbum(album);
    });

    let validation = 0;
    let currentElement;
    let element: HTMLElement;
    let itemAdded = false;
    // FUNCTIONS

    playElement.addEventListener('click', () => {
      if ($player.playing) {
        $player.pause();
        audioElement.pause();
      } else {
        $player.play();
        audioElement.play();
      }
      if (validation === 0) {
        setSong();
      }
      validation++;
    });

    previousElement.addEventListener('click', () => {
      $player.prevTrack();
      $player.play();
      setSong();
      audioElement.play();
    });

    nextElement.addEventListener('click', () => {
      nextTrack();
    });

    function nextTrack() {
      $player.nextTrack();
      $player.play();
      setSong();
      audioElement.play();
    }

    function setSong() {
      if (!$player.trackUrl) {
        alert('Faixa não encontrada!');
        return;
      }
      audioElement.src = $player.trackUrl;

      if (itemAdded) {
        removeClassSelected();
      }

      setClassSelected(
        $player._albumIndex.toString(),
        $player._trackIndex.toString()
      );
    }

    audioElement.addEventListener('ended', () => {
      nextTrack();
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
  });
}
function ControllersHTML() {
  return html`<section class="controller">
    ${ControlTimeHTML()}
    <audio src="" id="audio"></audio>

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
