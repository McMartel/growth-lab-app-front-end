import React from 'react';
import {
  TwoColumnSection,
  SectionHeader,
  SubSectionHeader,
  SmallParagraph,
  ParagraphHeader,
} from '../../../styling/styleUtils';
import DataViz, {
  VizType,
  HowToReadDots,
  ScatterPlotDatum,
} from 'react-fast-charts';
import TextBlock from '../../../components/text/TextBlock';
import {
  colorScheme,
  ProductClass,
  useProductClass,
} from '../Utils';
import {rgba} from 'polished';
import {extent} from 'd3-array';
import {Factor} from '../graphql/graphQLTypes';
import FeasibilityRadarChart from './FeasibilityRadarChart';
import AttractivenessRadarChart from './AttractivenessRadarChart';
import upperFirst from 'lodash/upperFirst';
interface Props {
  industryName: string;
  code: string;
  data: ScatterPlotDatum[];
  jsonData: object[];
  factors: Factor;
  averageFeasibility: number;
  averageAttractiveness: number;
}

const Overview = (props: Props) => {
  const {
    industryName, data, jsonData, code, factors,
    averageFeasibility, averageAttractiveness,
  } = props;

  const allFeasibility: number[] = [];
  const allAttractiveness: number[] = [];
  data.forEach(d => {
    allFeasibility.push(d.x);
    allAttractiveness.push(d.y);
  });

  const [minFeasibility, maxFeasibility] = extent(allFeasibility) as [number, number];
  const [minAttractiveness, maxAttractiveness] = extent(allAttractiveness) as [number, number];
  const productClass = useProductClass();

  const introText = productClass === ProductClass.HS
    ? (
      <p>
        This section summarizes how strategic a product is for investment promotion based on its feasibility in Namibia (i.e. how likely the product is to thrive) and its attractiveness for Namibia (i.e. how much Namibia benefits from the product’s presence). The Growth Lab’s economic complexity analysis resulted in a list of 97 products for which Namibia has a high potential to successfully diversify into. These products are those that are most viable and attractive in the total basket of goods produced in the world and are likely to help Namibia continue diversifying into new and more complex products. When selecting another product from the full list, it is plotted only with the 97 strategic products identified through the complexity analysis.
      </p>
    ) : (
      <p>
        This section summarizes how strategic an industry is for investment promotion based on its feasibility in Namibia (i.e. how likely the industry is to thrive) and its attractiveness for Namibia (i.e. how much Namibia benefits from the industry’s presence). The Growth Lab’s economic complexity analysis resulted in a list of 97 products for which Namibia has a high potential to successfully diversify into. These industries are those that are most viable and attractive in the total basket of goods produced in the world and are likely to help Namibia continue diversifying into new and more complex industries. When selecting another industry from the full list, it is plotted only with the 97 strategic products identified through the complexity analysis.
      </p>
    );

  const feasibilityText = factors.feasibility < averageFeasibility
    ? 'lower than average feasibility'
    : 'higher than average feasibility';

  const attractivenessText = factors.attractiveness < averageAttractiveness
    ? 'lower than average attractiveness'
    : 'higher than average attractiveness';

  const rcaText1 = factors.rca < 1
    ? 'has'
    : 'doesn’t have';

  const rcaText2 = factors.rca < 1
    ? 'are'
    : 'are not';

  const scatterText = productClass === ProductClass.HS
    ? (
      <>
        <p>
          {industryName} is a product with <strong>{feasibilityText}</strong> in Namibia and <strong>{attractivenessText}</strong> for Namibia. International trade data shows that Namibia {rcaText1} a revealed comparative advantage in this product, meaning that there {rcaText2} economic entities intensively involved in this product in Namibia in comparison to the rest of the world.
        </p>

        <p>
          The following sections on this page explains the product’s {feasibilityText} feasibility and {attractivenessText} attractiveness in more detail.
        </p>
      </>
    ) : (
      <>
        <p>
          {industryName} is an industry with <strong>{feasibilityText}</strong> in Namibia and <strong>{attractivenessText}</strong> for Namibia. International trade data shows that Namibia {rcaText1} a revealed comparative advantage for the products related to this industry, meaning that there {rcaText2} economic entities intensively involved in this industry in Namibia in comparison to the rest of the world.
        </p>

        <p>
          The following sections on this page explains the industry’s {feasibilityText} feasibility and {attractivenessText} attractiveness in more detail.
        </p>
      </>
    );

    const productOrIndustry = productClass === ProductClass.HS ? 'product' : 'industry';
    const productOrIndustryPlural = productClass === ProductClass.HS ? 'products' : 'industries';
    const indefiniteArticle = productClass === ProductClass.HS ? 'a' : 'an';

  return (
    <>
      <div id={'overview'}>
        <SectionHeader>{'Overview'}</SectionHeader>
        {introText}
      </div>
      <TwoColumnSection>
        <DataViz
          id={'namibia-scatterplot'}
          vizType={VizType.ScatterPlot}
          data={data}
          axisLabels={{x: 'Viability', y: 'Attractiveness'}}
          axisMinMax={{
            minX: minFeasibility,
            maxX: maxFeasibility,
            minY: minAttractiveness,
            maxY: maxAttractiveness,
          }}
          enablePNGDownload={true}
          enableSVGDownload={true}
          chartTitle={'Overview - ' + industryName.substring(0,100)}
          jsonToDownload={jsonData}
        />
        <TextBlock>
          <div>
            {scatterText}
          </div>
          <HowToReadDots
            items={[
              {color: rgba(colorScheme.data, 0.5), label: 'Intensively present in Namibia'},
            ]}
            highlighted={{color: rgba(colorScheme.dataSecondary, 0.5), label: industryName}}
          />
        </TextBlock>
      </TwoColumnSection>
      <TwoColumnSection>
        <FeasibilityRadarChart
          industryName={industryName}
          factors={factors}
          code={code}
        />
        <TextBlock>
          <SubSectionHeader color={colorScheme.quaternary}>Viability Factors</SubSectionHeader>
          <ParagraphHeader color={colorScheme.quaternary}>Existing Presence in Namibia</ParagraphHeader>
          <SmallParagraph>
            Existing presence measures the extent to which {indefiniteArticle} {productOrIndustry} is produced and exported in Namibia. {upperFirst(indefiniteArticle)} {productOrIndustry} is more likely to thrive in Namibia if it is already produced to some extent in the country. This measure is a combination of two metrics: the revealed comparative advantage (RCA) of {indefiniteArticle} {productOrIndustry} that measures the relative intensity of the {productOrIndustry}’s exports in Namibia compared to the rest of the world, and the average gross export value of this {productOrIndustry} from Namibia in recent years. {upperFirst(productOrIndustryPlural)} with higher values of existing presence have higher feasibility in Namibia. A higher score on the 0-10 scale reflects that the {productOrIndustry} represents a larger share of exports from Namibia than it does from the world.
          </SmallParagraph>
          <ParagraphHeader color={colorScheme.quaternary}>Intensive Use of Scarce Inputs</ParagraphHeader>
          <SmallParagraph>
            Namibia faces unique challenges given its aridity and vast desert land. Because of this, {productOrIndustryPlural} that are intensive in scarce resources - most notably, water - are less likely to thrive in the country. The intensive use of water as a scarce input measures how intensively {indefiniteArticle} {productOrIndustry} relies on water as an input for its production. We convert the metric to be interpreted as higher values representing {productOrIndustryPlural} that are relatively less intensive in the use of water. A score closer to 10 on the 0-10 scale is {indefiniteArticle} {productOrIndustry} that does not depend on water intensively as an input for its production.
          </SmallParagraph>
          <ParagraphHeader color={colorScheme.quaternary}>Implied Availability of Inputs</ParagraphHeader>
          <SmallParagraph>
            {upperFirst(productOrIndustryPlural)} will be more likely to thrive in Namibia if they share inputs with {productOrIndustryPlural} that are already produced in the country. To measure the extent to which {indefiniteArticle} {productOrIndustry} relies on inputs and occupations that already exist in Namibia, we measure the share of inputs and occupations that are required to produce the {productOrIndustry} that may already exist in Namibia or are demanded by other {productOrIndustryPlural} that already exist in Namibia. {upperFirst(productOrIndustryPlural)} that score high on this factor are those that have higher shares of inputs and occupations that are already present in Namibia. A low score on this 0-10 scale reflects the relative absence of inputs and occupations needed to produce this industry.
          </SmallParagraph>
          <ParagraphHeader color={colorScheme.quaternary}>Intensive Use of Strategic Resources</ParagraphHeader>
          <SmallParagraph>
            Namibia has access to key strategic resources that can be used to help prospective {productOrIndustryPlural} thrive in the country, one of which is its access to the ocean and the recently expanded port. Therefore, {productOrIndustryPlural} that can be more easily exported by sea and water are more likely to thrive in the country. This measure calculates the port export propensity of the {productOrIndustry} as the RCA of sea-based imports of that {productOrIndustry}. This is the relative intensity of the world’s import of the {productOrIndustry} by sea compared to all sea-based imports in the world. The higher the {productOrIndustry} scores on this factor, the more likely it is to thrive in Namibia because it is more likely to be exported by a sea route to the world.
          </SmallParagraph>
          <ParagraphHeader color={colorScheme.quaternary}>Likelihood to Thrive in Remote Places</ParagraphHeader>
          <SmallParagraph>
            Given Namibia’s low population density, prospective {productOrIndustryPlural} should be able to thrive in areas with low levels of agglomeration. This measure combines two factors: the correlation between geographic proximity to urban areas and the RCA of the {productOrIndustry}, and the correlation between population size and the RCA of the {productOrIndustry}. We convert the score to represent a 0-10 scale where a higher score reflects {indefiniteArticle} {productOrIndustry}'s relative ability to thrive in remote places and therefore be more viable in Namibia.
          </SmallParagraph>
        </TextBlock>
      </TwoColumnSection>
      <TwoColumnSection>
        <AttractivenessRadarChart
          industryName={industryName}
          factors={factors}
          code={code}
        />
        <TextBlock>
          <SubSectionHeader color={colorScheme.quaternary}>Attractiveness Factors</SubSectionHeader>
          <ParagraphHeader color={colorScheme.quaternary}>Export Propensity</ParagraphHeader>
          <SmallParagraph>
            A given {productOrIndustry} is more attractive in Namibia if it can be exported from the country and thus tap international demand. This score calculates the propensity for {indefiniteArticle} {productOrIndustry} to be exported based on the share of global firms that report exporting this {productOrIndustry}. This factor is higher in value on a 0-10 scale for those {productOrIndustryPlural} that are more likely to be exported.
          </SmallParagraph>
          <ParagraphHeader color={colorScheme.quaternary}>Propensity to Attract FDI</ParagraphHeader>
          <SmallParagraph>
            FDI attraction is a priority for Namibia; therefore, potential {productOrIndustryPlural} are more desirable if there is evidence that they are likely to bring in FDI. Higher flows of FDI at the global and regional level are an important proxy for current and future demand of the {productOrIndustry}. {upperFirst(productOrIndustryPlural)} that attract high FDI flows are more attractive to Namibia because companies are more likely to grow over time and are more likely to introduce productive capabilities linked to other {productOrIndustryPlural}. {upperFirst(productOrIndustryPlural)} where the FDI inflows are higher receive a higher attractiveness score on 0-10 here.
          </SmallParagraph>
          <ParagraphHeader color={colorScheme.quaternary}>Likelihood of Employing Groups of Interest</ParagraphHeader>
          <SmallParagraph>
            Namibia faces high levels of unemployment and low levels of labor force participation, particularly among excluded groups including women, youth, and low-skill workers. {upperFirst(productOrIndustryPlural)} that are more likely to employ these excluded groups may be more attractive for Namibia. Using US data to proxy the share of employment of these groups of interest in each {productOrIndustry}, we calculate this score as a composite indicator of the share of employees in a given activity that are female, the share of youth, and the share of employees who have lower levels of education. Higher scores on 0-10 reflect {productOrIndustryPlural} that tend to employ higher shares of these groups.
          </SmallParagraph>
          <ParagraphHeader color={colorScheme.quaternary}>Resilience to Shocks</ParagraphHeader>
          <SmallParagraph>
            Since Namibia’s exports and economy are highly sensitive to fluctuations in commodity prices and the volatility that they introduce, this score favorably ranks {productOrIndustryPlural} that help the country diversify away from these metals and mining industries. {upperFirst(productOrIndustryPlural)} that are resilient to price volatility and whose exports do not vary strongly with price changes are rated higher on this 0-10 scale.
          </SmallParagraph>
          <ParagraphHeader color={colorScheme.quaternary}>Relative Demand in the Country and Region</ParagraphHeader>
          <SmallParagraph>
            {upperFirst(productOrIndustryPlural)} that are demanded by nearby markets and that are imported by Namibia are more likely to be attractive for diversification opportunities. Namibia has the potential to displace or add to what is currently imported for these {productOrIndustryPlural}. Therefore, this measure is a proxy for global, regional, and local demand for the {productOrIndustry}, and higher scores on 0-10 are allocated to {productOrIndustryPlural} that are more strongly demanded.
          </SmallParagraph>
        </TextBlock>
      </TwoColumnSection>
    </>
  );
};

export default Overview;
