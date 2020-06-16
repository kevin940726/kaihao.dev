const fs = require('fs').promises;
const { exec } = require('child_process');
const path = require('path');
const waitForLocalhost = require('wait-for-localhost');
const isPortReachable = require('is-port-reachable');
const captureWebsite = require('capture-website');

async function generateMetaImage(filePath, title) {
  const POST_META_URL = `http://localhost:8000/___post-meta?title=${title}`;

  const directionFilePath = path.join(path.dirname(filePath), 'meta-image.png');

  await captureWebsite.file(POST_META_URL, directionFilePath, {
    width: 1200,
    height: 626,
    launchOptions: {
      args: [
        '--disable-gpu',
        '--renderer',
        '--no-sandbox',
        '--no-service-autorun',
        '--no-experiments',
        '--no-default-browser-check',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-extensions',
      ],
    },
    overwrite: true,
  });
}

async function findPostTitle(postPath) {
  const postData = await fs.readFile(postPath);

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

  let serverProcess;
  if (!(await isPortReachable(8000))) {
    console.info("The development server hasn't started. Starting now...");

    serverProcess = exec('yarn start');

    await waitForLocalhost({ port: 8000 });
  }

  for (let file of files) {
    const title = await findPostTitle(file);

    await generateMetaImage(file, title);
  }

  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
}

main();
