const i18next = require('i18next');

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        'error.tokenExpired': 'Your session has expired.',
        'error.tokenInvalid': 'Token is not valid.',
        'error.internal': 'Internal server error.',
      },
    },
  },
});

module.exports = i18next;