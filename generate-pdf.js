const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://reactjs.org/', {
    waitUntil: 'networkidle2',
  });
  await page.pdf({
    path: 'output.pdf',
    printBackground: true,
    scale: 0.6,
    margin: { top: '20px', bottom: '20px' },
  });

  await browser.close();
})();
