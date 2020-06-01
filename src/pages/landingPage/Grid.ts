import {
  FullWidthContentContainer,
} from '../../styling/Grid';
import styled from 'styled-components/macro';

export const Grid = styled(FullWidthContentContainer)`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-column-gap: 2.5rem;
`;

export const NavColumn = styled.div`
  grid-column: 1;
`;

export const ContentColumn = styled.div`
  grid-column: 2;
`;