import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const WinAddComment = ({ reCmt, setReCmt, winId }) => {
  const [addCmtState, SetAddCmtState] = useState(false);
  const [cmtContent, setCmtContent] = useState('');

  const addCmtHandler = () => {
    return SetAddCmtState(true);
  };

  const userFirstText = author => {
    const firstText = author[0];
    return firstText;
  };

  const cancelHandler = () => {
    return SetAddCmtState(false);
  };

  const postHandler = () => {
    const data = {
      content: cmtContent,
    };
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: sessionStorage.getItem('token'),
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/comment/${winId}`, data, {
        headers,
      })
      .then(setReCmt(false));
  };

  const commentContentHandler = e => {
    setCmtContent(e.target.value);
  };

  return (
    <CommentAdd>
      <BeforeAddText>
        <UserLogo parent>{userFirstText('PineDelo')}</UserLogo>
        <CommentArea
          onChange={commentContentHandler}
          CommentState={addCmtState}
          onClick={addCmtHandler}
          placeholder="댓글 추가"
        />
      </BeforeAddText>
      <AfterAddText>
        {addCmtState ? (
          <ButtonSection>
            <CancelBtn onClick={cancelHandler}>취소</CancelBtn>
            <CompleteBtn onClick={postHandler}>완료</CompleteBtn>
          </ButtonSection>
        ) : null}
      </AfterAddText>
    </CommentAdd>
  );
};

const CommentAdd = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const BeforeAddText = styled.section`
  display: flex;
`;

const AfterAddText = styled.section`
  display: flex;
`;

const UserLogo = styled.section`
  width: ${props => (props.parent ? '45px' : '32px')};
  height: ${props => (props.parent ? '45px' : '32px')};
  line-height: ${props => (props.parent ? '45px' : '32px')};
  border: 0;
  border-radius: 50%;
  text-align: center;
  background-color: rgb(237, 237, 237);
`;

const CommentArea = styled.textarea.attrs(props => ({
  placeholder: props.placeholder,
}))`
  ::placeholder {
    /* font-size: 16px; */
  }

  :focus {
    border-radius: 16px;
    height: 56px;
  }

  font-size: 16px;
  padding: 2px 12px;
  resize: none;
  width: 362px;
  height: ${props => (props.CommentState ? '56px' : null)};
  margin-left: 15px;
  border: 1px solid lightgrey;
  border-radius: ${props => (props.CommentState ? '16px' : '26px')};
  overflow: auto;
  outline: none;
`;

const ButtonSection = styled.section`
  display: flex;
  margin-top: 10px;
  margin-left: 310px;
`;

const CancelBtn = styled.button`
  width: 60px;
  height: 40px;
  border-radius: 24px;
  margin-right: 15px;
  border: none;
`;

const CompleteBtn = styled.button`
  width: 60px;
  height: 40px;
  border-radius: 24px;
  border: none;
`;
export default WinAddComment;
