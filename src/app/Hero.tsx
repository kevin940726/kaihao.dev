import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import SocialLinks from './SocialLinks';
import profileImg from './profile.jpeg';

const HeroSection = styled.section(
  (props) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 350px;
    padding: 30px 20px;

    p {
      color: ${props.theme.colors.subText};
      margin-top: 0;
    }
  `
);

const Hero = () => {
  return (
    <HeroSection>
      <span
        css={css`
          display: inline-flex;
          border-radius: 50%;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          margin-bottom: 25px;
          overflow: hidden;
        `}
      >
        <Image
          src={profileImg}
          alt="Kai Hao"
          width={95}
          height={95}
          placeholder="blur"
          priority
        />
      </span>

      <p
        css={css`
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 10px;
        `}
      >
        Hello there.
      </p>
      <p
        css={css`
          font-size: 24px;
          margin-bottom: 25px;
        `}
      >
        {"I'm Kai Hao, a front-end developer in Taiwan."}
      </p>

      <SocialLinks />
    </HeroSection>
  );
};

export default Hero;
