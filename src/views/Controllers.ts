import { html, mounted, secondesToMinutes } from '~/utils';
import { ControllTimeVolume } from './ControllTimeVolume';
import './Controllers.css';
import { Player } from '~/models/Player';
import albums from '~/mocks/albums.json';

export function Controllers() {
  mounted(function () {
    const audioElement = document.querySelector<HTMLAudioElement>('#audio')!;
    const playElement = document.querySelector('#play')!;
    const previousElement = document.querySelector('#previous')!;
    const nextElement = document.querySelector('#next')!;
    const seekbar = document.querySelector<HTMLInputElement>('#seekbar')!;
    const totalDurantion = document.querySelector('#totalDurantion')!;

    const $player = new Player();
    albums.forEach((album) => {
      $player.playlist.addAlbum(album);
    });

    let validation = 0;

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
    });

    nextElement.addEventListener('click', () => {
      nextTrack();
    });
    function nextTrack() {
      $player.nextTrack();
      $player.play();
      setSong();
    }

    function setSong() {
      if (!$player.trackUrl) {
        alert('Faixa não encontrada!');
        return;
      }
      audioElement.src = $player.trackUrl;
      audioElement.play();

      audioElement.onloadeddata = () => {
        seekbar.max = audioElement.duration.toString();
        totalDurantion.innerHTML = secondesToMinutes(audioElement.duration);
      };

      audioElement.addEventListener('ended', () => {
        nextTrack();
      });
    }
  });

  return html`<section class="controller">
    ${ControllTimeVolume()}

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
            <img src="./img/play.svg" alt="Play/Pause" />
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
