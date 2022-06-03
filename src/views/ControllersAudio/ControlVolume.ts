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
    getStatus();

    function getStatus() {
      const savedStatus = localStorage.getItem('savedStatus');
      if (savedStatus === 'true') {
        const $isMuted = localStorage.getItem('isMuted');
        const $volume = localStorage.getItem('volume')!;
        if ($isMuted === 'true') {
          setVolume(Number($volume));
          audioElement.muted = true;
          volumeControl.value = $volume;
          mute.src = './img/volume-mute.svg';
        } else if ($isMuted === 'false') {
          audioElement.muted = false;
          setVolume(Number($volume));
          volumeControl.value = $volume;
        }
      }
    }

    mute.addEventListener('click', () => {
      audioElement.muted = !audioElement.muted;
      savingStatus(volumeControl.value, audioElement.muted.toString());

      mute.src = audioElement.muted
        ? './img/volume-mute.svg'
        : './img/volume-up.svg';
    });

    function setVolume(value: number) {
      audioElement.volume = value / 100;

      if (audioElement.volume === 0) {
        mute.src = './img/volume-mute.svg';
        audioElement.muted = true;
      } else {
        mute.src = './img/volume-up.svg';
        audioElement.muted = false;
      }
    }
    volumeControl.addEventListener('change', () => {
      setVolume(Number(volumeControl.value));
      savingStatus(volumeControl.value, audioElement.muted.toString());
    });
    volumeControl.addEventListener('input', () => {
      setVolume(Number(volumeControl.value));
    });

    function savingStatus(volume: string, isMuted: string) {
      localStorage.setItem('volume', volume);
      localStorage.setItem('isMuted', isMuted);
    }
  });
}
