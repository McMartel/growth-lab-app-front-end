import styled from 'styled-components/macro';

export const baseColor = '#333333'; // dark gray/black color for text
export const lightBaseColor = '#7c7c7c'; // light gray color for subtitles and contextual information
export const lightBorderColor = '#dcdcdc'; // really light gray color for subtle borders between elements

export const tertiaryColor = '#f3f3f3'; // really light gray color for use as a hover background color on cards

export const primaryFont = "'Source Sans Pro', sans-serif";
export const secondaryFont = "'OfficeCodeProWeb', monospace";

export const semiBoldFontBoldWeight = 600;
export const boldFontWeight = 700;

export const Light = styled.span`
  color: ${lightBaseColor};
`;

export const StandardH1 = styled.h1`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 2.2rem;
  font-weight: 400;
`;

interface HeaderWithLegendProps {
  legendColor: string;
}

export const HeaderWithLegend = styled.h4<HeaderWithLegendProps>`
  margin-top: 0;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1.1rem;

  &:before {
    content: '';
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background-color: ${({legendColor}) => legendColor};
    margin-right: 0.5rem;
  }
`;

export const labelMarginBottom = 0.3; // in rem

export const Label = styled.label`
  font-family: ${secondaryFont};
  margin-bottom: ${labelMarginBottom}rem;
  display: block;
`;

interface TwoColumnSectionProps {
  columnDefs?: string;
}

export const TwoColumnSectionBase = styled.div<TwoColumnSectionProps>`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: ${({columnDefs}) => columnDefs ? columnDefs : '1fr 1fr'};
`;

export const TwoColumnSection = styled(TwoColumnSectionBase)`
  margin-bottom: 2rem;

  @media (max-width: 850px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
  }
`;
export const InlineTwoColumnSection = styled(TwoColumnSectionBase)`
  @media (max-width: 850px) {
    padding: 1rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
  }
`;

const SectionHeaderBase = styled.h3`
  grid-row: 1;
  grid-column: 1 / -1;
  font-family: ${secondaryFont};
  color: ${baseColor};
  letter-spacing: 1px;
`;

export const SectionHeader = styled(SectionHeaderBase)`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 400;

  &:after {
    content: '';
    display: block;
    height: 0;
    border-top: 2px solid ${lightBorderColor};
    flex-grow: 1;
    margin-left: 1.25rem;
  }
`;

interface TitleColorProps {
  color?: string;
}

export const SectionHeaderSecondary = styled(SectionHeaderBase)<TitleColorProps>`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 600;
  color: ${({color}) => color ? color : baseColor};
`;

export const SubSectionHeader = styled.h4<TitleColorProps>`
  margin-top: 0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-family: ${secondaryFont};
  color: ${({color}) => color ? color : baseColor};
`;

export const ParagraphHeader = styled.h5<TitleColorProps>`
  font-family: ${secondaryFont};
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  margin: 0 0 0.5rem;
  color: ${({color}) => color ? color : baseColor};

  &:after {
    content: '';
    display: block;
    height: 0;
    border-top: 2px solid ${lightBorderColor};
    flex-grow: 1;
    margin-left: 1rem;
  }
`;

export const NarrowPaddedColumn = styled.div`
  padding: 0 0.5rem;
`;

export const LargeParagraph = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

export const SmallParagraph = styled.p`
  font-size: 0.8rem;
`;

export const SmallOrderedList = styled.ol`
  li {
    font-size: 0.8rem;
  }
`;

export const Card = styled.div`
  padding: 0.7rem;
  border: solid 1px ${lightBorderColor};
  box-shadow: 0px 0px 3px -1px #b5b5b5;
  margin-bottom: 2rem;
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: ${tertiaryColor};
  }
`;

export const Code = styled.pre`
  background-color: ${tertiaryColor};
  color: #444;
  padding: 1rem;
  box-sizing: border-box;
`;

export const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export const CoverPhoto = styled.div`
  grid-column: 1 / -1;
  height: 40vh;
  background-color: ${tertiaryColor};
  background-size: cover;
  background-position: center;
`;

export const StoryTitle = styled.h1`
  text-align: center;
  margin: 2rem 0 3rem;
  font-size: 2.5rem;
  margin-top: 2rem;
  letter-spacing: 1px;
  text-align: center;
`;

export const StoryHeading = styled.h2`
  grid-column: 1 / -1;
  font-weight: 600;
  font-size: 1.75rem;
  text-align: center;
`;


export const StorySectionContainer = styled.div`
  min-height: 50vh;
  position: relative;
  padding-bottom: 10vh;
`;

export const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const VizSource = styled.cite`
  text-align: center;
  display: block;
  margin: 0.75rem 0 1rem;
  font-size: 0.7rem;
`;

export const VizSourceCompact = styled.cite`
  text-align: center;
  display: block;
  margin: 0.5rem 0 0.25rem;
  font-size: 0.7rem;
`;
