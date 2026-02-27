import { get, set } from 'idb-keyval';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahs = async () => {
  try {
    const cached = await get('surahs_list');
    if (cached) return cached;

    const res = await fetch(`${BASE_URL}/surah`);
    const data = await res.json();
    await set('surahs_list', data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    return [];
  }
};

export const fetchSurah = async (id: number, edition = 'quran-uthmani') => {
  try {
    const cacheKey = `surah_${id}_${edition}`;
    const cached = await get(cacheKey);
    if (cached) return cached;

    const res = await fetch(`${BASE_URL}/surah/${id}/${edition}`);
    const data = await res.json();
    await set(cacheKey, data.data);
    return data.data;
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    return null;
  }
};

export const fetchAyahOfTheDay = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const cached = await get(`ayah_of_day_${today}`);
    if (cached) return cached;

    const randomAyah = Math.floor(Math.random() * 6236) + 1;
    const res = await fetch(`${BASE_URL}/ayah/${randomAyah}/quran-uthmani`);
    const data = await res.json();
    await set(`ayah_of_day_${today}`, data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching ayah of the day:', error);
    return null;
  }
};
