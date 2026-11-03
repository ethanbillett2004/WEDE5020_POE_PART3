(() => {
  const gallery = document.querySelector('.photo-gallery');
  if (!gallery) return;

  const links = Array.from(gallery.querySelectorAll('figure > a'));
  if (!links.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Photo viewer');

  const closeButton = document.createElement('button');
  closeButton.className = 'lightbox-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close photo');
  closeButton.textContent = '×';

  const previousButton = document.createElement('button');
  previousButton.className = 'lightbox-previous';
  previousButton.type = 'button';
  previousButton.setAttribute('aria-label', 'Previous photo');
  previousButton.textContent = '‹';

  const image = document.createElement('img');
  image.className = 'lightbox-image';

  const nextButton = document.createElement('button');
  nextButton.className = 'lightbox-next';
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next photo');
  nextButton.textContent = '›';

  const caption = document.createElement('p');
  caption.className = 'lightbox-caption';
  caption.setAttribute('aria-live', 'polite');

  dialog.append(closeButton, previousButton, image, nextButton, caption);
  document.body.append(dialog);

  let activeIndex = 0;
  let opener = null;

  const showImage = (index) => {
    activeIndex = (index + links.length) % links.length;
    const link = links[activeIndex];
    const thumbnail = link.querySelector('img');
    image.src = link.href;
    image.alt = thumbnail.alt;
    caption.textContent = link.closest('figure').querySelector('figcaption h3').textContent;
  };

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      showImage(index);
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  previousButton.addEventListener('click', () => showImage(activeIndex - 1));
  nextButton.addEventListener('click', () => showImage(activeIndex + 1));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showImage(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(activeIndex + 1);
    }
  });
  dialog.addEventListener('close', () => opener?.focus());
})();
