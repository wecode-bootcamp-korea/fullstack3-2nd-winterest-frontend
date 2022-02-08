import React from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styled from 'styled-components';

function HeartButton({ isHeart, setIsHeart, winId }) {
  const handleClickHeart = () => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/win-like`, {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: sessionStorage.getItem('token'),
      }),
      mode: 'cors',
      body: JSON.stringify({
        winId: winId,
      }),
    });

    isHeart ? setIsHeart(false) : setIsHeart(true);
  };

  return (
    <HeartingButton>
      <span>
        {isHeart ? (
          <HeartFilled className="button red" onClick={handleClickHeart} />
        ) : (
          <HeartOutlined className="button white" onClick={handleClickHeart} />
        )}
      </span>
    </HeartingButton>
  );
}

const HeartingButton = styled.div`
  transition: transform 300ms ease;
  width: 10px;
  margin: 0 0 3px 25px;
  cursor: pointer;
  margin-top: 8px;

  .button {
    font-size: 20px;

    &:hover {
      transform: scale(1.1);
    }
  }

  .red {
    color: red;
  }
`;

export default HeartButton;
