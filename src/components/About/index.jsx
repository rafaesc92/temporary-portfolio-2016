import './styles.scss';

import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import {
  ABOUT_OPEN,
  ABOUT_CLOSE,
  ABOUT_AFTER_OPEN,
  ABOUT_AFTER_CLOSE
} from 'config/messages';

class About extends Component {
  state = {
    isOpen: false
  }

  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.addListerners();

    setTimeout(()=>{
      this.appWrapper = document.querySelector('.wrapper');
      this.overlay = this.base.querySelector('.about__overlay');
      this.content = this.base.querySelector('.about__content');
      this.generateTimelineMax();
    }, 1000);

  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.openPanel = this.openPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.onKeyUpEscapeKey = this.onKeyUpEscapeKey.bind(this);
  }

  addListerners() {
    Emitter.on(ABOUT_OPEN, this.openPanel);
    Emitter.on(ABOUT_CLOSE, this.closePanel);

    document.addEventListener('keyup', this.onKeyUpEscapeKey, false);
  }

  removeListerners() {
    Emitter.off(ABOUT_OPEN, this.openPanel);
    Emitter.off(ABOUT_CLOSE, this.closePanel);
  }

  generateTimelineMax() {

    this.tl = new TimelineMax({
      paused: true,
      onReverseComplete: () =>{
        this.base.classList.remove('about--is-active');
      }
    });

    this.tl
      .to(this.content, 1, {x: '0%', ease: Power4.easeOut})
      .to(this.appWrapper, 1, {x: -200, ease: Power4.easeOut}, 0)
      .to(this.overlay, 0.5, {opacity: 1}, 0.2);

  }

  openPanel() {
    if(!this.state.isOpen) {
      this.setState({isOpen: true});
      this.base.classList.add('about--is-active');
      this.tl.play(0);
      Emitter.emit(ABOUT_AFTER_OPEN);
    }
  }

  closePanel() {
    this.setState({isOpen: false});
    Emitter.emit(ABOUT_AFTER_CLOSE);
    this.tl.reverse();
  }

  onKeyUpEscapeKey(ev) {
    if(ev.keyCode === 27) {
      this.closePanel();
    }
  }

  render(props, state) {

    return (
      <aside class="about">
        <div class="about__overlay" onClick={this.closePanel}></div>

        <div class="about__content">
          <h2 class="about__title">About</h2>

          <span class="about__cross icon icon-close" onClick={this.closePanel}></span>

          <p class="about__paragraph">
            Hi,
            <br/><br/>
            I live near Paris and I am a 23 years old creative front-end developer. What interests me the most is canvas, webgl experiments and UI animations.
            <br/><br/>
            I studied in third year at <a class="link link--light" href="http://www.hetic.net/" target="_blank">HETIC</a> and I am currently studying at <a class="link link--light" href="http://www.gobelins.fr/" target="_blank">Gobelins Paris</a> in the interactive design formation.
            <br/><br/>
            I am working at <a class="link link--light" href="http://merci-michel.com" target="_blank">Merci-Michel</a> studio and I have worked for <a class="link link--light" href="http://grouek.com/" target="_blank">Grouek</a> and <a class="link link--light" href="https://www.sweetpunk.com/" target="_blank">Sweet Punk</a>.
            <br/><br/>
            Feel free to <a class="link" href="mailto:hengpatrick.pro@gmail.com" target="_blank">contact me</a> !
          </p>

          <h3 class="about__title about__title--awards">Awards</h3>

          <ul class="about__award-list">
            <li class="about__award-el"><a href="https://thefwa.com/cases/luxoperon" target="_blank">Luxoperon.io - FWA of the day</a></li>
            <li class="about__award-el"><a href="http://www.cssdesignawards.com/sites/jantana-hennard-portfolio/28641/" target="_blank">Jant.fr - Css Design Award : Website of the day </a></li>
            <li class="about__award-el"><a href="http://www.awwwards.com/sites/robin-mastromarino-portfolio" target="_blank">R. Mastromarino - Awwwards : SOTD + Developer award</a></li>
            <li class="about__award-el"><a href="http://www.cssdesignawards.com/sites/robin-mastromarino-portfolio/28182/" target="_blank">R. Mastromarino - Css Design Award : Website of the day</a></li>
            <li class="about__award-el"><a href="http://www.thefwa.com/mobile/robin-mastromarino-portfolio" target="_blank">R. Mastromarino - FWA Mobile of the day</a></li>
          </ul>

          <img class="about__emoji" src="/images/generics/kiss-emoji.svg" alt="kiss emoji" />

          <p class="about__paragraph about__paragraph--credit">
            Special thanks to <a class="link link--light" href="http://robinmastromarino.com/" target="_blank">Robin Mastromarino</a> for the design.
          </p>

        </div>
      </aside>
    );
  }

}

export default About;
