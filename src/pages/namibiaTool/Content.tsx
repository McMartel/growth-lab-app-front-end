import React from 'react';
import {ProductClass, colorScheme} from './Utils';
import StickySubHeading from '../../components/text/StickySubHeading';
import {
  SectionHeader,
} from '../../styling/styleUtils';
import styled from 'styled-components/macro';
import {Factor} from './graphql/graphQLTypes';
import Overview from './components/Overview';
import {
  ScatterPlotDatum,
} from 'react-fast-charts';

const PlaceholderSpace = styled.div`
  height: 75vh;
`;

interface Props {
  id: string;
  productClass: ProductClass;
  name: string;
  code: string;
  factors: Factor;
  setStickyHeaderHeight: (h: number) => void;
  scatterPlotData: ScatterPlotDatum[];
  scatterPlotJsonData: object[];
}

const Content = (props: Props) => {
  const {
    name, code, productClass, setStickyHeaderHeight,
    scatterPlotData, scatterPlotJsonData,
  } = props;

  return (
    <>
      <StickySubHeading
        title={`${name} (${productClass} ${code})`}
        highlightColor={colorScheme.primary}
        onHeightChange={(h) => setStickyHeaderHeight(h)}
      />
      <Overview
        industryName={name}
        data={scatterPlotData}
        jsonData={scatterPlotJsonData}
      />
      <div id={'industry-now'}>
        <SectionHeader>Industry Now</SectionHeader>
      </div>
      <PlaceholderSpace />
      <div id={'nearby-industries'}>
        <SectionHeader>Nearby Industries</SectionHeader>
      </div>
      <PlaceholderSpace />
    </>
  );
};

export default Content;
