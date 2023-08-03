import type { ComponentPropsWithoutRef } from 'react';

const InlineCode = (props: ComponentPropsWithoutRef<'code'>) => (
  <code
    className="bg-inlineCodeBackground px-[5px] py-[3px] text-[0.85em]"
    {...props}
  />
);

export default InlineCode;
