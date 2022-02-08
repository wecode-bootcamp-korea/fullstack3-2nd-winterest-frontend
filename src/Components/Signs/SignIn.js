import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function SignIn({ change }) {
  const [emailValue, setEmailValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  const [isVisibility, setIsVisibility] = useState(false);
  const handleEmailInput = e => {
    setEmailValue(e.target.value);
  };
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=6973596e70c32c934b3d23792b4fed05&redirect_uri=http://localhost:3000/user/kakao&response_type=code`;

  const handlePwInput = e => {
    setPwValue(e.target.value);
  };

  const navigate = useNavigate();

  const goToList = () => {
    navigate('/win');
  };

  const loginLogic = () => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/user/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        email: emailValue,
        password: pwValue,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'INVALID_USER') {
          setIsVisibility(true);
        } else if (data.message === 'KEY_ERROR') {
          setIsVisibility(true);
        } else {
          alert('다시 만나뵙게 되어 반갑네요🥰');
          goToList();
          sessionStorage.setItem('token', data.token);
        }
      });
  };

  return (
    <LoginWrapper>
      <LoginForm>
        <HeadingWrapper>
          <Heading1>Winterest 에 오신 것을</Heading1>
          <Heading2>환영합니다</Heading2>
        </HeadingWrapper>
        <IdContainer>
          <IdInput
            type="text"
            placeholder="이메일"
            value={emailValue}
            onChange={handleEmailInput}
          />
        </IdContainer>
        <PwContainer>
          <PwInput
            type="password"
            placeholder="비밀번호"
            value={pwValue}
            onChange={handlePwInput}
          />
        </PwContainer>
        <AlertContainer
          style={{ visibility: isVisibility ? 'visible' : 'hidden' }}
        >
          <div>이메일 또는 비밀번호가 잘못되었습니다.</div>
        </AlertContainer>
        <Buttons>
          <DefaultLogin>
            <LoginDefault type="button" onClick={loginLogic}>
              일반 로그인 하기
            </LoginDefault>
          </DefaultLogin>
          <KakaoLoginWrapper>
            <KakaoLogin type="button">
              <a href={KAKAO_AUTH_URL}>카카오로 시작하기</a>
            </KakaoLogin>
          </KakaoLoginWrapper>
          <SignUpButton>
            <h3 onClick={change}>아직 가입 안 하셨나요?</h3>
          </SignUpButton>
        </Buttons>
      </LoginForm>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: fit-content;
  margin: 0 auto;
  margin-top: -65px;
  padding-top: 100px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 450px;
`;

const LoginForm = styled.form`
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 20px 10px 24px;
`;

const Img = styled.img`
  width: 100px;
`;

const IdContainer = styled.div`
  margin-top: 20px;
`;

const IdInput = styled.input`
  padding-left: 20px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
`;

const PwContainer = styled.div`
  margin-top: 10px;
`;

const PwInput = styled.input`
  padding-left: 20px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
`;

const AlertContainer = styled.section`
  margin-top: 10px;
  color: rgb(250, 128, 114);
`;

const Buttons = styled.div``;
const KakaoLogin = styled.button`
  margin-top: 20px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  background-color: yellow;
  height: 30px;
  width: 250px;
  border-width: 2px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const LoginDefault = styled.button`
  margin-top: 20px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
  background-color: gry;
`;

const KakaoLoginWrapper = styled.div`
  a {
    all: unset;
  }
`;

const HeadingWrapper = styled.div`
  margin-top: -20px;
`;

const Heading1 = styled.h2`
  font-size: 30px;
  white-space: nowrap;
`;

const Heading2 = styled.h2`
  font-size: 30px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
`;

const DefaultLogin = styled.div``;

const SignUpButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  &:hover {
    cursor: pointer;
  }
`;
export default SignIn;
