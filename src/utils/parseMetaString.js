const HIGHLIGHT_LINE_REGEX = /^\{(\d+(?:-\d+)?,?)+\}$/g;

function parseMetaString(metaString = '') {
  const tokens = metaString.split(' ').map(token => token.trim());
  const metaProps = {};

  for (let token of tokens) {
    if (HIGHLIGHT_LINE_REGEX.test(token)) {
      // highlightLines
      const tokenLines = token.slice(1, -1).split(',');
      const lines = new Set();

      for (let tokenLine of tokenLines) {
        if (tokenLine.indexOf('-') !== -1) {
          // range of lines
          const [startLine, endLine] = tokenLine.split('-');

          for (let line = startLine; line <= endLine; line += 1) {
            lines.add(line);
          }
        } else {
          // single line
          lines.add(parseInt(tokenLine, 10));
        }
      }

      metaProps.highlightLines = lines;
    }
  }

  return metaProps;
}

export default parseMetaString;
