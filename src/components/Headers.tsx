import { useMemo } from 'react';
import type { ReactElement, HTMLAttributes } from 'react';
import slugify from 'slugify';
import cx from 'classnames';
import getTextContent from './getTextContent';

slugify.extend({
  '<': '',
  '>': '',
});

interface HeaderOptions {
  hideBorderBottom?: boolean;
  hideAnchor?: boolean;
}

const createHeader = (
  RenderComponent: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  options: HeaderOptions = {},
) => {
  const headerClassNames = {
    h1: 'text-4xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-lg font-bold',
    h4: 'text-base font-bold',
    h5: 'text-sm font-bold',
    h6: 'text-xs font-bold',
  } as const;

  const HeaderComponent = ({
    children,
  }: HTMLAttributes<HTMLHeadingElement>) => {
    const { hideBorderBottom, hideAnchor } = options;

    const fragment = useMemo(
      () =>
        slugify(
          getTextContent(
            children as (string | ReactElement<unknown, string>)[],
          ),
          {
            lower: true,
          },
        ),
      [children],
    );

    return (
      <RenderComponent
        id={fragment}
        className={cx(
          'group relative leading-loose text-subText scroll-mt-12 mb-4',
          !hideBorderBottom && 'border-b border-horizontal',
          headerClassNames[RenderComponent],
        )}
      >
        {hideAnchor || (
          <a
            href={`#${fragment}`}
            className="absolute left-0 top-0 bottom-0 text-contentText -translate-x-full opacity-0 active:opacity-100 focus:opacity-100 md:group-hover:opacity-100 pr-2"
          >
            #
          </a>
        )}

        {children}
      </RenderComponent>
    );
  };

  return HeaderComponent;
};

export const H1 = createHeader('h1', { hideAnchor: true });
export const H2 = createHeader('h2');
export const H3 = createHeader('h3');
export const H4 = createHeader('h4', { hideBorderBottom: true });
export const H5 = createHeader('h5', { hideBorderBottom: true });
export const H6 = createHeader('h6', { hideBorderBottom: true });
