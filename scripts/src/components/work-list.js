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

  onFilterCollection(event) {
    event.preventDefault();

    const {collection, category, tag} = this.state.filters;

    this.setState({
      filters: {
        collection: event.target.getAttribute('data-value'),
        category,
        tag
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

  onFilterTag(event) {
    const {collection, category, tag} = this.state.filters;

    this.setState({
      filters: {
        collection,
        category,
        tag: event.target.value
      }
    });
  }

  getFilteredItems() {
    return _.flatMap(this.state.data, (data, key) => {
      return data.items;
    }).filter((item) => {
      if (this.state.filters.collection) {
        return (item.fullUrl.indexOf(`/${this.state.filters.collection}`) === 0);
      }

      return true;
    }).filter((item) => {
      if (this.state.filters.category) {
        if (item.categories) {
          return (item.categories.indexOf(this.state.filters.category) !== -1);
        }

        return false;
      }

      return true;
    }).filter((item) => {
      if (this.state.filters.tag) {
        if (item.tags) {
          return (item.tags.indexOf(this.state.filters.tag) !== -1);
        }

        return false;
      }

      return true;
    });
  }

  renderCollectionFilters() {
    const filters = [];
    const collections = this.props.collections.split(',');

    filters.push(<li key="all" className={this.state.filters.collection === '' ? 'active' : ''}>
      <a href="/work" onClick={::this.onFilterCollection} data-value="">All</a>
    </li>);

    for (let i = 0; i < collections.length; i++) {
      const data = this.state.data[collections[i]];
      const {fullUrl, navigationTitle} = data.collection;
      filters.push(<li key={collections[i]} className={this.state.filters.collection === collections[i] ? 'active' : ''}>
        <a href={fullUrl} onClick={::this.onFilterCollection} data-value={collections[i]}>{navigationTitle}</a>
      </li>);
    }

    return (<ul className="link-list category-filter h5 left">
      {filters}
    </ul>);
  }

  renderTagFilters() {
    const filters = [];
    const items = _.flatMap(this.state.data, (data, key) => {
      return data.items;
    });

    const tags = _.flatMap(items, (item) => {
      return item.tags;
    }).filter((item) => {
      return item;
    });

    return (<div className="drop-down right">
      <select className="p" name="category" onChange={::this.onFilterTag} defaultValue="">
        <option value="">Technology</option>
        {_.map(tags, (tag, key) => {
          return <option key={key} value={tag}>{tag}</option>
        })}
      </select>
    </div>);
  }

  renderCategoryFilters() {
    const items = _.flatMap(this.state.data, (data, key) => {
      return data.items;
    });

    const categories = _.flatMap(items, (item) => {
      return item.categories;
    }).filter((cat) => {
      return cat;
    });

    return (<div className="drop-down right">
      <select className="p" name="category" onChange={::this.onFilterCategory} defaultValue="">
        <option value="">Industry</option>
        {_.map(categories, (cat, key) => {
          return <option key={key} value={cat}>{cat}</option>
        })}
      </select>
    </div>);
  }

  renderItems() {
    const items = this.getFilteredItems();

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
    return (<div className="work-list">
      {this.renderCollectionFilters()}
      {this.renderCategoryFilters()}
      {this.renderTagFilters()}
      <ul className="flex-container">
        {this.renderItems()}
        <li className="flex-item"></li>
        <li className="flex-item"></li>
      </ul>
    </div>);
  }
}
