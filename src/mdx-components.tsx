import { H1, H2, H3, H4, H5, H6 } from '@/components/Headers';
import PostLink from '@/components/PostLink';
import Paragraph from '@/components/Paragraph';
import InlineCode from '@/components/InlineCode';
import BlockQuote from '@/components/BlockQuote';
import { Ul, Ol, Li } from '@/components/Lists';
import Highlight from '@/components/Highlight';
import PostImage from '@/components/PostImage';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: Paragraph,
    code: InlineCode,
    a: PostLink,
    blockquote: BlockQuote,
    pre: Highlight,
    ul: Ul,
    ol: Ol,
    li: Li,
    img: PostImage,
  };
}
