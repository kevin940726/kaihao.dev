import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { AnchorHTMLAttributes } from 'react';

interface PostLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const StyledLink = styled.a(
  (props) => css`
    border-bottom: 1px dashed ${props.theme.colors.mainText};
    color: ${props.theme.colors.subText};

    &:hover {
      border-bottom-style: solid;
      text-decoration: none;
    }
  `
);

const PostLink = ({ children, href, ...props }: PostLinkProps) =>
  href.startsWith('#') ? (
    <StyledLink href={href} {...props}>
      {children}
    </StyledLink>
  ) : (
    <StyledLink
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollower"
      {...props}
    >
      {children}
    </StyledLink>
  );

export default PostLink;
