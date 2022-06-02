import { html } from '~/utils';
import './Container.css';
import { MusicList } from './MusicList';

export function Container() {
  return html` <div class="container">
    <main>${MusicList()}</main>
  </div>`;
}
