import type { ComponentPropsWithoutRef } from 'react';

export const Ul = (props: ComponentPropsWithoutRef<'ul'>) => (
  <ul className="pl-5 mb-8 list-disc" {...props} />
);

export const Ol = (props: ComponentPropsWithoutRef<'ol'>) => (
  <ol className="pl-5 mb-8 list-decimal" {...props} />
);

export const Li = (props: ComponentPropsWithoutRef<'li'>) => (
  <li className="mb-2" {...props} />
);
