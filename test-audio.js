import https from 'https';
https.get('https://cdn.islamic.network/quran/audio/192/ar.abdulbasitmurattal/1.mp3', (res) => {
  console.log('abdulbasit 192:', res.statusCode);
});
https.get('https://api.alquran.cloud/v1/ayah/1/ar.minshawi', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('minshawi:', json.data.audio);
  });
});
https.get('https://api.alquran.cloud/v1/ayah/1/ar.husary', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('husary:', json.data.audio);
  });
});
https.get('https://api.alquran.cloud/v1/ayah/1/ar.alafasy', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('alafasy:', json.data.audio);
  });
});
