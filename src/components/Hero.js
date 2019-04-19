import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import profileImage from '../images/profile.jpeg';
import SocialLinks from './SocialLinks';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 350px;
  background: linear-gradient(
    105.18deg,
    rgba(242, 153, 74, 0.97) 0%,
    rgba(242, 153, 74, 0.76) 78.72%
  );
  padding: 30px 20px;

  p {
    color: #ffffff;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    margin-top: 0;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <img
        src={profileImage}
        alt="Kai Hao"
        css={css`
          height: 95px;
          width: 95px;
          border-radius: 50%;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          margin-bottom: 25px;
        `}
      />

      <p
        css={css`
          font-size: 36px;
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
        I'm Kai Hao, a front-end developer in Taiwan.
      </p>

      <SocialLinks />
    </HeroSection>
  );
};

export default Hero;
