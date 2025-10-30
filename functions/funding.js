export async function handler() {
  try {
    const res = await fetch('https://fapi.binance.com/fapi/v1/fundingRate?symbol=BTCUSDT&limit=1');
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const arr = await res.json();
    const last = arr && arr[0];
    const rate = last ? Number(last.fundingRate) : null;
    return { statusCode:200, headers:{'content-type':'application/json','cache-control':'public, max-age=60'}, body: JSON.stringify({ value: rate, unit:'', exchange:'Binance', symbol:'BTCUSDT' }) };
  } catch (e) { return { statusCode:502, body: JSON.stringify({ error:String(e) }) }; }
}