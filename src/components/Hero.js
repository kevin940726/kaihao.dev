import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SocialLinks from './SocialLinks';

const HeroSection = styled.section(
  props => css`
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
  const data = useStaticQuery(graphql`
    query profileImage {
      file(relativePath: { eq: "profile.jpeg" }) {
        childImageSharp {
          fixed(width: 95, height: 95) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);

  return (
    <HeroSection>
      <Img
        fixed={data.file.childImageSharp.fixed}
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
        I'm Kai Hao, a front-end developer in Taiwan.
      </p>

      <SocialLinks />
    </HeroSection>
  );
};

export default Hero;
