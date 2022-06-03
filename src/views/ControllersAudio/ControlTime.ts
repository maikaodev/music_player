import { html, mounted, secondesToMinutes } from '~/utils';
import { ControlVolumeHTML, $ControlVolume } from './ControlVolume';

export { ControlTimeHTML, $ControlTime };

function ControlTimeHTML() {
  return html`
    <div id="audioTime">
      <div id="currentDurantion">00:00</div>
      <input type="range" min="0" max="0" id="seekbar" step="1" />
      <div id="totalDurantion">00:00</div>
      ${ControlVolumeHTML()}
    </div>
  `;
}
function $ControlTime(
  audioElement: HTMLAudioElement,
  seekBar: HTMLInputElement
) {
  mounted(function () {
    $ControlVolume(audioElement);

    const currentDurantion = document.querySelector('#currentDurantion')!;
    const totalDurantion = document.querySelector('#totalDurantion')!;

    // FUNCTIONS
    getStatus();
    function getStatus() {
      const savedStatus = localStorage.getItem('savedStatus');
      if (savedStatus === 'true') {
        const $currentTime = localStorage.getItem('currentTime')!;
        setSeek(Number($currentTime));
        timeupdate();
      }
    }

    function setSeek(value: number) {
      audioElement.currentTime = value;
    }
    seekBar.addEventListener('change', () => {
      setSeek(Number(seekBar.value));
    });
    seekBar.addEventListener('input', () => {
      setSeek(Number(seekBar.value));
    });

    function timeupdate() {
      currentDurantion.innerHTML = secondesToMinutes(audioElement.currentTime);
      seekBar.value = audioElement.currentTime.toString();
      savingStatus(audioElement.currentTime.toString());
    }
    audioElement.onloadeddata = () => {
      seekBar.max = audioElement.duration.toString();
      totalDurantion.innerHTML = secondesToMinutes(audioElement.duration);
    };
    audioElement.addEventListener('timeupdate', () => {
      timeupdate();
    });
    function savingStatus(currentTime: string) {
      localStorage.setItem('currentTime', currentTime);
    }
  });
}
