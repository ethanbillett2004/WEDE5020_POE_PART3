(() => {
  const phonePattern = /^(?:(?:\+|00)27|0)[678]\d{8}$/;
  const phoneError = 'Enter a South African mobile number, e.g. 071 123 4567 or +27 71 123 4567.';

  const getFieldError = (field) => {
    let error = document.getElementById(`${field.id}-error`);
    if (!error) {
      error = document.createElement('span');
      error.id = `${field.id}-error`;
      error.className = 'field-error';
      error.setAttribute('aria-live', 'polite');
      field.insertAdjacentElement('afterend', error);
    }

    const describedBy = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    describedBy.add(error.id);
    field.setAttribute('aria-describedby', Array.from(describedBy).join(' '));
    return error;
  };

  const validateField = (field, showError = false) => {
    field.setCustomValidity('');

    const value = field.value.trim();
    if (field.required && !value) {
      field.setCustomValidity('Please complete this field.');
    } else if (field.type === 'tel' && value) {
      const normalizedPhone = value.replace(/[\s()-]/g, '');
      if (!phonePattern.test(normalizedPhone)) field.setCustomValidity(phoneError);
    }

    if (!field.validity.valid) {
      if (showError || document.getElementById(`${field.id}-error`)) {
        const message = field.validationMessage || 'Please check this field.';
        getFieldError(field).textContent = message;
        field.setAttribute('aria-invalid', 'true');
      }
      return false;
    }

    const error = document.getElementById(`${field.id}-error`);
    if (error) error.textContent = '';
    field.setAttribute('aria-invalid', 'false');
    return true;
  };

  const getInvalidFields = (container) => Array.from(container.querySelectorAll('input, select, textarea'))
    .filter((field) => !validateField(field, true));

  document.addEventListener('input', (event) => {
    const field = event.target;
    if (field.matches('input, select, textarea') && field.id) {
      validateField(field, field.getAttribute('aria-invalid') === 'true');
    }
  });

  window.EnquiryValidation = Object.freeze({
    validatePanel(panel) {
      const invalidFields = getInvalidFields(panel);
      if (!invalidFields.length) return true;
      invalidFields[0].reportValidity();
      invalidFields[0].focus();
      return false;
    },

    findInvalidField(form) {
      return getInvalidFields(form)[0] || null;
    },

    buildWhatsAppMessage(form, labels) {
      return [
        'Hi Abigail! I would like to enquire about:',
        ...Object.entries(labels)
          .map(([name, label]) => {
            const value = form.elements[name].value.trim();
            return value ? `${label}: ${value}` : '';
          })
          .filter(Boolean),
        form.elements.notes.value.trim()
      ].filter(Boolean).join('\n');
    }
  });
})();
