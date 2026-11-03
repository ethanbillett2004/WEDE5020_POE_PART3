(() => {
  const form = document.querySelector('.enquiry-form');
  const tabs = Array.from(form.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
  const previousButton = form.querySelector('.enquiry-previous');
  const nextButton = form.querySelector('.enquiry-next');
  const submitButton = form.querySelector('.enquiry-submit');
  const summary = form.querySelector('.enquiry-summary');
  const labels = {
    'customer-name': 'Name',
    'customer-phone': 'Contact number',
    'customer-email': 'Email',
    treat: 'Treat',
    quantity: 'Quantity or portions',
    date: 'Preferred date',
    design: 'Design ideas',
    collection: 'Collection or delivery',
    dietary: 'Dietary requirements'
  };
  let activeIndex = 0;

  const showTab = (index, moveFocus = false) => {
    activeIndex = index;
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[tabIndex].hidden = !selected;
    });
    previousButton.hidden = index === 0;
    nextButton.hidden = index === tabs.length - 1;
    submitButton.hidden = index !== tabs.length - 1;
    if (index === tabs.length - 1) updateSummary();
    if (moveFocus) tabs[index].focus();
  };

  const updateSummary = () => {
    summary.replaceChildren();
    Object.entries(labels).forEach(([name, label]) => {
      const value = form.elements[name].value.trim();
      if (!value) return;
      const row = document.createElement('p');
      const heading = document.createElement('strong');
      heading.textContent = `${label}: `;
      row.append(heading, document.createTextNode(value));
      summary.append(row);
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showTab(index));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      showTab(nextIndex, true);
    });
  });

  previousButton.addEventListener('click', () => showTab(activeIndex - 1, true));
  nextButton.addEventListener('click', () => {
    const invalidField = panels[activeIndex].querySelector(':invalid');
    if (invalidField) {
      invalidField.reportValidity();
      invalidField.focus();
      return;
    }
    showTab(activeIndex + 1, true);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalidField = form.querySelector(':invalid');
    if (invalidField) {
      const invalidPanel = panels.findIndex((panel) => panel.contains(invalidField));
      showTab(invalidPanel, true);
      invalidField.reportValidity();
      return;
    }

    const message = [
      'Hi Abigail! I would like to enquire about:',
      ...Object.entries(labels)
        .map(([name, label]) => {
          const value = form.elements[name].value.trim();
          return value ? `${label}: ${value}` : '';
        })
        .filter(Boolean),
      form.elements.notes.value.trim()
    ].filter(Boolean).join('\n');
    form.elements.text.value = message;
    form.submit();
  });
})();
