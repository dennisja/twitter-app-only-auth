const axios = require('axios');
const { API_BASE_URL, DEFAULT_ERROR } = require('./constants');
const { getBearerToken } = require('./utils');

class Twitter {
  constructor(apiKey, apiSecretKey) {
    this._authData = null;
    this._client = axios;
    this._baseUrl = API_BASE_URL;
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

    if (error || token_type !== 'bearer') {
      const {
        errors: [{ message }],
      } = error || DEFAULT_ERROR;
      throw new Error(message);
    }

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    return this._client.get(url, { headers });
  }
}

module.exports = Twitter;
