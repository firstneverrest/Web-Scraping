const puppeteer = require('puppeteer');

async function scrapeData(url) {
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

  // page.evaluate() enable to use JavaScript to navigate the DOM
  const getAllDepartment = await page.evaluate(() => {
    const departmentTag = document.querySelectorAll('div.line-height-sm');
    const departments = [];
    departmentTag.forEach((element) => {
      departments.push(element.innerText);
    });
    // departments.push(departmentTag.innerHTML);
    return departments;
  });

  const getAllContact = await page.evaluate(() => {
    const contactTag = document.querySelectorAll('td.small');
    const contacts = [];
    contactTag.forEach((element) => {
      contacts.push(element.innerText);
    });

    return contacts;
  });

  // await console.log(getAllDepartment);
  //   await console.log(getAllContact);

  console.log({ imgURL, title });

  browser.close();
}

scrapeData('https://www.chula.ac.th/contact/departments/');
