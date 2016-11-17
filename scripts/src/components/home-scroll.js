import React from 'react';
const {Component, PropTypes} = React;

export default class HomeScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', ::this.onScroll);
  }

  componentDidMount() {
    this.onScroll();
  }

  onScroll() {
    if (this._arrow) {
      const distance = this._arrow.getBoundingClientRect().top;
      const halfHeight = window.innerHeight / 2 + 140;

      if (distance < halfHeight) {
        if (distance < 0) {
          this.setState({
            opacity: 0
          });
        } else {
          const ratio = distance / halfHeight;
          this.setState({
            opacity: ratio
          });
        }
      } else {
        this.setState({
          opacity: 1
        });
      }
    }
  }

  onClick(e) {
    e.preventDefault();

    $('html,body').animate({
      scrollTop: $('.feature.services').offset().top - $('main > nav').outerHeight()
    }, 1000);
  }

  render() {
    return (<a href="#" onClick={::this.onClick}>
        <span className="arrow" style={{
          display: 'inline-block',
          opacity: this.state.opacity
        }} ref={(ref) => { this._arrow = ref; }}>
          <img className="arrow1" src="https://static1.squarespace.com/static/57702eee893fc0d33ce194e2/t/57f9b0cf2994cab2a8ebe8cd/1475981519297/arrow.png"/>
          <img className="arrow2" src="https://static1.squarespace.com/static/57702eee893fc0d33ce194e2/t/57f9b0cf2994cab2a8ebe8cd/1475981519297/arrow.png"/>
          <img className="arrow3" src="https://static1.squarespace.com/static/57702eee893fc0d33ce194e2/t/57f9b0cf2994cab2a8ebe8cd/1475981519297/arrow.png"/>
        </span>
      </a>);
  }
}
