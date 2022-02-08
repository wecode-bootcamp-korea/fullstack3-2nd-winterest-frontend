import React, { useState } from 'react';
import styled from 'styled-components';
import LikeButton from '../../Components/Likes/likeButton';
import BoardModal from '../BoardModal/BoardModal';
import { useNavigate } from 'react-router-dom';

function WinLists({ src, content, winId, userNumber, winLike }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/win/${winId}`);
  };

  const goToUser = () => {
    navigate(`/user/${userNumber}`);
  };

  return (
    <Figure>
      <ImgContainer>
        <img
          className="img"
          name="win"
          src={src}
          alt="test"
          onClick={goToDetail}
        />
        <ClosingButton name="button" type="button" onClick={openModal}>
          저장
        </ClosingButton>
        {isOpen === true ? (
          <Model>
            <button className="close" onClick={openModal}>
              &times;
            </button>
            <BoardModal winId={winId} setIsOpen={setIsOpen} />
          </Model>
        ) : null}
      </ImgContainer>
      <UserContainer>
        <UserLogo>{content[0]}</UserLogo>
        <h3 className="userName" onClick={goToUser}>
          {content}
        </h3>
        <LikeButton />
        <LikeCount>{winLike}</LikeCount>
      </UserContainer>
    </Figure>
  );
}

const Figure = styled.div`
  display: inline-block;
  margin: 0;
`;

const ImgContainer = styled.div`
  position: relative;
  img {
    position: abolute;
    width: 100%;
    border: 1px solid none;
    border-radius: 15px;
  }
  img:hover + button {
    opacity: 1;
  }
`;

const ClosingButton = styled.button`
  float: right;
  position: absolute;
  top: 5%;
  right: 7%;
  border-radius: 20px;
  background-color: red;
  color: white;
  border: none;
  width: 70px;
  height: 35px;
  font-size: 12px;
  opacity: 0;
  cursor: pointer;
  &:hover {
    filter: brightness(80%);
    opacity: 1;
  }
`;

// 모달창
const Model = styled.div`
  background: white;
  position: absolute;
  padding: 20px 16px;
  margin-left: -20%;
  border-radius: 30px;
  width: 320px;
  z-index: 5000;
  top: 15%;
  right: 0;
  left: 0;
  bottom: 0;
  height: 498px;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: 900;
  .userName {
    margin-top: 7px;
    margin-left: 0px;
  }
`;

const UserLogo = styled.div`
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  padding: 5px;
  margin-left: 5px;
  background-color: rgb(237, 237, 237);
`;

const LikeCount = styled.span`
  margin-top: 6px;
  margin-right: 10px;
`;
export default WinLists;
