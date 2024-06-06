import axios, { AxiosInstance } from 'axios';

const token = 'xK@OsiDmAss4NTVX4Jop';

class RestApiClient {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      withCredentials: true,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  }
}

export default RestApiClient;
