import { html } from '~/utils';
import './Container.css';
import { MusicList } from './MusicList';
import { Controllers } from './ControllersAudio/Controllers';

export function Container() {
  return html` <div class="container">
    <main>${MusicList()}</main>
    <footer>${Controllers()}</footer>
  </div>`;
}
