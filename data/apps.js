import gplay from 'google-play-scraper';
import pLimit from 'p-limit';
import fs from 'fs/promises';
//games
const popularGames = [
'com.whatsapp',
'com.instagram.android',
'com.facebook.katana',
'com.snapchat.android',
'com.twitter.android',
'com.spotify.music',
'com.netflix.mediaclient',
'com.google.android.youtube',
'com.google.android.apps.photos',
'com.google.android.gm',
'com.google.android.apps.maps',
'com.google.android.apps.docs',
'com.google.android.calendar',
'com.google.android.keep',
'com.google.android.dialer',
'com.microsoft.teams',
'com.discord',
'com.amazon.mShop.android.shopping',
'com.flipkart.android',
'in.amazon.mShop.android.shopping',
'com.phonepe.app',
'in.mohalla.sharechat',
'com.jio.jioplay.tv',
'com.sonyliv',
'com.mxtech.videoplayer.ad'

];
function getRandomSize(min = 20, max = 200) {
  return `${Math.floor(Math.random() * (max - min + 1)) + min} MB`;
}

const limit = pLimit(3);
const results = [];

await Promise.all(popularGames.map(pkg =>
  limit(async () => {
    try {
      const app = await gplay.app({ appId: pkg });
      const rev = await gplay.reviews({ appId: pkg, sort: gplay.sort.NEWEST, num: 4 });

      results.push({
        package: pkg,
        title: app.title,
        summary: app.summary,
        score: app.score,
        ratings: app.ratings,
        installs: app.installs,
        size: getRandomSize(),
        icon: app.icon,
        screenshots: app.screenshots.slice(0, 5),
        video: app.video,
        reviews: rev.data.slice(0, 4).map(r => ({
          user: r.userName,
          rating: r.score,
          text: r.text,
          date: r.date
        }))
      });
    } catch (err) {
      console.log(`⚠️ Skipping ${pkg}: ${err.message}`);
    }
  })
));


await fs.writeFile("appsData.json", JSON.stringify(results, null, 2), "utf-8");
console.log("✅ Data saved to appsData.json");
