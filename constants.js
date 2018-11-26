const API_BASE_URL = 'https://api.twitter.com/';

const DEFAULT_ERROR = {
  errors: [
    {
      message:
        'Check that you provided the correct consumer api and secret keys',
    },
  ],
};

module.exports = {
  API_BASE_URL,
  DEFAULT_ERROR,
};
