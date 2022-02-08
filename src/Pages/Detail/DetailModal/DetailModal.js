import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DetailModal = ({ winData, setModifyModal }) => {
  const navigate = useNavigate();

  const [boardList, setBoardList] = useState('');

  const [boardListModal, setBoardListModal] = useState(false);

  const [currentBoard, setCurrentBoard] = useState(winData.isSaved[0].name);
  const [currentBoardId, setCurrentBoardId] = useState(winData.isSaved[0].id);
  const [tagList, setTagList] = useState(winData.tags);
  const [currentTitle, setCurrentTitle] = useState(winData.title);
  const [currentDesc, setCurrentDesc] = useState(winData.description);

  const author = winData.isAuthor;

  useEffect(() => {
    const headers = {
      Authorization: sessionStorage.getItem('token'),
    };
    axios
      // .get('/datas/board.json')
      .get(`${process.env.REACT_APP_SERVER_HOST}/board`, { headers })
      .then(function (res) {
        setBoardList(res.data.boardList);
      });
  }, []);

  const boardListHandler = () => {
    if (boardListModal) return setBoardListModal(false);
    else return setBoardListModal(true);
  };

  const titleHandler = e => {
    setCurrentTitle(e.target.value);
  };

  const descHandler = e => {
    setCurrentDesc(e.target.value);
  };

  const currentBoardHandler = (name, id) => {
    setCurrentBoard(name);
    setCurrentBoardId(id);
    setBoardListModal(false);
  };

  const modifyWinHandler = () => {
    const MODIFY_URL = `${process.env.REACT_APP_SERVER_HOST}/win`;
    let putUrl = '';
    if (author) {
      putUrl = `${MODIFY_URL}/${winData.id}`;
    } else {
      putUrl = `${MODIFY_URL}/save`;
    }
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: sessionStorage.getItem('token'),
    };

    const data = author
      ? {
          title: currentTitle,
          desc: currentDesc,
          boardId: currentBoardId,
          tags: tagList,
        }
      : {
          boardId: currentBoardId,
          winId: winData.id,
        };
    axios
      .put(putUrl, data, {
        headers,
      })
      .then(setModifyModal(false))
      .catch(error => console.log(error));
  };

  const deleteWinHandler = () => {
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: sessionStorage.getItem('token'),
    };
    axios
      .delete(`${process.env.REACT_APP_SERVER_HOST}/win/${winData.id}`, {
        headers,
      })
      .then(navigate('/win'))
      .catch(error => console.log(error));
  };

  const deleteTag = (e, index) => {
    let arr = [...tagList];
    arr.splice(index, 1);
    setTagList(arr);
  };

  const createTagHandler = e => {
    const arr = [...tagList];
    if (e.key == 'Enter' && e.target.value) {
      arr.push({ name: e.target.value });
      e.target.value = '';
      setTagList(arr);
    }
  };

  return (
    <ModifyModal>
      <ModalArea>
        <ModalTitle>이 WIN 수정하기</ModalTitle>
        <ModifyArea>
          <ModifyContent>
            {boardListModal ? (
              <BoardModal>
                {boardList &&
                  boardList.map(boardList => (
                    <ul>
                      <li
                        onClick={() =>
                          currentBoardHandler(boardList.name, boardList.id)
                        }
                      >
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
            {author ? (
              <div>
                <TagArea>
                  <span>태그</span>
                  {tagList &&
                    tagList.map((tag, index) => (
                      <ImgTag onClick={e => deleteTag(e, index)}>
                        {tag.name}
                      </ImgTag>
                    ))}
                  <input type="text" onKeyPress={createTagHandler}></input>
                </TagArea>
                <TitleArea>
                  <span>제목</span>
                  <TitleTextArea
                    // defaultValue={winData.title}
                    onChange={titleHandler}
                    defaultValue={currentTitle}
                  ></TitleTextArea>
                </TitleArea>
                <DescArea>
                  <span>내용</span>
                  <DescTextArea
                    // defaultValue={winData.description}
                    onChange={descHandler}
                    defaultValue={currentDesc}
                  ></DescTextArea>
                </DescArea>
              </div>
            ) : null}
          </ModifyContent>
          <ImgArea>
            <Img src={winData.imageUrl} />
          </ImgArea>
        </ModifyArea>
        <ButtonArea>
          <LeftBtns>
            {author ? (
              <button onClick={deleteWinHandler} className="deleteBtn">
                삭제
              </button>
            ) : null}
          </LeftBtns>
          <RightBtns>
            <button className="cancelBtn" onClick={() => setModifyModal(false)}>
              취소
            </button>
            <button onClick={modifyWinHandler} className="saveBtn">
              저장
            </button>
          </RightBtns>
        </ButtonArea>
      </ModalArea>
    </ModifyModal>
  );
};

const spanStyle = css`
  margin-top: 20px;
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
  width: 60%;
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
  height: 54px;
  padding-right: 20px;
  padding-bottom: 20px;
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
  vertical-align: bottom;
  background-color: rgb(237, 237, 237);
`;

const TagArea = styled.section`
  display: flex;
  flex-wrap: wrap;
  height: 54px;
  padding-right: 20px;
  padding-bottom: 20px;

  span {
    margin-right: 15px;
    ${spanStyle}
  }

  input {
    :focus {
      border: none;
      border-bottom: 1px solid;
      outline: none;
    }
    width: 100px;
    border: none;
    border-bottom: 1px solid;
    margin-top: 20px;
    font-size: 16px;
  }
  border-bottom: 1px solid lightgray;
`;

const ImgTag = styled.span`
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border: none;
  border-radius: 26px;
  background-color: rgb(237, 237, 237);
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
  margin-left: 7%;
`;

const Img = styled.img.attrs(props => ({
  src: props.src,
  alt: '수정중',
}))`
  width: 80%;
  border-radius: 20px;
`;

const ButtonArea = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const LeftBtns = styled.section`
  margin: 20px 0 20px 20px;
  button {
    cursor: pointer;
    margin-left: 10px;
    padding: 15px 20px;
    font-size: 20px;
    font-weight: 600;
    border: none;
    border-radius: 15px;
    :hover {
      background-color: lightgray;
    }
  }
`;

const RightBtns = styled.section`
  margin: 20px 50px 20px 0;
  button {
    cursor: pointer;
    margin-left: 40px;
    padding: 15px 20px;
    font-size: 20px;
    border: none;
    font-weight: 600;
    border-radius: 15px;
    :hover {
      background-color: lightgray;
    }
  }

  .saveBtn {
    background-color: red;
    color: white;
    :hover {
      background-color: darkred;
    }
  }
`;

export default DetailModal;
