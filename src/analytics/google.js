'use strict';

const dimensions = {
  TRACKING_VERSION: 'dimension1',
  CLIENT_ID: 'dimension2',
  WINDOW_ID: 'dimension3',
};

const uuid = (a) => {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
};

//CREDIT: https://philipwalton.com/articles/the-google-analytics-setup-i-use-on-every-site-i-build/

export const init = () => {

  // Initialize the command queue in case analytics.js hasn't loaded yet.
  window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('set', 'transport', 'beacon');
  ga('set', dimensions.WINDOW_ID, uuid());
  ga('send', 'pageview');
};
