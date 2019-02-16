import { useCallback } from 'react';

const useCopyToClipboard = (text: string) => {
  return useCallback(() => {
    try {
      let succeed = false;
      const { documentElement } = document;
      const placeholder = document.createElement('textarea');
      placeholder.style.fontSize = '1rem';
      placeholder.style.border = '0';
      placeholder.style.padding = '0';
      placeholder.style.margin = '0';
      placeholder.style.position = 'absolute';
      placeholder.style.right = '-9999px';
      placeholder.setAttribute('readonly', '');
      placeholder.value = text;

      documentElement.appendChild(placeholder);
      window.getSelection().removeAllRanges();
      placeholder.select();
      placeholder.setSelectionRange(0, text.length);
      succeed = document.execCommand('copy');
      documentElement.removeChild(placeholder);

      return succeed;
    } catch (err) {
      return false;
    }
  }, [text]);
};

export default useCopyToClipboard;
