import axios from 'axios';
import querystring from 'querystring';

export default async ({
  method = 'GET',
  url = '',
  params = {},
  options = {},
  extraHeaders = {},
}) => {
  const axiosInstance = axios.create({
    timeout: 5000,
  });

  if (method === 'GET') {
    const query = Object.keys(params).length
      ? `?${querystring.stringify(params)}`
      : '';
    const pathWithQuery = `${url}${query}`;
    return axiosInstance
      .get(pathWithQuery, {
        timeout: 5000,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
          'Content-type': 'application/json',
          ...extraHeaders,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error.message ? error.message : `${url} error`;
      });
  } else {
    return axiosInstance
      .post(url, params, {
        timeout: 5000,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
          'Content-type': 'application/json',
          ...extraHeaders,
        },
        ...options,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error.message ? error.message : `${url} error`;
      });
  }
};
