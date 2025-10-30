export async function handler() {
  try {
    const res = await fetch('https://api.blockchain.info/charts/hash-rate?timespan=14days&format=json&cors=true');
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const data = await res.json();
    const points = data.values || [];
    if (!points.length) throw new Error('No data');
    const tail = points.slice(-7).map(p => p.y);
    const avg = tail.reduce((a,b)=>a+b,0)/tail.length;
    return { statusCode:200, headers:{'content-type':'application/json','cache-control':'public, max-age=600'}, body: JSON.stringify({ value: avg, unit:'EH/s', source:'blockchain.com' }) };
  } catch (e) { return { statusCode:502, body: JSON.stringify({ error:String(e) }) }; }
}