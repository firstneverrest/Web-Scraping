# Web Scraping with JavaScript
Web scraping is a method used to extracting data from websites. You can use JavaScript libraries to do web scraping. To extract data from websites with JavaScript, you can use Puppeteer library.

## Puppeteer
provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium. Puppeteer has all these features:
- Generate screenshots and PDFs of pages.
- Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e. "SSR" (Server-Side Rendering)).
- Automate form submission, UI testing, keyboard input, etc.
- Create an up-to-date, automated testing environment. Run your tests directly in the latest version of Chrome using the latest JavaScript and browser features.
- Capture a timeline trace of your site to help diagnose performance issues.
- Test Chrome Extensions.

Get More information about [Puppeteer Library](https://github.com/puppeteer/puppeteer).

## How to use Puppeteer
1. `npm init -y` to install package.json
2. Install puppeteer library with `npm install puppeteer`
3. Understand concept of web scraping with puppeteer
   1. Find the url of the website that you want to extract data
   2. Create asynchronous function
   3. Setup puppeteer to access and open that url page
   4. Select the element in the website like image or text
   5. Copy xpath of that element and paste in $x (like JQuery selector)
   6. Get the first element of the array from $x with destructuring
   7. get desired property from el 

    ```javascript
    const puppeteer = require('puppeteer');

    async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // copy xpath from the website which el is the first item in array
    // image
    const [el] = await page.$x('//*[@id="primary"]/section[4]/img');
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();

    // text
    const [el2] = await page.$x('//*[@id="tab-content-01"]/h2/strong');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    // close browser 
    browser.close();
    }

    scrapeProduct('https://www.chula.ac.th/contact/departments/');
    ```
    In case of xPath is not working, you can copy full XPath instead.

## Headless concept
A headless browser is a great tool for automated testing and server environments where you don't need a visible web browser GUI.
Headless is executed via a command-line interface or using network communication. So, it will be very fast to execute.

You can also set puppeteer to be non-headless in launch()
```
const browser = await puppeteer.launch({ headless: false });
```

## What else can be scrapped with Puppeteer
```javascript
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // title
  const title = await page.title()

  // url
  const url = await page.url()

  // page.evaluate() enable to use JavaScript to navigate the DOM
  const getAllDepartment = await page.evaluate(() => {
    const departmentTag = document.querySelectorAll('div.line-height-sm');
    const departments = [];
    departmentTag.forEach((element) => {
      departments.push(element.innerText);
    });
    return departments;
  });

  await console.log(getAllDepartment);
```

## Generate PDF file with Puppeteer
Use page.pdf({options}) to generate pdf file. 
options:
- path: 'output.pdf' - define the pdf file name
- printBackground: true - also print background color
- scale: 1 - if the website is wider than the pdf document, you can scale between 0.1 - 2
- format: "A4" - paper format
- margin: { top: "20px" } - define margin
- landscape: true - apply landscape instead of portrait
```javascript
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
```