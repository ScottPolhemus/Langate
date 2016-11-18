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
      filters: {
        collection: '',
        category: '',
        tag: ''
      }
    };
  }

  componentWillMount() {
    const data = {};
    const collections = this.props.collections.split(',');
    let activeCollection = '';

    for (let i = 0; i < collections.length; i++) {
      data[collections[i]] = window.Langate[collections[i]];
      if (window.location.pathname === `/${collections[i]}/`) {
        activeCollection = collections[i]
      }
    }

    this.setState({
      data,
      filters: {
        collection: activeCollection,
        category: this.state.filters.category,
        tag: this.state.filters.tag
      }
    });
  }

  onFilterCategory(event) {
    const {collection, category, tag} = this.state.filters;

    this.setState({
      filters: {
        collection,
        category: event.target.value,
        tag
      }
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
      if (tag) {
        filters.push(<li key={tag} className={this.state.filters.tag.indexOf(tag) !== -1 ? 'active' : ''}>
          <a href={`#${tag}`}>{tag}</a>
        </li>);
      }
    }

    return (<ul className="link-list category-filter h5 left">
      {filters}
    </ul>);
  }

  renderCategoryFilters() {
    const items = _.flatMap(this.state.data, (data, key) => {
      return data.items;
    });

    const categories = _.flatMap(items, (item) => {
      return item.categories;
    });

    return (<div className="drop-down right">
      <select className="p" name="category" onChange={::this.onFilterCategory}>
        <option selected value="">Filter by Industry</option>
        {_.map(categories, (cat) => {
          return <option key={cat} value={cat}>{cat}</option>
        })}
      </select>
    </div>);
  }

  renderItems() {
    const items = _.flatMap(this.state.data, (data, key) => {
      return data.items;
    }).filter((item) => {
      if (this.state.filters.collection) {
        return (item.fullUrl.indexOf(`/${this.state.filters.collection}`) === 0);
      }

      return true;
    }).filter((item) => {
      if (this.state.filters.category) {
        return (item.categories.indexOf(this.state.filters.category) !== -1);
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

  render() {
    return (<div>
      {this.renderCollectionFilters()}
      {this.renderCategoryFilters()}
      <ul className="flex-container">
        {this.renderItems()}
        <li className="flex-item"></li>
        <li className="flex-item"></li>
      </ul>
    </div>);
  }
}
