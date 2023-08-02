import { Children } from 'react';
import type { ReactElement } from 'react';

function getTextContent(
  children: (string | ReactElement<any, string>)[]
): string {
  return Children.map(children, (child) =>
    typeof child === 'string' ? child : getTextContent(child.props.children)
  ).join('');
}

export default getTextContent;
