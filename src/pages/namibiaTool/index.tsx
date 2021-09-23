import React from 'react';
import Layout from './Layout';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../../components/general/Loading';
import FullPageError from '../../components/general/FullPageError';
import {
  HSProduct,
  NAICSIndustry,
} from './graphql/graphQLTypes';
import {Datum} from 'react-panel-search';
import {
  generateStringId,
  ProductClass,
} from './Utils';

const GET_ALL_INDUSTRIES = gql`
  query GetAllIndustries {
    allHs: namibiaHsList(inTool: false) {
      hsId
      name
      code
      inTool
      id
    }
    allNaics: namibiaNaicsList(inTool: false) {
      naicsId
      name
      code
      inTool
      id
    }
  }
`;

interface SuccessResponse {
  allHs: {
    hsId: HSProduct['hsId'];
    name: HSProduct['name'];
    code: HSProduct['code'];
    inTool: HSProduct['inTool'];
    id: HSProduct['id'];
  }[];
  allNaics: {
    naicsId: NAICSIndustry['naicsId'];
    name: NAICSIndustry['name'];
    code: NAICSIndustry['code'];
    inTool: NAICSIndustry['inTool'];
    id: NAICSIndustry['id'];
  }[];
}

const NamibiaTool = () => {
  const {loading, error, data} = useQuery<SuccessResponse, never>(GET_ALL_INDUSTRIES);
  if (loading) {
    return <Loading />;
  } else if (error) {
    return (
      <FullPageError
        message={error.message}
      />
    );
  } else if (data !== undefined) {
    const classificationHsParentId = 'CLASSIFICATION-HS';
    const classificationNaicsParentId = 'CLASSIFICATION-NAICS';
    const allData: Datum[] = [];
    const searchData: Datum[] = [
      {
        id: classificationHsParentId,
        title: 'HS-4 Products',
        level: 1,
        parent_id: null,
        always_show: true,
      }, {
        id: classificationNaicsParentId,
        title: 'NAICS-6 Industries',
        level: 1,
        parent_id: null,
        always_show: true,
      },
    ];
    data.allHs.forEach(d => {
      if (d.inTool) {
        searchData.push({
          id: generateStringId(ProductClass.HS, d.hsId),
          title: `${d.name} (HS ${d.code})`,
          level: 2,
          parent_id: classificationHsParentId,
        });
      }
      allData.push({
        id: generateStringId(ProductClass.HS, d.hsId),
        title: `${d.name} (HS ${d.code})`,
        level: 2,
        parent_id: classificationHsParentId,
      });
    });
    data.allNaics.forEach(d => {
      if (d.inTool) {
        searchData.push({
          id: generateStringId(ProductClass.NAICS, d.naicsId),
          title: `${d.name} (NAICS ${d.code})`,
          level: 2,
          parent_id: classificationNaicsParentId,
        });
      }
      allData.push({
        id: generateStringId(ProductClass.NAICS, d.naicsId),
        title: `${d.name} (NAICS ${d.code})`,
        level: 2,
        parent_id: classificationNaicsParentId,
      });
    });
    return (
      <Layout
        searchData={searchData}
        allData={allData}
      />
    );
  } else {
    return null;
  }
};

export default NamibiaTool;
