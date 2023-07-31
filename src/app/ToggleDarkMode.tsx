import type { ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import useThemeMode, { toggleThemeMode } from './useThemeMode';

const Sun = (props: ComponentPropsWithRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-sun"
    {...props}
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const Moon = (props: ComponentPropsWithRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-moon"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const Icon = ({
  as: As,
  alt,
  className,
  ...props
}: {
  as: typeof Sun | typeof Moon;
  alt: string;
  className?: string;
}) => (
  <As
    aria-label={alt}
    className={cx('w-[18px] h-[18px] text-contentBackground', className)}
    {...props}
  />
);

const ToggleDarkMode = () => {
  const themeMode = useThemeMode();

  return (
    <button
      type="button"
      role="switch"
      aria-label="Toggle dark mode"
      aria-checked={themeMode === 'dark' ? 'true' : 'false'}
      onClick={toggleThemeMode}
      className={cx(
        'flex relative items-center justify-between h-[30px] w-[60px] border-none rounded-[40px] bg-reverseBackground select-none',
        'after:inline-block after:absolute after:top-0 after:left-0 after:h-[30px] after:w-[30px] after:rounded-full after:border after:border-contentBlack after:bg-backgroundWhite',
        'aria-checked:after:translate-x-full focus-visible:focus:after:outline-[5px]'
      )}
    >
      <Icon as={Sun} alt="light-theme" className="ml-2" />
      <Icon as={Moon} alt="dark-theme" className="mr-2" />
    </button>
  );
};

export default ToggleDarkMode;
