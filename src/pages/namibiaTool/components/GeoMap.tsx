import React from 'react';
import {
  TwoColumnSection,
  SectionHeaderSecondary,
} from '../../../styling/styleUtils';
import TextBlock from '../../../components/text/TextBlock';
import {colorScheme} from '../Utils';
import DataViz, {
  VizType,
  ColorScaleLegend,
} from 'react-fast-charts';
import raw from 'raw.macro';
import {lighten} from 'polished';

const includedCountries = [
  'NAM',
  'LSO',
  'SWZ',
  'ZMB',
  'BWA',
  'AGO',
  'ZAF',
];

const worldMap = JSON.parse(raw('../../../assets/world-geojson.json'));
const filteredCountries = worldMap.features.filter((f: any) => includedCountries.includes(f.properties.iso_alpha3));
const mapSouthernAfrica = {...worldMap, features: filteredCountries};

export interface Datum {
  locationCode: string;
  countryDemandPcAvg: number;
}

interface Props {
  heatMapData: Datum[];
}

const GeoMap = ({heatMapData}: Props) => {

  const featuresWithValues = mapSouthernAfrica.features
    .map((f: any) => {
      const target = heatMapData.find(d => d.locationCode === f.properties.iso_alpha3);
      const percent = target ? target.countryDemandPcAvg : 0;
      const properties = {
        ...f.properties,
        percent,
        tooltipContent: `${f.properties.name}: ${percent.toFixed(2)}%`,
      };
      return {...f, properties};
    });
  const data = {...mapSouthernAfrica, features: featuresWithValues};

  return (
    <>
      <SectionHeaderSecondary color={colorScheme.quaternary}>Relative Demand</SectionHeaderSecondary>
      <TwoColumnSection>
        <DataViz
          id={'namibia-geo-map'}
          vizType={VizType.GeoMap}
          data={data}
          minColor={lighten(0.55, colorScheme.quaternary)}
          maxColor={colorScheme.quaternary}
        />
        <TextBlock>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <ColorScaleLegend
            minLabel={'← Lower'}
            maxLabel={'Higher →'}
            minColor={lighten(0.55, colorScheme.quaternary)}
            maxColor={colorScheme.quaternary}
            title={'Percentage of Relative Demand'}
          />
        </TextBlock>
      </TwoColumnSection>
    </>
  );
};

export default GeoMap;