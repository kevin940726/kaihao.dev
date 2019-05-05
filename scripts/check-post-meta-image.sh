#!/bin/bash

node scripts/generate-meta-image.js `git show HEAD --name-only --format="" --diff-filter="AMR" | grep -E 'src/posts/.*\.mdx' | sort -u`
