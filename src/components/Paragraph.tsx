import type { ComponentPropsWithoutRef } from 'react';

const Paragraph = (props: ComponentPropsWithoutRef<'p'>) => (
  <p className="mb-8" {...props} />
);

export default Paragraph;
