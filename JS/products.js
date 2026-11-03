(() => {
  const products = [
    {
      name: 'Custom cakes',
      category: 'cakes',
      image: '06-1000299412.jpg',
      imageAlt: 'Black and white rose cake',
      description: 'A cake for your kind of celebration. Share your theme, colours and the number of guests.',
      searchTerms: 'celebration buttercream rose'
    },
    {
      name: 'Bento cake boxes',
      category: 'bento',
      image: '09-1000299409.jpg',
      imageAlt: 'Liverpool Bento cake box',
      description: 'Little cakes, lovely gestures. A thoughtful treat for birthdays and just-because moments.',
      searchTerms: 'small cake birthday gift'
    },
    {
      name: 'Mini cakes',
      category: 'cakes',
      image: '08-1000299410.jpg',
      imageAlt: 'Black and gold birthday cake',
      description: 'A smaller centrepiece for an intimate celebration.',
      searchTerms: 'small birthday celebration'
    },
    {
      name: 'Cupcakes',
      category: 'cupcakes',
      image: '11-1000299407.jpg',
      imageAlt: 'Red velvet cupcakes',
      description: 'Pretty little treats for sharing, gifting and party tables.',
      searchTerms: 'red velvet party sharing'
    },
    {
      name: 'Tarts & puddings',
      category: 'desserts',
      image: '02-1000299416.jpg',
      imageAlt: 'Peppermint tart',
      description: 'Something sweet to bring everyone back to the table.',
      searchTerms: 'peppermint tart pudding'
    },
    {
      name: 'Loaf & dessert cakes',
      category: 'desserts',
      image: '13-1000299405.jpg',
      imageAlt: 'Chocolate loaf cake',
      description: 'A slice of comfort for a gathering or an everyday treat.',
      searchTerms: 'chocolate loaf cake'
    }
  ];

  const scriptUrl = document.currentScript.src;
  const assetUrl = (file) => new URL(`../Assets/${file}`, scriptUrl).href;
  const enquiryUrl = new URL('../Pages/enquiry.html', scriptUrl).href;
  const categoryNames = {
    cakes: 'Cakes',
    bento: 'Bento cakes',
    cupcakes: 'Cupcakes',
    desserts: 'Desserts'
  };

  const renderProduct = (product, index) => {
    const article = document.createElement('article');
    article.className = 'product';

    const image = document.createElement('img');
    image.className = 'product-image';
    image.src = assetUrl(product.image);
    image.alt = product.imageAlt;
    image.loading = 'lazy';
    image.decoding = 'async';

    const number = document.createElement('span');
    number.className = 'number';
    number.textContent = String(index + 1).padStart(2, '0');

    const title = document.createElement('h3');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const link = document.createElement('a');
    link.href = enquiryUrl;
    link.append(document.createTextNode(`Enquire about ${product.name.toLowerCase()} `));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    link.append(arrow);

    article.append(image, number, title, description, link);
    return article;
  };

  const initializeProductListings = () => {
    const grids = document.querySelectorAll('.product-grid');
    if (!grids.length) return;

    const searchInput = document.querySelector('#product-search');
    const categorySelect = document.querySelector('#product-category');
    const sortSelect = document.querySelector('#product-sort');
    const resultsMessage = document.querySelector('#product-results');
    const emptyMessage = document.querySelector('#product-empty');

    const updateListings = () => {
      const query = searchInput?.value.trim().toLocaleLowerCase() ?? '';
      const category = categorySelect?.value ?? 'all';
      const sort = sortSelect?.value ?? 'featured';

      const matchingProducts = products.filter((product) => {
        const matchesCategory = category === 'all' || product.category === category;
        const searchableText = `${product.name} ${categoryNames[product.category]} ${product.description} ${product.searchTerms}`.toLocaleLowerCase();
        return matchesCategory && searchableText.includes(query);
      });

      if (sort === 'name-asc') {
        matchingProducts.sort((first, second) => first.name.localeCompare(second.name));
      } else if (sort === 'name-desc') {
        matchingProducts.sort((first, second) => second.name.localeCompare(first.name));
      }

      grids.forEach((grid) => {
        grid.replaceChildren(...matchingProducts.map(renderProduct));
      });

      if (resultsMessage) {
        const count = matchingProducts.length;
        resultsMessage.textContent = `${count} ${count === 1 ? 'treat' : 'treats'} found`;
      }
      if (emptyMessage) emptyMessage.hidden = matchingProducts.length > 0;
    };

    searchInput?.addEventListener('input', updateListings);
    categorySelect?.addEventListener('change', updateListings);
    sortSelect?.addEventListener('change', updateListings);
    updateListings();
  };

  initializeProductListings();
})();
