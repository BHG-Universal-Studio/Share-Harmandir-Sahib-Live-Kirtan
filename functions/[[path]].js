export async function onRequest(context) {
  const url = new URL(context.request.url);
  const videoId = url.pathname.replace("/", "").trim();

  // Use YouTube thumbnail for shorts, fallback to app logo
  const ogImage = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://harmandir-sahib-live-kirtan.pages.dev/logo.png";

  // Fetch the real index.html from Pages
  const asset = await context.env.ASSETS.fetch(
    new Request(`${url.origin}/index.html`)
  );

  let html = await asset.text();

  // 🔥 Inject OG tags for Gurbani Shorts
  html = html.replace(
    "</head>",
    `
<meta property="og:type" content="video.other" />
<meta property="og:site_name" content="Harmandir Sahib Live Kirtan" />
<meta property="og:title" content="Gurbani Shorts" />
<meta property="og:description"
      content="Watch and share short Gurbani and Kirtan videos. Experience divine Gurbani moments through Gurbani Shorts." />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1280" />
<meta property="og:image:height" content="720" />
<meta property="og:url" content="${url.href}" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Gurbani Shorts" />
<meta name="twitter:description"
      content="Short Gurbani and Kirtan videos to watch and share." />
<meta name="twitter:image" content="${ogImage}" />
</head>`
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
