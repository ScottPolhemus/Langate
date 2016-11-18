import React from 'react';
import _ from 'lodash';
const {Component, PropTypes} = React;

export default class ServicesList extends Component {
  static propTypes = {
    collections: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {}
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

    filters.push(<li key="all" className={this.state.filters.collection === '' ? 'active' : ''}>
      <a href="/work">All</a>
    </li>);

    for (let i = 0; i < collections.length; i++) {
      const data = this.state.data[collections[i]];
      const {fullUrl, navigationTitle} = data.collection;
      filters.push(<li key={collections[i]} className={this.state.filters.collection === collections[i] ? 'active' : ''}>
        <a href={fullUrl}>{navigationTitle}</a>
      </li>);
    }

    const items = _.flatMap(this.state.data, (data, key) => {
      return data.items;
    });

    const tags = _.flatMap(items, (item) => {
      return item.tags;
    });

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      filters.push(<li key={tag} className={this.state.filters.tag.indexOf(tag) !== -1 ? 'active' : ''}>
        <a href={`#${tag}`}>{tag}</a>
      </li>);
    }

    return (<ul className="link-list category-filter h5 left">
      {filters}
    </ul>);
  }

  renderItems() {
    const items = _.flatMap(this.state.data, (data, key) => {
      return data.items;
    }).filter((item) => {
      if (this.state.filters.collection) {
        return (item.fullUrl.indexOf(`/${this.state.filters.collection}`) === 0);
      }

      return true;
    });

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

  renderCollections() {
    const collections = this.props.collections.split(',');
    const collectionItems = [];

    for (let i = 0; i < collections.length; i++) {
      const coll = this.state.data[collections[i]];
      const {collection, items} = coll;
      collectionItems.push(<li className="linkgroup feature padding width center border b-top">
        <span id={collection.urlId} className="anchor-link-target"></span>
        <img src={collection.mainImage.assetUrl} className="left" />
        <div className="page-textarea right" data-collection-id={collection.id}>
          <h2 className="h4">{collection.navigationTitle}</h2>
          <div dangerouslySetInnerHTML={{
            __html: collection.description
          }}></div>
          <ul className="linkgroup-list">
            {_.map(items, (item, key) => {
              return (<li key={key}>
                <a className="h5 lightblue" href={item.fullUrl}>{item.title}</a>
              </li>);
            })}
          </ul>
        </div>
      </li>);
    }

    return collectionItems;
  }

  render() {
    return (<ul className="landing-row">
      {this.renderCollections()}
    </ul>);
  }
}
