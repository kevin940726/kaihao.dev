import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import siteMetadata from '@/siteMetadata';
import logo from './logo.png';

const ToggleDarkMode = dynamic(() => import('./ToggleDarkMode'), {
  ssr: false,
});

const Nav = () => {
  return (
    <>
      <nav className="flex items-center h-[50px] w-full fixed top-0 left-0 shadow-sm border-b border-border bg-contentBackground p-2.5 md:px-5 z-[100]">
        <div className="flex items-center justify-between w-[760px] max-w-full mx-auto">
          <h3 className="flex items-center text-xl leading-[23px] text-subText">
            <Link
              className="flex items-center text-inherit no-underline transition-opacity hover:no-underline hover:opacity-80"
              href="/"
            >
              <span className="inline-flex mr-2.5">
                <Image src={logo} alt="logo" width={40} height={40} />
              </span>
              {siteMetadata.title}
            </Link>
          </h3>

          <ToggleDarkMode />
        </div>
      </nav>

      <div className="h-[50px]" />
    </>
  );
};

export default Nav;
