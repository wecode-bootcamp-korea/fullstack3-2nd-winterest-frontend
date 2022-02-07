import React, { useEffect, useRef, useState } from 'react';
import NavBarHome from '../../Components/NavBar/NavBarHome';
import styled, { keyframes } from 'styled-components';
import WinMains from '../../Components/Win/WinMains';
import Modal from '../../Components/Modal/Modal';
import SignIn from '../../Components/Signs/SignIn';
import SignUp from '../../Components/Signs/SignUp';

function Main() {
  const [winMain, setWinMain] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [changeForm, setChangeForm] = useState('signIn');

  const openModal = e => {
    console.log(e);
    if (e.target.name === 'signIn') {
      setChangeForm('signIn');
    } else {
      setChangeForm('signUp');
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const transForm = () => {
    setChangeForm('signUp');
  };

  //위 텍스트
  const txt = '라이프 스타일을 찾아보세요';
  const [Text, setText] = useState('');
  const [Count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText(Text + txt[Count]);
      setCount(Count + 1);
    }, 200);
    if (Count === txt.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  const [loading, setLoading] = useState(false);
  const fetchWins = async pageNumber => {
    const Access_Key = 'GG7QGphEKTFnUf8BYxBcHF8zd3vq0g40fQB3hyiiSW8';
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=20`,
    );
    const data = await res.json();
    console.log(data);
    setWinMain(prev => [...prev, ...data]);
    setLoading(true);
  };

  useEffect(() => {
    fetchWins(pageNumber);
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const pageEnd = useRef();
  let num = 1;
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            num++;
            loadMore();
            if (num >= 1) {
              observer.unobserve(pageEnd.current);
            }
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading, num]);

  return (
    <FullContainer>
      <NavBarHome />
      <FloatingSignin>
        <button className="login" name="signIn" onClick={openModal}>
          Log in
        </button>
      </FloatingSignin>
      <FloatingSignup>
        <button className="signup" name="signUp" onClick={openModal}>
          Sign up
        </button>
      </FloatingSignup>
      <FullTextContainer>
        <HeaderTextContainer>
          <HeaderText>당신의</HeaderText>
        </HeaderTextContainer>
        <MainTextContainer>
          <MainText>{Text}</MainText>
        </MainTextContainer>
      </FullTextContainer>
      <Container>
        {winMain.map((win, index) => {
          return <WinMains src={win.urls.regular} key={index} />;
        })}
        <div ref={pageEnd}></div>
      </Container>

      <ModalContainer>
        <Modal open={modalOpen} close={closeModal}>
          {changeForm === 'signIn' && <SignIn change={transForm} />}
          {changeForm === 'signUp' && <SignUp />}
        </Modal>
      </ModalContainer>
    </FullContainer>
  );
}

const FullContainer = styled.div``;

const Container = styled.div`
  column-width: 300px;
  margin: 50px 50px;
  margin-top: -100px;
`;

const FullTextContainer = styled.div`
  flex-wrap: wrap;
  padding-bottom: 150px;
`;

const HeaderTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 17vh;
`;
const HeaderText = styled.div`
  font-size: 60px;
  font-weight: 600;
`;

const MainTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  position: relative;
`;
const MainText = styled.div`
  font-size: 60px;
  font-weight: 600;
  position: absolute;
  top: -20px;
`;

const bounce2 = keyframes`
  0% {top: -2px}
  50% {top: 2px}
  100% { top: -2px}
`;

const bounce1 = keyframes`
  0% {bottom: 18px}
  50% {bottom: 20px}
  100% { bottom: 18px}
`;

const FloatingSignin = styled.div`
  margin-left: -6.5%;
  z-index: 20;
  position: fixed;
  left: 50%;
  animation: ${bounce1} 1s infinite;
  @media screen and (max-width: 1200px) {
    margin-left: -12%;
  }
  @media screen and (max-width: 768px) {
    margin-left: -17%;
  }
  @media screen and (max-width: 480px) {
    margin-left: -31%;
  }

  /* @media (max-width: 1169px) {
    margin-left: -22%;
  } */

  button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 17px;
    padding: 11px 12px 11px 12px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .login {
    background-color: #0b66e6;
    color: white;
    transition-property: background-color;
    transition-duration: 85ms;
    transition-timing-function: ease-out;
    transition-delay: 0s;

    &:hover {
      background-color: #05326e;
    }
  }
`;

const FloatingSignup = styled.div`
  margin-left: 0.5%;
  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 50%;
  animation: ${bounce1} 1s infinite;
  button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 17px;
    padding: 11px 12px 11px 12px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .signup {
    background-color: #e2e2e2;
    color: black;
    transition-property: background-color;
    transition-duration: 85ms;
    transition-timing-function: ease-out;
    transition-delay: 0s;

    &:hover {
      background-color: #bdbdbd;
    }
  }
`;

const ModalContainer = styled.div``;

export default Main;
