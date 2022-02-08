import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavBarMain from '../../Components/NavBar/NavBarMain';
import Modal from '../../Components/Modal/Modal';
import BoardModifyModal from '../../Components/BoardModifyModal/BoardModifyModal';

function BoardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [boardName, setBoardName] = useState('');
  const [boardDetail, setBoardDetail] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // 스크롤 시 페이지 넘버 증가
  const scrollToEnd = () => {
    if (!loading) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST}/board/${params.boardId}?pagenumber=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          Authorization: sessionStorage.getItem('token'),
        },
      },
    )
      .then(res => res.json())
      .then(
        data => (
          setBoardName(data.boardDetail.name),
          setLoading(true),
          setBoardDetail([...boardDetail, ...data.boardDetail.wins])
        ),
      );
  }, [pageNumber, loading]);

  const navigate = useNavigate();
  const goToDetail = wins => {
    navigate(`/win/${wins}`);
  };

  const onScroll = e => {
    const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
    if (scrollTop + clientHeight === scrollHeight) {
      scrollToEnd();
    }
  };

  // 무한스크롤 디바운스 추가
  const debounce = (func, delay) => {
    let timeoutId = null;
    return (...arg) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func.bind(null, ...arg), delay);
    };
  };
  // 스크롤 이벤트 추가.
  document.addEventListener('scroll', debounce(onScroll, 300));

  return (
    <>
      <NavBarMain />
      <BoardPageContainer>
        <BoardName>
          {boardName && boardName}
          <BoardModifyButton onClick={openModal}>수정</BoardModifyButton>
        </BoardName>
        <Modal open={modalOpen} close={closeModal}>
          <BoardModifyModal
            setModalOpen={setModalOpen}
            boardId={params.boardId}
          />
        </Modal>
        <PinListContainer>
          <PinQuantity>핀 {boardDetail && boardDetail.length}개</PinQuantity>
          <Container>
            {boardDetail.length > 0 &&
              boardDetail.map(wins => {
                return (
                  <FullContainer>
                    <Figure>
                      <ImgContainer>
                        <img
                          className="img"
                          name="win"
                          src={wins.imageUrl}
                          alt="test"
                          onClick={() => goToDetail(wins.id)}
                        />
                      </ImgContainer>
                    </Figure>
                  </FullContainer>
                );
              })}
            <div></div>
          </Container>
          <Loading>
            <LoadingBar src="/images/Winter.gif" alt="load" />
          </Loading>
        </PinListContainer>
      </BoardPageContainer>
    </>
  );
}

const BoardPageContainer = styled.div``;

const PinListContainer = styled.div`
  margin-top: -8%;
`;

const FullContainer = styled.div`
  column-width: 300px;
  margin: 50px 50px;
`;

const Figure = styled.div`
  display: inline-block;
  margin: 0;
  margin-bottom: 15px;
`;

const ImgContainer = styled.div`
  position: relative;
  img {
    position: abolute;
    width: 100%;
    border: 1px solid none;
    border-radius: 15px;
  }
`;

const BoardName = styled.h3`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 2em;
  margin-top: 10%;
`;

const PinQuantity = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 10%;
  margin-left: 3%;
`;

const Container = styled.div`
  column-width: 300px;
  margin: 50px 50px;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
`;
const LoadingBar = styled.img``;

const BoardModifyButton = styled.button`
  all: unset;
  margin-top: -5px;
  margin-left: 20px;
  font-size: 10px;
  border-radius: 24px;
  background-color: red;
  color: white;
  padding: 12px 12px;
`;
export default BoardPage;
