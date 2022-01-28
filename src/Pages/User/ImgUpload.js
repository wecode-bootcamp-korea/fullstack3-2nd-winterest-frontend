import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
// import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { HiArrowCircleUp } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavBarMain from '../../Components/NavBar/NavBarMain';

const ImgUpload = () => {
  const navigate = useNavigate();
  //useState 관리
  const [tag, setTag] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState('');

  // 현재 선택되어있는 보드 state
  const [currentBoard, setCurrentBoard] = useState('');
  // 현재 선택되어있는 보드 id state
  const [currentBoardId, setCurrentBoardId] = useState(0);
  // 보드 모달 여닫는 state
  const [boardListModal, setBoardListModal] = useState(false);
  // 보드 리스트 저장하는 state
  const [boardList, setBoardList] = useState('');

  const [userName, setUserName] = useState('');

  //useRef 변수에 할당
  const refTitle = React.useRef();
  const refDesc = React.useRef();

  //Title textarea 자동 줄추가 및 스크롤 제거
  const titleAreaResize = e => {
    refTitle.current.style.height = '46px';
    refTitle.current.style.height = refTitle.current.scrollHeight + 'px';
    setTitle(e.target.value);
  };

  const descriptionAreaResize = e => {
    refDesc.current.style.height = '23px';
    refDesc.current.style.height = refDesc.current.scrollHeight + 'px';
    setDescription(e.target.value);
  };

  const previewHandler = e => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/png'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      setFileName(selected);
      setImageUrl(URL.createObjectURL(selected));
    } else {
      console.log('Not Supported File.');
      setError(true);
    }
  };

  // URL 미리보기 삭제(메모리관리)
  const delPreviewHandler = () => {
    URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
  };

  const tagHandler = e => {
    const arr = [...tag];
    if (e.key == 'Enter' && e.target.value) {
      console.log('Enter Pressed');

      arr.push(e.target.value);
      e.target.value = '';

      setTag(arr);
    }
    console.log('tag: ', tag);
  };

  const postHandler = () => {
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: sessionStorage.getItem('token'),
    };

    const formData = new FormData();
    formData.append('image', fileName);
    formData.append('tagNames', tag);
    formData.append('title', title);
    formData.append('desc', description);
    formData.append('boardId', currentBoardId);

    axios.defaults.headers.post = null;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_HOST}/win`,
        formData,
        { headers },
        {
          onUploadProgress: progressEvent => {
            console.log(
              'Upload Progress: ' +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                '%',
            );
          },
        },
      )
      .then(() => navigate('/win'));

    return axios;
  };

  const boardListHandler = () => {
    if (boardListModal) return setBoardListModal(false);
    else return setBoardListModal(true);
  };

  const currentBoardHandler = (name, id) => {
    setCurrentBoard(name);
    setCurrentBoardId(id);
    setBoardListModal(false);
  };

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
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/user/name`, { headers })
      .then(res => setUserName(res.data.userName));
  }, [currentBoard]);

  return (
    <Section>
      <NavBarMain />
      <UploadBox>
        <InnerBox>
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
          <OptionAndTag>
            {/* <BiDotsHorizontalRounded
              className="dotThree"
              onClick={() => alert('아직 준비중입니다!')}
            /> */}

            <TagArea></TagArea>
          </OptionAndTag>
          <BoardArea>
            <span>보드</span>
            <BoardListArea onClick={boardListHandler}>
              {currentBoard}
            </BoardListArea>
            <SaveButton onClick={postHandler}>저장</SaveButton>
          </BoardArea>
          <PreviewAndInfo>
            <Preview>
              {imageUrl ? (
                <>
                  <DelIcon onClick={delPreviewHandler}>
                    <FaTrash className="trash" />
                  </DelIcon>
                  <PreviewImg alt="sample" url={imageUrl} />
                </>
              ) : (
                <label htmlFor="input-file">
                  <BorderDashed>
                    <HiArrowCircleUp className="arrowUp" />
                    <p>클릭하여 이미지 업로드</p>
                  </BorderDashed>
                </label>
              )}
              <input id="input-file" type="file" onChange={previewHandler} />
            </Preview>
            <Info>
              <section className="inputTag">
                {tag?.map(tag => (
                  <ImgTag>{tag}</ImgTag>
                ))}
                <input
                  type="text"
                  placeholder="태그 입력 후 Enter"
                  onKeyPress={tagHandler}
                ></input>
              </section>
              <TextTitle
                ref={refTitle}
                onInput={titleAreaResize}
                placeholder="제목 추가"
              />
              <UserName>
                <CircleUserWord>{userName[0]}</CircleUserWord>
                &nbsp;&nbsp;{userName}
              </UserName>
              <TextDescription
                ref={refDesc}
                onInput={descriptionAreaResize}
                placeholder="사람들에게 회원님의 win에 대해 설명해 보세요"
              />
            </Info>
          </PreviewAndInfo>
        </InnerBox>
      </UploadBox>
    </Section>
  );
};

