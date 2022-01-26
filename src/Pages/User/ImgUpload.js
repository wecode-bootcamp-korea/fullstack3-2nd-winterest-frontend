import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { HiArrowCircleUp } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';

const ImgUpload = () => {
  //useState 관리
  const [tag, setTag] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState('');

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
    setTag(e.target.value);
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
    formData.append('boardId', 9);

    axios.defaults.headers.post = null;
    axios.post(
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
    );

    return axios;
  };

  return (
    <Section background="lightgrey">
      <UploadBox>
        <InnerBox>
          <OptionAndTag>
            <BiDotsHorizontalRounded
              className="dotThree"
              onClick={() => alert('아직 준비중입니다!')}
            />
            <section>
              <input type="text" onChange={tagHandler}></input>
              <SaveButton onClick={postHandler}>저장</SaveButton>
            </section>
          </OptionAndTag>
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
              <TextTitle
                ref={refTitle}
                onInput={titleAreaResize}
                placeholder="제목 추가"
              />
              <UserName>
                <CircleUserWord>T</CircleUserWord>
                &nbsp;&nbsp;TjPark
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
const TextArea = css`
  width: 100%;
  resize: none;
  border: 0;
  border-bottom: 1px solid grey;
  outline: none;
  overflow: auto;
  word-spacing: -5px;
`;

const ImgArea = css`
  width: 340px;
  height: 454px;
  border-radius: 1rem;
  background-color: rgb(237, 237, 237);
`;

const Section = styled.section`
  background-color: rgb(237, 237, 237);
`;

const UploadBox = styled.section`
  width: 880px;
  height: 650px;
  margin: 100px auto;
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

const SaveButton = styled.button``;

export default ImgUpload;
