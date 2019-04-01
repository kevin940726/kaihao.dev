import { Children } from 'react';

function getTextContent(children) {
  return Children.map(children, child =>
    typeof child === 'string' ? child : getTextContent(child.props.children)
  ).join('');
}

export default getTextContent;
