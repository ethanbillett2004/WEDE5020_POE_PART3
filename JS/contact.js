(() => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = document.querySelector('#contact-form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  const openMailClientFallback = () => {
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const subject = (formData.get('subject') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    const mailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      message
    ].filter((line) => line !== '').join('\n');

    const mailtoLink = `mailto:abigail.billett17@gmail.com?subject=${encodeURIComponent(subject || 'Website enquiry - Sweet Treats by Abigail')}&body=${encodeURIComponent(mailBody)}`;
    status.textContent = 'Your email app is opening with your message pre-filled. Please send it from there, or open this page through a web server to use the online form.';
    window.location.href = mailtoLink;
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
      openMailClientFallback();
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
      status.textContent = 'Your message could not be sent. Please try again, call Abigail on 071 108 4105, or contact her on WhatsApp.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      form.removeAttribute('aria-busy');
    }
  });
})();
