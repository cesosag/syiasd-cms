import styled from 'styled-components';

export const Panel = styled.section`
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 #e3e9f3;
  line-height: 18px;
  margin-bottom: 34px;
  padding: 19px 30px 30px 30px;
  position: relative;
  width: 100%;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1em;
`;

export const ControlWrapper = styled.div`
  padding: 0.5em 0;
`;
