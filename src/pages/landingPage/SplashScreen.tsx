import React from 'react';
import styled, {keyframes} from 'styled-components/macro';
import raw from 'raw.macro';
import LogoIMG from './logo.png';
import {secondaryFont} from '../../styling/styleUtils';
import { useLocation, useHistory } from 'react-router';
import { scrollToAnchor } from '../../hooks/useScrollBehavior';

const slidein = keyframes`
  from {background-position: top;}
  to {background-position: -200px 0px}
`;

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top:0;
    left:0;
    z-index: -3;
    background-image: linear-gradient(to left, #2f383f, #96c4c5);
    width: 100%;
    height: 100%;
    opacity: 0.9;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
    opacity: 0.1;
    background-image: url(${require('./pattern-background.png')});
    z-index: -2;
    background-size:cover;
    animation: ${slidein} 20s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
`;

const mobileWidth = 750; // in px

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr auto;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  padding: 1.5rem 2rem 0.5rem;
  margin: auto;
  box-sizing: border-box;
`;

const LogoCell = styled.a`
  grid-column: 1;
  grid-row: 1;
  display: block;
`;

const TitleCell = styled.div`
  grid-column: 1;
  grid-row: 2;
  position: relative;

  @media(max-width: ${mobileWidth}px) {
    grid-column: 1 / -1;
  }
`;
const SubtitleCell = styled.div`
  grid-column: 2;
  grid-row: 2;
  position: relative;
  transform: translate(0, -25%);

  @media(max-width: ${mobileWidth}px) {
    grid-column: 1 / -1;
    grid-row: 3;
    transform: translate(-1rem, 10%);
  }
`;

const GrowthLabButtonCell = styled.div`
  grid-column: 1 / -1;
  grid-row: 4;
`;
const SocialCell = styled.div`
  grid-column: 1 / -1;
  grid-row: 5;
  display: flex;
  align-items: flex-end;
`;
const ScrollCell = styled.div`
  grid-column: 1 / -1;
  grid-row: 6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleRoot = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;

  @media(max-width: ${mobileWidth}px) {
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: -40%;
      border-bottom: solid 2px #fff;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 0;
  color: rgba(0, 0, 0, 0);
  svg {
    position: relative;
    width: 91.67%;
    letter-spacing: 2px;
    animation: stroke-offset 1s linear;
    z-index: 4;
    path {
      fill: #fff;
    }
  }
`;
const strokeOffsetLogo = keyframes`
  0% {
    stroke-dasharray: 0 100%;
    fill: none;
  }

  100% {
    stroke-dasharray: 100% 0;
    fill:white;
  }
`;

const TitleIcon = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  fill: white;
  stroke: white;
  animation: ${strokeOffsetLogo} 3s linear;
  z-index: 4;
  transform: translate(0, -10%);
`;

const slidingblock = keyframes`
  0% {
    margin-left: -380px;
  }

  50%{
    margin-left: -380px;
  }

  100% {
    left: 0px;
  }
`;

const ColorBlock = styled.div`
  position: absolute;
  height: 31.6%;
  width: 63.33%;
  bottom: -4.4%;
  left: 0;
  z-index: 3;
  overflow: hidden;

  &:after {
    content: '';
    display: block;
    background-color: #fc9b81;
    height: 100%;
    width: 100%;
    z-index: 3;
    animation: ${slidingblock} 3s linear;
  }
`;

const Subtitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 0;
  color: rgba(0, 0, 0, 0);

  width: 100%;
  max-width: 480px;
  opacity: 1;
  z-index: 4;

  svg {
    .cls-subtitle-1 {
      fill: none;
      stroke: #fff;
      stroke-miterlimit: 10;
      stroke-width: 3px;
    }

    .cls-subtitle-2 {
      fill: #fff;
    }
  }

  @media(max-width: ${mobileWidth}px) {
    grid-column: 1 / -1;
    grid-row: 3;
    transform: translate(-0.1rem, 10%);

    svg {
      .cls-subtitle-1 {
        fill: none;
        stroke: none;
        stroke-width: 0px;
      }
    }
  }
`;

const Logo = styled.img`
  width: 100%;
  max-width: 230px;
  margin: 2rem 0;
`;

const GrowthLabButton = styled.a`
  font-family: ${secondaryFont};
  padding: 8px 16px;
  color: #749599;
  background-color: white;
  font-size: 0.875;
  border-radius: 16px;
  text-decoration: none;
  display: inline-block;
  position: relative;
  z-index: 3;

  @media(max-width: ${mobileWidth}px) {
    margin-top: 3rem;
  }
`;

const SocialLink = styled.a`
  margin-right: 1.25rem;
  font-size: 0;
  color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  width: 1.75rem;
  height: 1.75rem;
`;

const Icon = styled.div`
  width: 100%;

  svg {
    path {
      fill: #fff;
    }
  }
`;

const down = keyframes`
  0%{
    opacity:0;
  }
  100%{
    opacity:1;
    transform: translateY(2.3em);
  }
`;
const down2 = keyframes`
  40%{
    opacity:0;
  }
  100%{
    opacity:0.5;
    transform: translateY(2.3em);
  }
`;
const down3 = keyframes`
  60%{
    opacity:0;
  }
  100%{
    opacity:0.2;
    transform: translateY(2.3em);
  }
`;
const ScrollArrow = styled.button`
  display: block;
  font-size: 0.875rem;
  color: white;
  font-family: ${secondaryFont};
  cursor: pointer;
  background-color: transparent;
  position: relative;
  outline: none;
  margin: 1rem 0;
`;

const ScrollBase = styled.span`
  display: block;
  opacity:0;
  margin: 0 auto;
  width: 0px;
  height: 0px;
  border-left: 0.5em solid transparent;
  border-right: 0.5em solid transparent;
  border-top: 0.7em solid white;
`;

const Scroll2 = styled(ScrollBase)`
  animation: ${down2} 1.5s infinite;
`;
const Scroll3 = styled(ScrollBase)`
  animation: ${down} 1.5s infinite;
`;
const Scroll = styled(ScrollBase)`
  animation: ${down3} 1.5s infinite;
`;
const ScrollText = styled.div`
  text-transform: uppercase;
  transform: translate(75%, 25%);
`;

export default () => {
  const {search, pathname} = useLocation();
  const {push} = useHistory();

  const onDigitalHubClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    push(pathname + search + '#hub');
    scrollToAnchor({anchor: '#hub'});
  };

  return (
    <Root>
      <Grid>
        <LogoCell
          href={'https://growthlab.cid.harvard.edu/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <Logo src={LogoIMG} />
        </LogoCell>
        <TitleCell>
          <TitleRoot>
            <ColorBlock />
            <Title>
              <div
                dangerouslySetInnerHTML={{__html: raw('./title.svg')}}
              />
              Harvard Growth Lab Digital Hub
            </Title>
            <TitleIcon
              dangerouslySetInnerHTML={{__html: raw('./titleIcon.svg')}}
            />
          </TitleRoot>
        </TitleCell>
        <SubtitleCell>
          <Subtitle>
            <div
              dangerouslySetInnerHTML={{__html: raw('./subtitle.svg')}}
            />
            Translating Growth Lab research into powerful online tools and interactive storytelling
          </Subtitle>
        </SubtitleCell>
        <GrowthLabButtonCell>
          <GrowthLabButton
            href={'https://growthlab.cid.harvard.edu/'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            Visit Growth Lab Page
          </GrowthLabButton>
        </GrowthLabButtonCell>
        <SocialCell>
          <SocialLink
            href={'https://twitter.com/HarvardGrwthLab'}
            target='_blank'
            rel='noopener noreferrer'
          >
            Twitter
            <Icon dangerouslySetInnerHTML={{__html: raw('../../components/text/assets/twitter.svg')}} />
          </SocialLink>
          <SocialLink
            href={'https://www.facebook.com/HarvardCID/'}
            target='_blank'
            rel='noopener noreferrer'
          >
            Facebook
            <Icon dangerouslySetInnerHTML={{__html: raw('../../components/text/assets/facebook.svg')}} />
          </SocialLink>
          <SocialLink
            href={'https://www.linkedin.com/company/center-for-international-development-harvard-university/'}
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
            <Icon dangerouslySetInnerHTML={{__html: raw('../../components/text/assets/linkedin.svg')}} />
          </SocialLink>
          <SocialLink
            href={'https://www.youtube.com/user/HarvardCID'}
            target='_blank'
            rel='noopener noreferrer'
          >
            YouTube
            <Icon dangerouslySetInnerHTML={{__html: raw('../../components/text/assets/youtube.svg')}} />
          </SocialLink>
          <SocialLink
            href={'https://podcasts.apple.com/us/podcast/growth-lab-podcast-series/id1486218164'}
            target='_blank'
            rel='noopener noreferrer'
          >
            Apple Podcast
            <Icon dangerouslySetInnerHTML={{__html: raw('../../components/text/assets/applepodcast.svg')}} />
          </SocialLink>
        </SocialCell>
        <ScrollCell>
          <ScrollArrow onClick={onDigitalHubClick}>
            <Scroll />
            <Scroll2 />
            <Scroll3 />
            <ScrollText>Digital Hub</ScrollText>
          </ScrollArrow>
        </ScrollCell>
      </Grid>
    </Root>
  );
};