import type { ComponentPropsWithoutRef } from 'react';

const Actions = (props: ComponentPropsWithoutRef<'div'>) => (
  <div
    className="flex justify-end rounded-tl rounded-br overflow-hidden text-subText text-xs absolute bottom-0 right-0 h-[30px]"
    {...props}
  />
);

const ActionItem = (props: ComponentPropsWithoutRef<'button'>) => (
  <button
    className="inline-flex items-center justify-center cursor-pointer border-none px-1 py-0.5 bg-transparent text-subText text-xs opacity-80 transition-opacity hover:opacity-100"
    {...props}
  />
);

type ActionsType = typeof Actions;
type ActionsWithItemType = ActionsType & { Item: typeof ActionItem };

(Actions as ActionsWithItemType).Item = ActionItem;

export default Actions as ActionsWithItemType;
