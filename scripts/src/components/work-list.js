import React from 'react';
import _ from 'lodash';
const {Component, PropTypes} = React;

export default class WorkList extends Component {
  static propTypes = {
    collections: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      filters: {}
    };
  }

  componentWillMount() {
    const data = {};
    const collections = this.props.collections.split(',');

    for (let i = 0; i < collections.length; i++) {
      data[collections[i]] = window.Langate[collections[i]];
    }

    this.setState({
      data
    });
  }

  renderCollectionFilters() {
    const filters = [];
    const collections = this.props.collections.split(',');

    filters.push(<li key="all" className="active">
      <a href="/work">All</a>
    </li>);

    for (let i = 0; i < collections.length; i++) {
      const data = this.state.data[collections[i]];
      const {fullUrl, navigationTitle} = data.collection;
      filters.push(<li key={collections[i]}>
        <a href={fullUrl}>{navigationTitle}</a>
      </li>);
    }

    return filters;
  }

  renderItems() {
    console.log({data: this.state.data});
    const items = _.flatMap(this.state.data, (val, key) => {
      return val.items;
    });

    console.log({items});

    return items.map((item, key) => {
      const {id, fullUrl, assetUrl, title, excerpt, categories, tags} = item;
      return (<li key={key} className="flex-item" data-item-id={id}>
        <a href={fullUrl}>
          <div className="tier3-image image h5 white" style={{
            backgroundImage: `url('${assetUrl}')`
          }}></div>
          <h2 className="h4">{title}</h2>
        </a>
        <div dangerouslySetInnerHTML={{
          __html: excerpt
        }}></div>
        <span className="line line-h line-grey"></span>
        <ul className="tags p small">
          {_.map(categories, (cat, key) => {
            return (<li key={key}><a>{cat}</a></li>);
          })}
          {_.map(tags, (tag, key) => {
            return (<li key={key}><a>{tag}</a></li>);
          })}
        </ul>
      </li>);
    });
  }

  render() {
    return (<div>
      <ul className="link-list category-filter h5 left">
        {this.renderCollectionFilters()}
      </ul>
      <ul className="flex-container">
        {this.renderItems()}
        <li className="flex-item"></li>
        <li className="flex-item"></li>
      </ul>
    </div>);
  }
}
