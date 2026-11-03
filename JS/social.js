(() => {
  const pageUrl = window.location.href;
  const shareUrl = new URL('https://www.facebook.com/sharer/sharer.php');
  shareUrl.searchParams.set('u', pageUrl);

  const title = document.querySelector('meta[property="og:title"]')?.content || document.title;
  const message = `${title} ${pageUrl}`;

  document.querySelectorAll('[data-share="facebook"]').forEach((link) => {
    link.href = shareUrl.href;
  });

  document.querySelectorAll('[data-share="whatsapp"]').forEach((link) => {
    link.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
  });
})();
