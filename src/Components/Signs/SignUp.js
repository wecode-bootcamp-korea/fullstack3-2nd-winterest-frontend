import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

function SignUp() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  const [isFormVisibility, setIsFormVisibility] = useState(false);
  const [isEmailVisibility, setIsEmailVisibility] = useState(false);

  const handleNameInput = e => {
    setNameValue(e.target.value);
  };

  const handleEmailInput = e => {
    setEmailValue(e.target.value);
  };

  const handlePwInput = e => {
    setPwValue(e.target.value);
  };

  const navigate = useNavigate();

  const regexId =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/i;

  const regexPw = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8}/;

  const goToList = () => {
    navigate('/win');
  };

  const kauth = `https://kauth.kakao.com/oauth/authorize?client_id='6973596e70c32c934b3d23792b4fed05'&redirect_uri='http://localhost:3000/user/kakao'&response_type=code`;

  const signupLogic = () => {
    if (regexId.test(emailValue) && regexPw.test(pwValue)) {
      console.log(regexId.test(emailValue) && regexPw.test(pwValue));
      fetch(`${process.env.REACT_APP_SERVER_HOST}/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          password: pwValue,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'KEY_ERROR') {
            setIsFormVisibility(true);
            setIsEmailVisibility(false);
          } else if (data.message === 'EXISTED_USER') {
            setIsEmailVisibility(true);
            setIsFormVisibility(false);
          }

          // if (data.message === 'CHECK YOUR EMAIL OR PASSWORD') {
          //   setIsFormVisibility(true);
          //   setIsEmailVisibility(false);
          // }
          else {
            alert('Winterest에 오신 것을 환영합니다😊');
            goToList();
            console.log(data);
            sessionStorage.setItem('token', data.token);
            console.log(data.token);
          }
        })
        .then(() => {
          fetch(`${process.env.REACT_APP_SERVER_HOST}/board`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: sessionStorage.getItem('token'),
            },
            mode: 'cors',
            body: JSON.stringify({
              boardName: '보드',
            }),
          });
        });
    } else {
      setIsFormVisibility(true);
      setIsEmailVisibility(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginForm>
        <Img src="/images/윈터레스트-001.png" alt="logo" />
        <HeadingWrapper>
          <Heading1>Winterest 에 오신 것을 환영</Heading1>
          <Heading2>합니다</Heading2>
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
        <NameContainer>
          <NameInput
            type="text"
            placeholder="닉네임"
            value={nameValue}
            onChange={handleNameInput}
          />
        </NameContainer>
        <AlertFormContainer
          style={{ visibility: isFormVisibility ? 'visible' : 'hidden' }}
        >
          <div>
            이메일 형식은 아이디와 8자 이상의 영문 대소문자, 숫자, 특수문자가
            혼용된 비밀번호로 사용해주세요.
          </div>
        </AlertFormContainer>
        <AlertEmailContainer
          style={{ visibility: isEmailVisibility ? 'visible' : 'hidden' }}
        >
          <div>기존 가입하신 이메일이 존재합니다! 로그인 부탁드려용~</div>
        </AlertEmailContainer>
        <Buttons>
          <DefaultLogin>
            <LoginDefault type="button" onClick={signupLogic}>
              일반 회원 가입 하기
            </LoginDefault>
          </DefaultLogin>
          <KakaoLoginWrapper>
            <KakaoLogin type="button">카카오로 시작하기</KakaoLogin>
          </KakaoLoginWrapper>
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
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
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
`;

const NameContainer = styled.div`
  margin-top: 10px;
`;

const NameInput = styled.input`
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
`;

const AlertFormContainer = styled.section`
  margin-top: 10px;
  color: rgb(250, 128, 114);
`;

const AlertEmailContainer = styled.section`
  margin-top: -20px;
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
`;

const LoginDefault = styled.button`
  margin-top: 10px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
  background-color: rgb(30 212 255);
`;

const KakaoLoginWrapper = styled.div``;

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

export default SignUp;
