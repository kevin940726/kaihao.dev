import { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import FontFaceObserver from 'fontfaceobserver';

function useFont(familyName, ...fallbackFamily) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const font = new FontFaceObserver(familyName);

    font.load().then(() => {
      setIsLoaded(true);
    });
  }, [familyName, setIsLoaded]);

  const fontFamily = [isLoaded && familyName, ...fallbackFamily]
    .filter(Boolean)
    .map(JSON.stringify)
    .join(',');

  return css`
    font-family: ${fontFamily};
  `;
}

export default useFont;
