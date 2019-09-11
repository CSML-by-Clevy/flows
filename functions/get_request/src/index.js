const request = require('request-promise');


exports.handler = async function handler(event) {
  try {
    const res = await request({
      method: 'GET',
      uri: event.url,
    });
    return JSON.parse(res);
  } catch (error) {
    return { error };
  }
}
