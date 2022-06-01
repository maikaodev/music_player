import { html, mounted, secondesToMinutes } from '~/utils';

export function ControllTimeVolume() {
  mounted(function () {
    const mute = document.querySelector<HTMLImageElement>('#mute')!;
    const volumeControll =
      document.querySelector<HTMLInputElement>('#vol-control')!;
    const currentDurantion = document.querySelector('#currentDurantion')!;
    const audioElement = document.querySelector<HTMLAudioElement>('#audio')!;
    const seekbar = document.querySelector<HTMLInputElement>('#seekbar')!;

    mute.addEventListener('click', () => {
      audioElement.muted = !audioElement.muted;

      mute.src = audioElement.muted
        ? './img/volume-mute.svg'
        : './img/volume-up.svg';
    });

    function setVolume(value: number) {
      audioElement.volume = value / 100;
      if (audioElement.volume === 0) {
        mute.src = './img/volume-mute.svg';
      } else {
        mute.src = './img/volume-up.svg';
      }
    }
    volumeControll.addEventListener('change', () => {
      setVolume(Number(volumeControll.value));
    });
    volumeControll.addEventListener('input', () => {
      setVolume(Number(volumeControll.value));
    });
    function setSeek(value: number) {
      audioElement.currentTime = value;
    }
    seekbar.addEventListener('change', () => {
      setSeek(Number(seekbar.value));
    });
    seekbar.addEventListener('input', () => {
      setSeek(Number(seekbar.value));
    });

    function timeupdate() {
      currentDurantion.innerHTML = secondesToMinutes(audioElement.currentTime);
      seekbar.value = audioElement.currentTime.toString();
    }
    audioElement.addEventListener('timeupdate', () => {
      timeupdate();
    });
  });
  return html`
    <div id="audioTime">
      <div id="currentDurantion">00:00</div>
      <input type="range" min="0" max="0" id="seekbar" step="1" />
      <div id="totalDurantion">00:00</div>
      <div id="volume">
        <img src="./img/volume-up.svg" alt="Volume UP" id="mute" />

        <input type="range" min="0" max="100" id="vol-control" step="1" />
      </div>
    </div>
  `;
}
