import React from 'react';
import { HeartFilled } from '@ant-design/icons';
// import './likeButton.css';
import styled, { StyledComponent } from 'styled-components';

function LikeButton({ like }) {
  return (
    <LikeContainer>
      <span>
        <HeartFilled className="button red" />
      </span>
      <span className="liking">{like}</span>
    </LikeContainer>
  );
}

const LikeContainer = styled.div`
  margin-top: 2px;
  .button {
    cursor: pointer;
    transition: transform 300ms ease;
    font-size: 20px;
    text-align: center;
    float: right;
    padding-left: 80px;
  }

  .button:hover {
    transform: scale(1.1);
  }

  .red {
    font-size: 20px;
    color: red;
  }

  .liking {
    color: red;
    margin-left: 10px;
  }
`;

export default LikeButton;
