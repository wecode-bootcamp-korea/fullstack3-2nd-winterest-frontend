import React from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function HeartButton({ productId, isHeart, setIsHeart }) {
  const navigate = useNavigate();

  const handleClickHeart = () => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST}/products/heart?productId=${productId}`,
      {
        headers: new Headers({
          Authorization: sessionStorage.getItem('token'),
        }),
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.message === 'VALIDATE_ERROR') navigate('/users/login');
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
