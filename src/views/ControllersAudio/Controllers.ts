import { html, mounted } from '~/utils';
import { ControlTimeHTML, $ControlTime } from './ControlTime';
import './Controllers.css';
import { Player } from '~/models/Player';
import albums from '~/mocks/albums.json';

export function Controllers() {
  mounted(function () {
    // PICKING UP ELEMENTS
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

    getStatus();

    // FUNCTIONS

    function getStatus() {
      const savedStatus = localStorage.getItem('savedStatus');
      if (savedStatus === 'true') {
        const $isPlaying = localStorage.getItem('isPlaying');
        const $albumIndex = localStorage.getItem('albumIndex');
        const $trackIndex = localStorage.getItem('trackIndex');
        const $trackURL = localStorage.getItem('trackURL');
        if ($isPlaying === 'true') {
          $player.playing = true;
          $player._albumIndex = Number($albumIndex);
          $player._trackIndex = Number($trackIndex);
          $player.trackUrl = $trackURL;
          setSong();
          imgPlayPause.src = './img/pause.svg';
        } else {
          $player.playing = false;
          $player._albumIndex = Number($albumIndex);
          $player._trackIndex = Number($trackIndex);
          setClassSelected(
            $player._albumIndex.toString(),
            $player._trackIndex.toString()
          );
          imgPlayPause.src = './img/play.svg';
        }
      }
    }

    playElement.addEventListener('click', () => {
      if ($player.playing) {
        $player.pause();
        imgPlayPause.src = './img/play.svg';
      } else {
        $player.play();
        imgPlayPause.src = './img/pause.svg';
      }
      setSong();
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

      if ($player.playing) {
        audioElement.play();
      } else {
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
        $player._trackIndex.toString(),
        $player.playing.toString(),
        $player.trackUrl
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
    function savingStatus(
      albumIndex: string,
      trackIndex: string,
      isPlaying: string,
      trackURL: string
    ) {
      localStorage.setItem('albumIndex', albumIndex);
      localStorage.setItem('trackIndex', trackIndex);
      localStorage.setItem('isPlaying', isPlaying);
      localStorage.setItem('trackURL', trackURL);
      localStorage.setItem('trackURL', trackURL);
      localStorage.setItem('savedStatus', 'true');
    }
    let id: string;
    let arr;
    window.addEventListener('click', (e) => {
      if ((e.target as HTMLDListElement).id) {
        id = (<HTMLDListElement>e.target).id;
        arr = Array.from(id);
        $player._albumIndex = Number(arr[0]);
        $player._trackIndex = Number(arr[1]);
        $player.play();
        setSong();
      } else {
        return;
      }
    });
  });
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
