export async function handler() {
  try {
    const key = process.env.CQ_API_KEY;
    if (!key) {
      return { statusCode:200, body: JSON.stringify({ value:null, unit:'BTC/day', note:'Set CQ_API_KEY env to enable', source:'CryptoQuant' }) };
    }
    const url = 'https://api.cryptoquant.com/v1/btc/flow-miners?window=day&format=json';
    const res = await fetch(url, { headers: { 'x-api-key': key }});
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const data = await res.json();
    const items = data?.result?.data || data?.data || [];
    const last = items[items.length-1];
    const val = last?.value ?? last?.outflow ?? null;
    return { statusCode:200, headers:{'content-type':'application/json','cache-control':'public, max-age=600'}, body: JSON.stringify({ value: val, unit:'BTC/day', source:'CryptoQuant' }) };
  } catch (e) { return { statusCode:502, body: JSON.stringify({ error:String(e) }) }; }
}