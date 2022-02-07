import React from 'react';
import styled from 'styled-components';

function WinMain({ src }) {
  return (
    <Figure>
      <ImgContainer>
        <img className="img" name="win" src={src} alt="test" />
      </ImgContainer>
    </Figure>
  );
}

const Figure = styled.div`
  display: inline-block;
  margin: 0;
  margin-bottom: 15px;
`;

const ImgContainer = styled.div`
  position: relative;
  img {
    position: relative;
    width: 100%;
    border: 1px solid none;
    border-radius: 15px;
  }
`;

export default WinMain;
