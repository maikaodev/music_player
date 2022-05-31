import { html, mounted } from '~/utils';
import './Container.css';
import { Player } from '~/models/Player';
import albums from '~/mocks/albums.json';

export function Container() {
  mounted(function () {
    const audioElement = document.querySelector('#audio');
    const playElement = document.querySelector('#play');
    const previousElement = document.querySelector('#previous');
    const nextElement = document.querySelector('#next');
    const mute = document.querySelector('#mute');
    const volumeControll = document.querySelector('#vol-control');
    const seekbar = document.querySelector('#seekbar');
    const currentDurantion = document.querySelector('#currentDurantion');
    const totalDurantion = document.querySelector('#totalDurantion');

    const $player = new Player();
    let validation = 0;

    function setAlbum() {
      $player.playlist.addAlbum(albums[$player._albumIndex]);
    }
    setAlbum();

    playElement?.addEventListener('click', () => {
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
      if ($player._albumIndex) {
        setAlbum();
      }
      $player.play();
      setSong();
    });

    nextElement.addEventListener('click', () => {
      nextTrack();
    });
    function nextTrack() {
      $player.nextTrack();
      if ($player._albumIndex) {
        setAlbum();
      }
      $player.play();
      setSong();
    }
    function setSong() {
      audioElement.src = $player.trackUrl;
      audioElement.play();
      audioElement.onloadeddata = () => {
        seekbar.max = audioElement.duration;
        totalDurantion.innerHTML = secondesToMinutes(audioElement.duration);
      };
    }
    mute.addEventListener('click', () => {
      audioElement.muted = !audioElement.muted;

      mute.src = audioElement.muted
        ? './img/volume-mute.svg'
        : './img/volume-up.svg';
    });

    function setVolume(value) {
      audioElement.volume = value / 100;
      if (audioElement.volume === 0) {
        mute.src = './img/volume-mute.svg';
      } else {
        mute.src = './img/volume-up.svg';
      }
    }
    volumeControll.addEventListener('change', () => {
      setVolume(volumeControll.value);
    });
    volumeControll.addEventListener('input', () => {
      setVolume(volumeControll.value);
    });
    function setSeek(value) {
      audioElement.currentTime = value;
    }
    seekbar.addEventListener('change', () => {
      setSeek(seekbar.value);
    });
    seekbar.addEventListener('input', () => {
      setSeek(seekbar.value);
    });
    function secondesToMinutes(time) {
      const minutes = Math.floor(time / 60);
      const secondes = Math.floor(time % 60);
      return `${('0' + minutes).slice(-2)}:${('0' + secondes).slice(-2)}`;
    }
    function timeupdate() {
      currentDurantion.innerHTML = secondesToMinutes(audioElement.currentTime);
      seekbar.value = audioElement.currentTime;
    }
    audioElement.addEventListener('timeupdate', () => {
      timeupdate();
    });
    audioElement.addEventListener('ended', () => {
      nextTrack();
    });
  });

  return html` <div class="container">
    <main>
      <!-- first album -->
      <section class="albums">
        <!-- header -->
        <div class="header">
          <img src="./img/beethoven.png" alt="Beethoven" />
          <div class="description">
            <h2>Symphony Collection</h2>
            <p>Ludwig van Beethoven</p>
          </div>
        </div>
        <!--end header -->

        <ul class="list">
          <li class="selected">
            01. Symphony no. 1 in C, Op. 21 - I. Adagio molto - Allegro con brio
          </li>
          <li>
            02. Symphony No. 3 in E Flat Major Eroica, Op. 55 - II. Marcia
            funebre Adagio assai
          </li>
          <li>03. Symphony no. 4 in Bb, Op. 60 - IV. Allegro ma non troppo</li>
        </ul>
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

        <ul class="list">
          <li>01. Preludes, Op. 28 - Nos. 4 ,5, 6</li>
          <li>02. Preludes, Op. 28 - Nos. 20, 21</li>
          <li>03. Preludes, Op. 28 - No. 15</li>
        </ul>
      </section>
      <!-- end second album -->
    </main>
    <footer>
      <section class="controller">
        <div id="audioTime">
          <div id="currentDurantion">00:00</div>
          <input type="range" min="0" max="0" id="seekbar" step="1" />
          <div id="totalDurantion">00:00</div>
          <div id="volume">
            <img src="./img/volume-up.svg" alt="Volume UP" id="mute" />

            <input type="range" min="0" max="100" id="vol-control" step="1" />
          </div>
        </div>

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
      </section>
    </footer>
  </div>`;
}
