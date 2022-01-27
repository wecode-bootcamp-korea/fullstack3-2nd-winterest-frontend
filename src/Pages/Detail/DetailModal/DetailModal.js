import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

const DetailModal = ({ winData, setModifyModal }) => {
  const [boardList, setBoardList] = useState('');
  const [boardListModal, setBoardListModal] = useState(false);
  const [currentBoard, setCurrentBoard] = useState(winData.boardName);
  const [tagList, setTagList] = useState(winData.tags);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDesc, setCurrentDesc] = useState('');

  useEffect(() => {
    const headers = {
      Authorization: sessionStorage.getItem('token'),
    };
    axios
      .get('/datas/board.json')
      // .get(`${process.env.REACT_APP_SERVER_HOST}`, {headers})
      .then(function (res) {
        setBoardList(res.data.boardList);
      });
  }, []);

  const boardListHandler = () => {
    console.log(boardListModal);
    if (boardListModal) return setBoardListModal(false);
    else return setBoardListModal(true);
  };

  const titleHandler = e => {
    setCurrentTitle(e.target.value);
  };

  const descHandler = e => {
    setCurrentDesc(e.target.value);
  };

  const currentBoardHandler = name => {
    setCurrentBoard(name);
    setBoardListModal(false);
  };

  return (
    <ModifyModal>
      {/* {console.log(currentBoard)} */}
      <ModalArea>
        <ModalTitle>이 WIN 수정하기</ModalTitle>
        <ModifyArea>
          <ModifyContent>
            {boardListModal ? (
              <BoardModal>
                {boardList &&
                  boardList.map(boardList => (
                    <ul>
                      <li onClick={() => currentBoardHandler(boardList.name)}>
                        {boardList.name}
                      </li>
                    </ul>
                  ))}
              </BoardModal>
            ) : null}
            <BoardArea>
              <span>보드</span>
              <BoardListArea onClick={boardListHandler}>
                {currentBoard}
              </BoardListArea>
            </BoardArea>
            <TagArea>
              <span>태그</span>
              <TagListArea>{tagList}</TagListArea>
            </TagArea>
            <TitleArea>
              <span>제목</span>
              <TitleTextArea
                defaultValue={winData.title}
                onChange={titleHandler}
              ></TitleTextArea>
            </TitleArea>
            <DescArea>
              <span>내용</span>
              <DescTextArea
                defaultValue={winData.description}
                onChange={descHandler}
              ></DescTextArea>
            </DescArea>
          </ModifyContent>
          <ImgArea>
            <Img src={winData.imageUrl} />
          </ImgArea>
        </ModifyArea>
        <ButtonArea>
          <LeftBtns>
            <button className="deleteBtn">삭제</button>
          </LeftBtns>
          <RightBtns>
            <button className="cancelBtn" onClick={() => setModifyModal(false)}>
              취소
            </button>
            <button className="saveBtn">저장</button>
          </RightBtns>
        </ButtonArea>
      </ModalArea>
    </ModifyModal>
  );
};

const spanStyle = css`
  margin-top: 20px;
  padding-right: 50px;
`;

const ModifyModal = styled.section`
  z-index: 3000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica,
    ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, メイリオ, Meiryo,
    ＭＳ Ｐゴシック, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
`;

const ModalArea = styled.article`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 100px 25%;
  width: 50%;
  border-radius: 20px;
  background-color: white;
`;

const ModalTitle = styled.section`
  padding: 15px;
  font-size: 30px;
  text-align: center;
  font-weight: 500;
`;

const ModifyArea = styled.section`
  display: flex;
`;

const ModifyContent = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 30px;
  width: 65%;
`;

const BoardModal = styled.section`
  z-index: 4000;
  position: absolute;
  background-color: white;
  width: 360px;
  margin-left: 92px;
  margin-top: 60px;
  border: 1px solid grey;
  border-radius: 12px;
  padding: 5px 5px;
  li {
    padding: 4px;
    :hover {
      background-color: rgb(237, 237, 237);
    }
  }
`;

const BoardArea = styled.section`
  display: flex;
  span {
    ${spanStyle}
  }
  border-bottom: 1px solid lightgray;
`;

const BoardListArea = styled.section`
  margin: 15px;
  padding-left: 20px;
  width: 360px;
  height: 44px;
  border-radius: 12px;
  line-height: 44px;
  vertical-align: middle;
  background-color: rgb(237, 237, 237);
`;

const TagArea = styled.section`
  display: flex;
  span {
    ${spanStyle}
  }
  border-bottom: 1px solid lightgray;
`;

const TagListArea = styled.span`
  margin: 15px;
  padding-left: 20px;
  width: 360px;
  height: 44px;
`;

const TitleArea = styled.section`
  display: flex;
  span {
    ${spanStyle}
  }
`;

const TitleTextArea = styled.textarea.attrs(props => ({
  value: props.value,
}))`
  resize: none;
  overflow: auto;
  border: 1px solid lightgray;
  border-radius: 16px;
  margin: 15px;
  padding: 8px 8px 8px 20px;
  width: 360px;
  height: 44px;
  font-size: 16px;
`;

const DescArea = styled.section`
  display: flex;
  span {
    ${spanStyle}
  }
`;

const DescTextArea = styled.textarea.attrs(props => ({
  value: props.value,
}))`
  resize: none;
  border: 1px solid lightgray;
  border-radius: 16px;
  font-size: 16px;
  margin: 15px;
  padding: 8px 8px 8px 20px;
  width: 360px;
  height: 44px;
`;

const ImgArea = styled.section`
  width: 30%;
  margin-left: 25px;
`;

const Img = styled.img.attrs(props => ({
  src: props.src,
  alt: '수정중',
}))`
  width: 236px;
  border-radius: 20px;
`;

const ButtonArea = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const LeftBtns = styled.section``;

const RightBtns = styled.section``;

export default DetailModal;
