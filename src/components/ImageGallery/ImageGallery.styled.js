import styled from '@emotion/styled';

export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw -50px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;
