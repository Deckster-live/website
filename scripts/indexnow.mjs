// Tells Bing (and other IndexNow engines such as Yandex, Seznam and Naver)
// which deckster.live URLs changed, so they recrawl them within minutes.
//
// Run after a deploy:
//   node scripts/indexnow.mjs                 # every URL in the live sitemap
//   node scripts/indexnow.mjs /about /contact # just these paths
//
// The key is proved by public/<key>.txt, which ships with the site.

const HOST = "deckster.live";
const KEY = "7ac9f5e1061e0467f488f0d63b6f2912";

async function sitemapUrls() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const paths = process.argv.slice(2);
const urlList = paths.length
  ? paths.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`)
  : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200 or 202 means accepted; 403 means the key file isn't live yet.
console.log(`IndexNow: ${res.status} for ${urlList.length} URL(s)`);
if (!res.ok) process.exitCode = 1;
