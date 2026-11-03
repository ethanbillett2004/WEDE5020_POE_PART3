window.EnquiryValidation = Object.freeze({
  validatePanel(panel) {
    const invalidField = panel.querySelector(':invalid');
    if (!invalidField) return true;

    invalidField.reportValidity();
    invalidField.focus();
    return false;
  },

  findInvalidField(form) {
    return form.querySelector(':invalid');
  }
});
