const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const puppeteer = require('puppeteer');

const readFile = promisify(fs.readFile);

const WIDTH = 600;
const HEIGHT = 313;

async function generateMetaImage(browser, filePath, title) {
  const page = await browser.newPage();

  await page.goto(
    'http://localhost:5000/?fixtureId=%7B"path"%3A"src%2Fcomponents%2F__fixtures__%2FPostMetaImage.fixture.js"%2C"name"%3Anull%7D&fullScreen=true'
  );

  await page.$eval(
    'iframe',
    (iframe, text) => {
      const h1 = iframe.contentDocument.body.querySelector('h1');
      h1.innerText = text;
    },
    title
  );

  await page.screenshot({
    path: path.join(path.dirname(filePath), 'meta-image.png'),
    clip: {
      x: 0,
      y: 0,
      width: WIDTH,
      height: HEIGHT,
    },
  });

  await page.close();
}

async function findPostTitle(postPath) {
  const postData = await readFile(postPath);

  const group = /^title:(.*)/m.exec(postData);

  if (!group || !group[1]) {
    throw new Error('Cannot find title on post: ' + postPath);
  }

  const postTitle = group[1].trim().replace(/^['"]|['"]$/g, '');

  return postTitle;
}

async function main() {
  const files = process.argv.slice(2);

  if (!files.length) {
    // silent exit
    return;
  }

  console.info(
    '(re-)Generating meta images for these posts:\n' +
      files.map(file => ' - ' + file).join('\n')
  );

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: WIDTH * 2,
      height: 313,
    },
  });

  for (let file of files) {
    const title = await findPostTitle(file);

    await generateMetaImage(browser, file, title);
  }

  await browser.close();
}

main();
