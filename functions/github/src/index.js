const request = require('request-promise');


exports.handler = async function handler(event) {
  try {
    const res = await request({
      method: 'GET',
      headers: {'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0"},
      uri: event.url,
    });
    return JSON.parse(res);
  } catch (error) {
    return { error };
  }
}