//전역 styled-component

const spanStyle = css`
  margin-top: 20px;
  padding-right: 20px;
`;

const TextArea = css`
  width: 100%;
  resize: none;
  border: 0;
  border-bottom: 1px solid grey;
  outline: none;
  overflow: auto;
  word-spacing: -5px;
`;

const Section = styled.section`
  min-height: 100vh;
  background-color: rgb(237, 237, 237);
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
  width: 255px;
  height: 44px;
  border-radius: 12px;
  line-height: 44px;
  vertical-align: middle;
  background-color: rgb(237, 237, 237);
`;

const BoardModal = styled.section`
  z-index: 4000;
  position: absolute;
  background-color: white;
  width: 260px;
  margin-left: 68px;
  margin-top: 100px;
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

const TagArea = styled.section``;

const ImgTag = styled.span`
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: 800;
  border: none;
  border-radius: 26px;
  background-color: rgb(237, 237, 237);

  :hover {
    background-color: lightgray;
  }
`;

// const BoardListArea = styled.section`
//   margin: 15px;
//   padding-left: 20px;
//   width: 360px;
//   height: 44px;
//   border-radius: 12px;
//   line-height: 44px;
//   vertical-align: middle;
//   background-color: rgb(237, 237, 237);
// `;

const ImgArea = css`
  width: 340px;
  height: 454px;
  border-radius: 1rem;
  background-color: rgb(237, 237, 237);
`;

const UploadBox = styled.section`
  width: 880px;
  /* height: 650px; */
  margin: 30px auto;
  padding-bottom: 30px;
  border-radius: 1rem;
  background-color: ${props => props.theme.white};
`;

const InnerBox = styled.section`
  padding: 40px 40px 0 40px;
`;

const OptionAndTag = styled.section`
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-left: 40px;

  .dotThree {
    color: grey;
    font-size: 1.7rem;
  }
`;

const PreviewAndInfo = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const Preview = styled.section.attrs(props => ({}))`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${ImgArea};

  input {
    display: none;
  }
`;

const DelIcon = styled.section`
  position: absolute;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-right: 17rem;
  background-color: white;
  padding: 15px;
  .trash {
    width: 25px;
    height: 25px;
  }
`;

const PreviewImg = styled.img.attrs(props => ({
  alt: props.alt,
  src: props.url,
}))`
  ${ImgArea};
`;

const BorderDashed = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 310px;
  height: 424px;
  margin: 10px;
  border: dashed 2px lightgrey;
  border-radius: 1rem;

  .arrowUp {
    color: gray;
    font-size: 2.5rem;
  }

  p {
    margin-top: 20px;
  }
`;

const Info = styled.section`
  width: 380px;
  margin-left: 20px;

  .inputTag {
    margin-top: 20px;
    border: none;
    input {
      :focus {
        outline: none;
      }
      width: 30%;
      margin-top: 10px;
      border: none;
      padding: 5px;
      border-bottom: 1px solid lightgray;
    }
  }
`;

const TextTitle = styled.textarea.attrs(props => ({
  placeholder: props.placeholder,
}))`
  height: 46px;
  margin-top: 40px;
  font-size: 36px;
  font-weight: 700;
  ${TextArea}
`;

const TextDescription = styled.textarea.attrs(props => ({
  placeholder: props.placeholder,
}))`
  height: 23px;
  margin-top: 40px;
  font-size: 18px;
  ${TextArea}
`;

const UserName = styled.section`
  display: flex;

  margin-top: 40px;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

const CircleUserWord = styled.section`
  width: 45px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 600;
  background-color: rgb(237, 237, 237);
`;

const SaveButton = styled.button`
  height: 50px;
  margin-top: 10px;
  margin-left: 40%;
  padding: 5px 20px;
  font-size: 20px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  color: white;
  background-color: red;
  :hover {
    background-color: #c70a0a;
  }
`;

export default ImgUpload;
