(() => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = document.querySelector('#contact-form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  const showSendAlternatives = (message) => {
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const subject = (formData.get('subject') || '').toString().trim();
    const body = (formData.get('message') || '').toString().trim();

    const messageBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      `Subject: ${subject}`,
      '',
      body
    ].filter((line) => line !== '').join('\n');
    const emailLink = `mailto:abigail.billett17@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageBody)}`;
    const whatsappLink = `https://wa.me/27711084105?text=${encodeURIComponent(messageBody)}`;

    status.replaceChildren(document.createTextNode(`${message} `));
    [
      { href: whatsappLink, text: 'Send with WhatsApp', newTab: true },
      { href: emailLink, text: 'Send with email', newTab: false }
    ].forEach((option, index) => {
      if (index) status.append(document.createTextNode(' · '));
      const link = document.createElement('a');
      link.href = option.href;
      link.className = 'text-button';
      link.textContent = option.text;
      if (option.newTab) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      status.append(link);
    });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';

    const invalidField = window.EnquiryValidation.findInvalidField(form);
    if (invalidField) {
      invalidField.reportValidity();
      invalidField.focus();
      return;
    }

    if (window.location.protocol === 'file:') {
      showSendAlternatives('Online sending is unavailable when this page is opened directly from a file. Your message is ready to send:');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent('abigail.billett17@gmail.com')}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      const result = await response.json();

      if (!response.ok || result.success !== true && result.success !== 'true') {
        throw new Error(result.message || `Form service returned HTTP ${response.status}.`);
      }

      form.reset();
      form.querySelectorAll('input, select, textarea').forEach((field) => {
        field.setCustomValidity('');
        field.setAttribute('aria-invalid', 'false');
        const error = document.getElementById(`${field.id}-error`);
        if (error) error.textContent = '';
      });
      status.textContent = 'Thanks! Your message has been sent. Abigail will get back to you soon.';
    } catch (error) {
      console.error('Contact form submission failed:', error);
      showSendAlternatives('The online form could not send your message. Your message is still here; send it using:');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      form.removeAttribute('aria-busy');
    }
  });
})();
