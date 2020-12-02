import http from 'http';
import fetch from 'node-fetch';

const agent = new http.Agent({ keepAlive: true });

async function run(n: number) {
  let start = Date.now();
  try {
    const res = await await fetch(
      'http://fs-de-Servi-1H3Y6JRDC1ZZX-1478527871.eu-central-1.elb.amazonaws.com/slow',
      {
        agent: agent,
      }
    );
    const text = await res.text();
    try {
      const body = JSON.parse(text);
      console.log('success %s %d', body.foo, Date.now() - start);
    } catch (e) {
      console.log(
        '(status %d)invalid json %d',
        res.status,
        Date.now() - start,
        text
      );
    }
  } catch (e) {
    console.log('error %d', Date.now() - start, e);
  }
  setTimeout(() => run(n + 1), 100);
}

run(0);
// run(0);
// run(0);
// run(0);
// run(0);
// run(0);
