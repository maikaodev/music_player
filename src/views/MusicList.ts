import { html, mounted } from '~/utils';
import './MusicList.css';

export function MusicList() {
  mounted(function () {});

  return html`
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
          02. Symphony No. 3 in E Flat Major Eroica, Op. 55 - II. Marcia funebre
          Adagio assai
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
  `;
}
