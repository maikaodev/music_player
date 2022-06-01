import { html } from '~/utils';
import './Container.css';
import { Controllers } from './Controllers';
import { MusicList } from './MusicList';

export function Container() {
  return html` <div class="container">
    <main>${MusicList()}</main>
    <footer>${Controllers()}</footer>
  </div>`;
}
