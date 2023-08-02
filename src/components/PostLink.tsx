import cx from 'classnames';
import type { AnchorHTMLAttributes } from 'react';

interface PostLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const PostLink = ({ children, href, className, ...props }: PostLinkProps) => {
  const mergedClassName = cx(
    'border-b border-dashed hover:border-solid hover:no-underline',
    className || 'border-mainText text-subText'
  );

  return href.startsWith('#') ? (
    <a className={mergedClassName} href={href} {...props}>
      {children}
    </a>
  ) : (
    <a
      className={mergedClassName}
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollower"
      {...props}
    >
      {children}
    </a>
  );
};

export default PostLink;
