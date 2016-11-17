import React from 'react';
import ReactDOM from 'react-dom';
import FooterList from './footer-list';
import WorkList from './work-list';
import ServicesList from './services-list';

$(function() {
  $('[data-footer-list]').each(function(index, el) {
    ReactDOM.render(<FooterList collection={el.getAttribute('data-footer-list')} />, el);
  });

  $('[data-work-list]').each(function(index, el) {
    ReactDOM.render(<WorkList collections={el.getAttribute('data-work-list')} />, el);
  });

  $('[data-services-list]').each(function(index, el) {
    ReactDOM.render(<ServicesList collections={el.getAttribute('data-services-list')} />, el);
  });
});
