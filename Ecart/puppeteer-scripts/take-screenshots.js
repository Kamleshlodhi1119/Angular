// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   // Login as customer
//   await page.goto('http://localhost:4200/user/auth/login', { waitUntil: 'networkidle2' });

//   // Fill login form (adjust selectors if needed)
//   await page.type('input[type="email"]', 'k@gmail.com');
//   await page.type('input[type="password"]', '123456');

//   // Click login button - update selector based on your login button
//   await Promise.all([
//     page.click('button[type="submit"]'),  // assuming login button is a submit button
//     page.waitForNavigation({ waitUntil: 'networkidle2' }),
//   ]);

//   console.log('Customer logged in successfully.');

//   // List of routes to screenshot after login
//   const pagesToCapture = [
//     { url: 'http://localhost:4200/home', name: 'home' },
//     { url: 'http://localhost:4200/products', name: 'products' },
//     { url: 'http://localhost:4200/cart', name: 'cart' },
//     { url: 'http://localhost:4200/checkout', name: 'checkout' },
//     { url: 'http://localhost:4200/orders', name: 'orders' },
//     { url: 'http://localhost:4200/profile', name: 'profile' },
//     { url: 'http://localhost:4200/feedback', name: 'feedback' },
//   ];

//   for (const p of pagesToCapture) {
//     await page.goto(p.url, { waitUntil: 'networkidle2' });
//     await page.screenshot({ path: `../screenshots/customer-${p.name}.png`, fullPage: true });
//     console.log(`Screenshot taken for ${p.name}`);
//   }

//   // Log out or close browser before admin login
//   // For simplicity, close and open new browser session:
//   await browser.close();

//   // --- Admin login ---

//   const browserAdmin = await puppeteer.launch({ headless: true });
//   const pageAdmin = await browserAdmin.newPage();

//   await pageAdmin.goto('http://localhost:4200/admin/admin-login', { waitUntil: 'networkidle2' });

//   await pageAdmin.type('input[type="email"]', 'admin123@gmail.com');
//   await pageAdmin.type('input[type="password"]', 'password123');

//   await Promise.all([
//     pageAdmin.click('button[type="submit"]'),
//     pageAdmin.waitForNavigation({ waitUntil: 'networkidle2' }),
//   ]);

//   console.log('Admin logged in successfully.');

//   // Admin pages to capture
//   const adminPages = [
//     { url: 'http://localhost:4200/admin/dashboard', name: 'dashboard' },
//     { url: 'http://localhost:4200/admin/customers', name: 'customers' },
//     { url: 'http://localhost:4200/admin/orders', name: 'orders' },
//     { url: 'http://localhost:4200/admin/feedbacks', name: 'feedbacks' },
//     { url: 'http://localhost:4200/admin/products', name: 'products' },
//   ];

//   for (const p of adminPages) {
//     await pageAdmin.goto(p.url, { waitUntil: 'networkidle2' });
//     await pageAdmin.screenshot({ path: `../screenshots/admin-${p.name}.png`, fullPage: true });
//     console.log(`Screenshot taken for admin ${p.name}`);
//   }

//   await browserAdmin.close();
// })();
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to typical laptop screen size
  await page.setViewport({ width: 1366, height: 768 });

  // Login as customer
  await page.goto('http://localhost:4200/user/auth/login', { waitUntil: 'networkidle2' });

  // Fill login form
  await page.type('input[type="email"]', 'k@gmail.com');
  await page.type('input[type="password"]', '123456');

  // Click login button
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  console.log('Customer logged in successfully.');

  const pagesToCapture = [
    { url: 'http://localhost:4200/home', name: 'home' },
    { url: 'http://localhost:4200/Shop', name: 'products' },
    { url: 'http://localhost:4200/cart', name: 'cart' },
    { url: 'http://localhost:4200/checkout', name: 'checkout' },
    { url: 'http://localhost:4200/orders', name: 'orders' },
    { url: 'http://localhost:4200/profile', name: 'profile' },
    { url: 'http://localhost:4200/feedback', name: 'feedback' },
  ];

  for (const p of pagesToCapture) {
    await page.goto(p.url, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `../screenshots/customer-${p.name}.png`, fullPage: true });
    console.log(`Screenshot taken for ${p.name}`);
  }

  await browser.close();

  // Admin login
  const browserAdmin = await puppeteer.launch({ headless: true });
  const pageAdmin = await browserAdmin.newPage();

  // Set same viewport for admin
  await pageAdmin.setViewport({ width: 1366, height: 768 });

  await pageAdmin.goto('http://localhost:4200/admin/admin-login', { waitUntil: 'networkidle2' });

  await pageAdmin.type('input[type="email"]', 'admin123@gmail.com');
  await pageAdmin.type('input[type="password"]', 'password123');

  await Promise.all([
    pageAdmin.click('button[type="submit"]'),
    pageAdmin.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  console.log('Admin logged in successfully.');

  const adminPages = [
    { url: 'http://localhost:4200/admin/dashboard', name: 'dashboard' },
    { url: 'http://localhost:4200/admin/customers', name: 'customers' },
    { url: 'http://localhost:4200/admin/orders', name: 'orders' },
    { url: 'http://localhost:4200/admin/feedbacks', name: 'feedbacks' },
    { url: 'http://localhost:4200/admin/products', name: 'products' },
  ];

  for (const p of adminPages) {
    await pageAdmin.goto(p.url, { waitUntil: 'networkidle2' });
    await pageAdmin.screenshot({ path: `../screenshots/admin-${p.name}.png`, fullPage: true });
    console.log(`Screenshot taken for admin ${p.name}`);
  }

  await browserAdmin.close();
})();
