import { html } from '~/utils';
import { Container } from './Container';
import './App.css';

export function App() {
  return html` <div class="App">${Container()}</div> `;
}
