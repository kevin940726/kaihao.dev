import Image from 'next/image';
import SocialLinks from './SocialLinks';
import profileImg from './profile.jpeg';

const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center px-5 pt-7 pb-5 text-subText">
      <span className="inline-flex rounded-full shadow shadow-backgroundBlack mb-6 overflow-hidden">
        <Image
          src={profileImg}
          alt="Kai Hao"
          width={95}
          height={95}
          placeholder="blur"
          priority
        />
      </span>

      <p className="text-4xl font-bold mb-2.5">Hello there.</p>
      <p className="text-2xl mb-6">
        {"I'm Kai Hao, a front-end developer in Taiwan."}
      </p>

      <SocialLinks />
    </section>
  );
};

export default Hero;
