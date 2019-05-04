#!/bin/bash

yarn run build
yarn run cosmos:export

# For macOS, will need to append '' after `-i` to replace the file in-place
sed -i 's/<head>/<head><base href="\/cosmos\/">/' cosmos/index.html
sed -i 's/_renderer.html/cosmos\/_renderer.html/' cosmos/index.html
sed -i 's/main.js/cosmos\/main.js/' cosmos/_renderer.html

# Move cosmos folder under public/ to be served by netlify
mv cosmos public/
