import { html } from '~/utils';
import './Container.css';
import { MusicList } from './MusicList';
import { Controllers } from './ControllersAudio/Controllers';

export function Container() {
  MusicList();
  return html` <div>
    <div class="container">
      <main></main>
      <footer>${Controllers()}</footer>
    </div>
  </div>`;
}
