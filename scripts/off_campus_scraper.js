const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://offcampushousing.rutgers.edu/listing?rent_style=per_person', { waitUntil: 'networkidle2' });

  // Click "Load More" until all listings are loaded
  let loadMoreVisible = true;
  while (loadMoreVisible) {
    try {
      await page.waitForSelector('button[aria-label="load more button"]', { visible: true, timeout: 5000 });
      await page.click('button[aria-label="load more button"]');
      await page.waitForTimeout(2000); // Wait for new listings to load
    } catch (e) {
      loadMoreVisible = false;
    }
  }

  // Extract data from each listing
  const listings = await page.$$eval('.campusDetail', cards => {
    return cards.map(card => {
      // Name
      const name = card.querySelector('.row.desktopInfo .col-sm-6 .ellipsis span:first-child')?.innerText.trim() || 'N/A';

      // Price
      const price = card.querySelector('.row.desktopInfo .col-sm-6.priceSec em.rent_style')?.innerText.trim() || 'N/A';

      // Number of Residents (Beds)
      const num_residents = card.querySelector('.generalInfo ul li:nth-child(2) span.strong')?.innerText.trim() || 'N/A';

      // Image URL
      const image = card.querySelector('img')?.src || 'N/A';

      // Location Type (off-campus)
      const location_type = 'off_campus';

      // Square Footage (second-to-last <td> in unit table row)
      const unitRow = card.querySelector('.tabs.unitTab table tbody tr');
      const sq_ft = unitRow ? unitRow.querySelector('td:nth-last-child(2)')?.innerText.trim() || 'N/A' : 'N/A';

      // Availability
      const availabilityRaw = card.querySelector('.row.desktopInfo .col-sm-6.priceSec span')?.innerText.trim() || 'N/A';
      const availability = availabilityRaw.replace('Available: ', '');

      // Walk Time to Campus
      const walk_time_to_campus = card.querySelector('.generalInfo ul li:first-child span.strong')?.innerText.trim() || 'N/A';

      // Amenities (joined with commas, to be enclosed in quotes later)
      const amenities = Array.from(card.querySelectorAll('.amentiesMobile ul.amenityList li'))
        .map(li => li.innerText.trim())
        .join(', ') || 'N/A';

      return { name, price, num_residents, image, location_type, sq_ft, availability, walk_time_to_campus, amenities };
    });
  });

  // Generate CSV with all fields enclosed in double quotes
  const csvContent = [
    ['Name', 'Price', 'Number of Residents', 'Image URL', 'Location Type', 'Square Footage', 'Availability', 'Walk Time to Campus', 'Amenities']
      .map(header => `"${header}"`).join(','),
    ...listings.map(l => [
      l.name,
      l.price,
      l.num_residents,
      l.image,
      l.location_type,
      l.sq_ft,
      l.availability,
      l.walk_time_to_campus,
      l.amenities
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  // Write to CSV file
  fs.writeFileSync(path.join(__dirname, 'full_off_campus.csv'), csvContent);

  console.log('Scraping complete. Data written to full_off_campus.csv');

  await browser.close();
})();