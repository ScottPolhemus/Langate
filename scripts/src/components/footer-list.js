import React from 'react';
const {Component, PropTypes} = React;

export default class FooterList extends Component {
  static propTypes = {
    collection: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    this.setState({
      data: window.Langate[this.props.collection]
    });
  }

  render() {
    const {collection, items} = this.state.data;
    const {fullUrl, navigationTitle} = collection;
    const links = [];

    links.push(<li key="fullUrl" className="footer-title"><a href={fullUrl} className="p lightblue">{navigationTitle}</a></li>);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      links.push(<li key={item.fullUrl}><a href={item.fullUrl} className="p small white">{item.title}</a></li>);
    }

    return (<ul>
      {links}
    </ul>);
  }
}
