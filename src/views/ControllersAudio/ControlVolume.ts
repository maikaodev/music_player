import { html, mounted } from '~/utils';
export { ControlVolumeHTML, $ControlVolume };

function ControlVolumeHTML() {
  return html`
    <div id="volume">
      <img src="./img/volume-up.svg" alt="Volume UP" id="mute" />

      <input type="range" min="0" max="100" id="vol-control" step="1" />
    </div>
  `;
}
function $ControlVolume(audioElement: HTMLAudioElement) {
  mounted(function () {
    const mute = document.querySelector<HTMLImageElement>('#mute')!;
    const volumeControl =
      document.querySelector<HTMLInputElement>('#vol-control')!;

    // FUNCTIONS

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
    volumeControl.addEventListener('change', () => {
      setVolume(Number(volumeControl.value));
    });
    volumeControl.addEventListener('input', () => {
      setVolume(Number(volumeControl.value));
    });
  });
}
