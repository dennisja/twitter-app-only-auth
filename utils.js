const configs = require('./constants');
const axios = require('axios');

const formatError = (e) => {
  let error;
  if (e.response) {
    error = e.response.data;
  } else if (e.request) {
    error = e.request;
  } else {
    error = e;
  }
  return error;
};
const getBearerToken = async ({ consumerApiKey, consumerApiSecretKey }) => {
  const apiKey = encodeURIComponent(consumerApiKey);
  const apiSecretKey = encodeURIComponent(consumerApiSecretKey);
  const authString = `${apiKey}:${apiSecretKey}`;
  const encodedAuthString = Buffer.from(authString).toString('base64');
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept-Encoding': 'gzip',
    Authorization: `Basic ${encodedAuthString}`,
  };
  const url = `${configs.API_BASE_URL}oauth2/token`;
  const params = {
    grant_type: 'client_credentials',
  };
  let response;

  try {
    response = await axios.post(url, undefined, { headers, params });
    response = { ...response.data, error: null };
  } catch (e) {
    let error = formatError(e);
    response = { error, token_type: null, access_token: null };
  }

  return response;
};

module.exports = {
  getBearerToken,
  formatError,
};
