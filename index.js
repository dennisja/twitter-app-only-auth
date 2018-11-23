const axios = require('axios');
const configs = require('./configs');
const { getBearerToken, formatError } = require('./utils');

class Twitter {
  constructor(apiKey, apiSecretKey) {
    this._authData = null;
    this._client = axios;
    this._baseUrl = configs.API_BASE_URL;
    this._consumerApiKey = apiKey;
    this._consumerApiSecretKey = apiSecretKey;
  }

  async setAuthData() {
    this._authData = await getBearerToken({
      consumerApiKey: this._consumerApiKey,
      consumerApiSecretKey: this._consumerApiSecretKey,
    });
  }

  async get(resourceUrl) {
    const url = `${this._baseUrl}1.1/${resourceUrl}`;
    if (!this._authData) {
      await this.setAuthData();
    }
    const { token_type, access_token, error } = this._authData;

    if (error || token_type != 'bearer') {
      return {
        error:
          'Authentication error: Check that you provided the correct consumer api and secret keys',
      };
    }

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    let response;
    try {
      response = await this._client.get(url, { headers });
    } catch (e) {
      response = formatError(e);
    }
    return response;
  }
}

module.exports = Twitter;
