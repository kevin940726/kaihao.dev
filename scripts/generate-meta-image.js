const fs = require('fs');
const { promisify } = require('util');
const { exec } = require('child_process');
const path = require('path');
const puppeteer = require('puppeteer');
const waitForLocalhost = require('wait-for-localhost');

const readFile = promisify(fs.readFile);

const WIDTH = 600;
const HEIGHT = 313;

const fontfaceobserver = readFile(require.resolve('fontfaceobserver'), 'utf-8');

async function generateMetaImage(browser, filePath, title) {
  const page = await browser.newPage();

  await page.goto(
    'http://localhost:5000/?fixtureId=%7B"path"%3A"src%2Fcomponents%2F__fixtures__%2FPostMetaImage.fixture.js"%2C"name"%3Anull%7D&fullScreen=true'
  );

  const iframe = page
    .frames()
    .find(frame => frame.url() === 'http://localhost:5000/_renderer.html');

  await iframe.$eval(
    'h1',
    (element, text) => {
      element.innerText = text;
    },
    title
  );

  const fontfaceobserverSource = await fontfaceobserver;

  await iframe.addScriptTag({
    content: fontfaceobserverSource,
  });

  await iframe.evaluate(() => {
    const font = new window.FontFaceObserver('Open Sans');

    return font.load();
  });

  const node = await iframe.$('#root > div');

  await node.screenshot({
    path: path.join(path.dirname(filePath), 'meta-image.png'),
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

  const serverProcess = exec('yarn run cosmos');

  await waitForLocalhost({ port: 5000 });

  const browser = await puppeteer.launch({
    defaultViewport: {
      deviceScaleFactor: 2,
      width: WIDTH * 2,
      height: 313,
    },
  });

  for (let file of files) {
    const title = await findPostTitle(file);

    await generateMetaImage(browser, file, title);
  }

  await browser.close();

  serverProcess.kill('SIGTERM');
}

main();
