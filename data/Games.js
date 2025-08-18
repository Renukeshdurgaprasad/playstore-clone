import gplay from 'google-play-scraper';
import pLimit from 'p-limit';
import fs from 'fs/promises';

const popularGames = [
  "com.supercell.clashofclans",
  "com.supercell.clashroyale",
  "com.supercell.brawlstars",
  "com.king.candycrushsaga",
  "com.king.candycrushsodasaga",
  "com.miniclip.eightballpool",
  "com.pubg.imobile",
  "com.tencent.ig",                 // BGMI / PUBG Mobile
  "com.garena.game.kgvn",           // Free Fire
  "com.roblox.client",
  "com.mojang.minecraftpe",
  "com.nianticlabs.pokemongo",
  "com.activision.callofduty.shooter",
  "com.riotgames.league.wildrift",
  "com.mobile.legends",
  "com.ludo.king",
  "com.zeptolab.cats.google",
  "com.playrix.gardenscapes",
  "com.playrix.homescapes",
  "com.kiloo.subwaysurf",
  "com.imangi.templerun2",
  "com.rovio.baba",                 // Angry Birds 2
  "com.outfit7.mytalkingtomfree",
  "com.outfit7.mytalkingangelafree",
  "com.nianticproject.ingress",        // Honor of Kings
  "com.ea.games.r3_row",            // Real Racing 3
  "com.gameloft.android.ANMP.GloftA9HM", // Asphalt 9             // Cut the Rope
  "com.ea.game.pvzfree_row",        // Plants vs Zombies
  "com.king.farmheroessaga",
  "com.ketchapp.twist",
  "com.sgn.pandapop.gp"
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

await fs.writeFile("GamesData.json", JSON.stringify(results, null, 2), "utf-8");
console.log("✅ Data saved to appsData.json");
