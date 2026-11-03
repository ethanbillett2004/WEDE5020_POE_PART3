(() => {
  const mousePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!mousePointer.matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="custom-cursor__ring"></span><span class="custom-cursor__dot"></span>';
  document.body.append(cursor);
  document.body.classList.add('has-custom-cursor');

  document.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add('is-visible');
  });

  document.addEventListener('pointerover', (event) => {
    if (event.pointerType !== 'mouse') return;
    const target = event.target instanceof Element ? event.target : null;
    cursor.classList.toggle(
      'is-interactive',
      Boolean(target && target.closest('a, button, input, textarea, select, summary, [role="button"]'))
    );
  });

  document.addEventListener('pointerout', (event) => {
    if (event.pointerType === 'mouse' && !event.relatedTarget) {
      cursor.classList.remove('is-visible', 'is-interactive');
    }
  });

  window.addEventListener('blur', () => cursor.classList.remove('is-visible', 'is-interactive'));
})();
