# Sweet Treats by Abigail

A responsive website for **Sweet Treats by Abigail**, a home-based bakery in **Booysens Park, Gqeberha (Port Elizabeth), South Africa**. The site introduces the bakery, showcases example products, and helps customers contact Abigail about custom orders.

This repository contains the **Web Development Portfolio of Evidence (POE) – Part 3** project. It is a static front-end website built with HTML, CSS, and JavaScript.

## Table of Contents

- [About the Project](#about-the-project)
- [Part 2 Fixes and Refinements](#part-2-fixes-and-refinements)
- [Part 3 New Features](#part-3-new-features)
- [Website Pages](#website-pages)
- [Products](#products)
- [Technologies and Services](#technologies-and-services)
- [Run Locally](#run-locally)
- [Project Structure](#project-structure)
- [Configuration and Limitations](#configuration-and-limitations)
- [Future Improvements](#future-improvements)
- [Screenshots](#screenshots)
- [Author](#author)
- [License](#license)

## About the Project

The website gives the bakery an online presence where visitors can:

- Learn about the bakery and its products.
- Browse product examples and gallery images.
- Search, filter, and sort the product listings.
- Submit an enquiry for a custom order using a step-by-step form.
- Contact Abigail by email, phone, or WhatsApp.
- Find the bakery's location and open it in Google Maps.

The website is designed to work on desktop, tablet, and mobile screens.

## Part 2 Fixes and Refinements

The project notes carried forward from Part 2 do not record specific assessor recommendations. The following refinements address issues and areas for improvement in the earlier site and provide a more consistent foundation for Part 3:

- Improved consistency of page layouts, navigation, footer content, and visual styling.
- Refined responsive layouts and image sizing for smaller screens.
- Organised the site into dedicated HTML pages, CSS, JavaScript, and asset folders.
- Expanded the bakery and product information and improved page readability.
- Added dedicated product, enquiry, and contact experiences alongside the home and about pages.
- Improved the enquiry and contact forms with clearer labels and validation feedback.

## Part 3 New Features

### Product browsing

- Product information is maintained as a JavaScript data structure and rendered dynamically.
- Visitors can search product names, descriptions, categories, and related terms.
- Category filtering and sorting work together with the search.
- A no-results message is shown when nothing matches.

### Gallery and motion

- Gallery images open in an in-page lightbox rather than navigating to standalone image files.
- The lightbox supports keyboard controls and returns focus to the image that opened it.
- Page transitions and subtle animations respect the visitor's reduced-motion preference.
- A decorative custom cursor is enabled only when a fine, hovering pointer is available; touch-only devices keep their native interaction.
- The ordering policy is presented in an expandable disclosure.

### Enquiries and contact

- The custom-order enquiry is split into four steps: About you, Your order, Design & collection, and Review.
- Required fields and South African mobile numbers are validated with inline error messages.
- A review summary is generated before the enquiry is handed off to WhatsApp.
- The WhatsApp link opens a prefilled message; visitors review it and choose whether to send it.
- The contact form submits asynchronously through FormSubmit. If online delivery fails or the page is opened directly from a file, visitors can use pre-filled WhatsApp and email alternatives.

### Location, social, and local discovery

- The contact page embeds a Google Map and provides a direct Google Maps link as a fallback.
- Bakery social links and page-sharing links are provided for Facebook and WhatsApp.
- Page metadata and Bakery structured data include local bakery information for Gqeberha searches.
- `robots.txt` and `sitemap.xml` provide crawler discovery information.

### Performance and basic security

- The homepage banner has an optimized JPEG version; non-critical images use lazy loading where appropriate.
- The pages include a Content Security Policy and a strict referrer policy.
- Local links, page anchors, and selected external links were checked during development.

## Website Pages

- **Home** (`index.html`): Bakery introduction, featured content, and product highlights.
- **About** (`Pages/about.html`): The bakery's background, story, and information.
- **Products** (`Pages/products.html`): Dynamic product listings with search, category filters, sorting, and gallery images.
- **Enquiry** (`Pages/enquiry.html`): Multi-step custom-order enquiry and WhatsApp handoff.
- **Contact** (`Pages/contact.html`): Contact details, business information, map, and contact form.

## Products

The product catalogue includes examples from these categories:

- Custom and celebration cakes
- Bento cakes
- Cupcakes
- Desserts, including pudding and loaf-cake examples

The catalogue is illustrative. Customers should contact Abigail to confirm current availability, pricing, serving sizes, and customisation options.

## Technologies and Services

- HTML5, CSS3, and JavaScript
- Google Fonts
- Google Maps
- FormSubmit for contact-form email processing
- Git and GitHub

## Run Locally

No package installation or build step is required.

1. Clone or download this repository:

   ```bash
   git clone https://github.com/ethanbillett2004/WEDE5020_POE_PART3.git
   ```

2. Open the project folder.
3. Open `index.html` in a modern browser.

Some browser features and third-party integrations may behave differently when pages are opened using a `file://` URL. For a more representative test, serve the folder using a local static web server.

## Project Structure

```text
WEDE5020_POE_PART3/
├── index.html
├── README.md
├── robots.txt
├── sitemap.xml
├── Assets/
│   ├── optimized/
│   │   └── baking-banner.jpg
│   └── ...                  # Bakery and product images
├── CSS/
│   └── styles.css
├── JS/
│   ├── contact.js           # Asynchronous contact-form submission
│   ├── cursor.js            # Fine-pointer custom cursor
│   ├── gallery.js           # Gallery lightbox
│   ├── products.js          # Product data, rendering, search and filters
│   ├── script.js            # Multi-step enquiry form
│   ├── social.js            # Social sharing links
│   └── validation.js        # Shared form validation and message creation
├── Pages/
│   ├── about.html
│   ├── contact.html
│   ├── enquiry.html
│   ├── porducts.html          # Legacy redirect to products.html
│   └── products.html
└── Miscellaneous/
    └── ReadMe.md            # Earlier project notes
```

## Configuration and Limitations

- **Email delivery:** The contact form uses FormSubmit's AJAX endpoint for `abigail.billett17@gmail.com`. FormSubmit may require the recipient to complete its one-time email activation. Verify delivery on the deployed website; this static site has no mail server or database. If FormSubmit fails, the form offers pre-filled WhatsApp and email alternatives.
- **WhatsApp:** The enquiry flow prepares a message but does not send it automatically. The customer must review and send the message in WhatsApp.
- **Map:** The embedded map and external map link require an internet connection.
- **Search indexing:** The sitemap and `robots.txt` contain an absolute GitHub Pages URL. Update them if the production domain or repository path changes, and confirm the site is published at that address.
- **Security policy:** The Content Security Policy is included in page metadata. Hosting-level HTTP security headers require configuration at the hosting provider and cannot be set by this static repository alone.
- **Ordering:** The website does not process payments, reserve dates, or confirm orders. Availability, final pricing, and delivery or collection arrangements must be confirmed with Abigail.

## Future Improvements

- Verify and document the final published website URL and search-engine indexing.
- Add a secure backend if automated order management, storage, or payment processing is required.
- Add customer reviews and a regularly maintained product and availability catalogue.
- Conduct further accessibility, performance, and cross-browser testing.

## Screenshots

<img width="1913" height="955" alt="Bakery website screenshot" src="https://github.com/user-attachments/assets/d7acc761-74f4-4601-b85e-7be818aefa43" />

<img width="1905" height="956" alt="Bakery website screenshot" src="https://github.com/user-attachments/assets/4f359a77-184f-4333-924b-fd758183d59d" />

<img width="1907" height="944" alt="Bakery website screenshot" src="https://github.com/user-attachments/assets/8b300b8a-b12c-497b-a735-aee72e10da00" />

<img width="1918" height="950" alt="Bakery website screenshot" src="https://github.com/user-attachments/assets/1da0b892-102c-4d0f-86f5-fc60774610ca" />

<img width="1905" height="949" alt="Bakery website screenshot" src="https://github.com/user-attachments/assets/44d8ef4e-b4cb-4203-b997-3af136b0b7c8" />

## Author

**Ethan Billett**  
**Student Number:** ST10518720  
**Email:** [ST10518720@RCCONNECT.EDU.ZA](mailto:ST10518720@RCCONNECT.EDU.ZA)  
**Rosebank College**  
Web Development Portfolio of Evidence (POE) – Part 3  
GitHub: [ethanbillett2004](https://github.com/ethanbillett2004)

## License

This project was created for educational purposes as part of the Web Development Portfolio of Evidence (POE).

---

Made with love, just for you.
