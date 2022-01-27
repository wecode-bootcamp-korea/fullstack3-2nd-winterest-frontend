import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function BoardList({ boardName, winId, boardId }) {
  function saveBoard() {
    console.log(winId, boardId, boardName);
    fetch(`${process.env.REACT_APP_SERVER_HOST}/win/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token'),
      },
      // headers: new Headers({ Authorization: sessionStorage.getItem('token') }),
      body: JSON.stringify({
        boardId: boardId,
        winId: winId,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'SAVE_SUCCESS') {
          alert('보드에 저장 성공😆');
        }
        if (data.message === 'ALREADY_SAVED') {
          alert(
            '이미 저장한 윈입니다! 삭제를 원하신다면, 보드 페이지에서 삭제해 주세요.😭',
          );
        }
      });
  }

  return (
    <BoardListContainer>
      <ImgContainer>
        <img src="/images/윈터레스트-001.png" alt="board"></img>
      </ImgContainer>
      <BoardName>{boardName}</BoardName>
      <SaveButton className="storeButton" type="button" onClick={saveBoard}>
        저장
      </SaveButton>
    </BoardListContainer>
  );
}

const ImgContainer = styled.div`
  max-width: 100px;
  height: 70px;
  display: inline-block;
  img {
    width: 100%;
  }
`;

const BoardName = styled.div`
  display: inline-block;
  position: relative;
  top: 30px;
  right: 30px;
`;
const SaveButton = styled.button`
  display: inline-block;
  position: relative;
  top: 10px;
`;
// overflow: auto
const BoardListContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function BoardModal({ winId }) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/board`, {
      method: 'GET',
      headers: new Headers({ Authorization: sessionStorage.getItem('token') }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setBoards(data.boardList);
      });
  }, []);

  return (
    <BoardContainer>
      <BoardStore>
        <h1>저장</h1>
      </BoardStore>
      <SearchingContainer>
        <input type="text" placeholder="검색"></input>
      </SearchingContainer>

      <BoardText>
        <span>내 보드 목록</span>
      </BoardText>
      <FullStoreContainer>
        {/* <ImgContainer>
          <img src="/images/윈터레스트-001.png" alt="board"></img>
        </ImgContainer> */}
        {boards &&
          boards.map(board => {
            return (
              <StoreContainer>
                <BoardList
                  boardName={board.name}
                  winId={winId}
                  boardId={board.id}
                />
              </StoreContainer>
            );
          })}
      </FullStoreContainer>
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardStore = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 10px;
  h1 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const SearchingContainer = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  input {
    border: 1px solid gray;
    border-radius: 30px;
    width: 300px;
    height: 40px;
  }
`;

const BoardText = styled.div`
  margin-top: 50px;
  position: relative;
  left: -100px;
`;

const StoreContainer = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  z-index: 200;
  &:hover {
    background-color: rgb(235 235 235);
  }
  span {
    margin-left: -100px;
  }
  button {
    border: 1px solid rgb(0 217 255);
    border-radius: 40px;
    color: white;
    background-color: rgb(0 217 255);
    width: 70px;
    height: 50px;
    z-index: -200;
    opacity: 0;
    margin-right: 10px;
  }

  &:hover .storeButton {
    z-index: 2000;
    opacity: 1;
    filter: brightness(100%);
  }
`;

const FullStoreContainer = styled.div`
  overflow: auto;
  max-width: 100%;
  width: 320px;
  height: auto;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: inline;
`;
export default BoardModal;
