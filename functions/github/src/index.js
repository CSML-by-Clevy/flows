const moment = require('moment');
const request = require('request-promise');


async function sendRequest(url) {
  try {
    const res = await request({
      method: 'GET',
      headers: {'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0"},
      uri: url,
    });
    return JSON.parse(res);
  } catch (error) {
    return { error };
  }
}

exports.handler = async function handler(event) {
  let url
  if (event.action && event.action === 'search') {
    const query = event.query ? event.query : '';
    const language = event.language ? event.language : '';
    url = `https://api.github.com/search/repositories?q=${query}+language:${language}&sort=stars&order=des`
  } else {
    let period;
    if (event.period && event.period === 'week')
      period = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
    else
      period = moment().subtract(1, 'months').format('YYYY-MM-DD');
    url = `https://api.github.com/search/repositories?q=created:${period}&sort=stars&order=desc&page=1`
  }
  const body = await sendRequest(url);
  if (body.items) return body.items.slice(0, 5).map((item) => {
    return {
      name: item.name,
      full_name: item.full_name,
      stargazers_count: item.stargazers_count,
      language: item.language,
      description: item.description,
      html_url: item.html_url,
      forks_count: item.forks_count,
      watchers: item.watchers,
    }
  })
  else return []
}
