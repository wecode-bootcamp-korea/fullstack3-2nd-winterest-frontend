import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavBarMain from '../../Components/NavBar/NavBarMain';
import Modal from '../../Components/Modal/Modal';
import BoardModifyModal from '../../Components/BoardModifyModal/BoardModifyModal';
import WinLists from '../../Components/Win/WinLists';

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
  const [boardWins, setBoardWins] = useState(0);

  const fetchWins = async pageNumber => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST}/board/${params.boardId}?pagenumber=${pageNumber}`,
      {
        headers: { Authorization: sessionStorage.getItem('token') },
      },
    );

    const data = await res.json();
    console.log(data);
    setBoardName(data.boardDetail.name);
    setBoardWins(data.boardDetail.wins.length);
    setBoardDetail(boardDetail.concat(data.boardDetail.wins));
    setLoading(true);
  };

  useEffect(() => {
    fetchWins(pageNumber);
  }, [pageNumber]);

  // console.log(boardWins);
  const loadMore = () => {
    if (boardDetail.length < boardWins) {
      console.log(boardDetail.length);
      console.log(pageNumber);
    } else {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  const pageEnd = useRef();
  useEffect(() => {
    console.log(loading);
    if (loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting === true) {
            console.log(entries[0]);
            loadMore();
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  const navigate = useNavigate();
  const goToDetail = wins => {
    navigate(`/win/${wins}`);
  };

  return (
    <>
      <NavBarMain />
      <BoardPageContainer>
        <BoardName>
          {boardName}
          <BoardModifyButton onClick={openModal}>수정</BoardModifyButton>
        </BoardName>
        <Modal open={modalOpen} close={closeModal}>
          <BoardModifyModal
            setModalOpen={setModalOpen}
            boardId={params.boardId}
          />
        </Modal>
        <PinListContainer>
          <PinQuantity>핀 {boardDetail.length}개</PinQuantity>
          <Container>
            {boardDetail &&
              boardDetail.map(wins => {
                return (
                  <FullContainer>
                    <Figure>
                      <ImgContainer>
                        <img
                          className="img"
                          name="win"
                          src={wins.imageUrl}
                          key={wins.createdAt}
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
        </PinListContainer>
      </BoardPageContainer>
      <LoadingBar
        src="/images/Winter.gif"
        alt="load"
        ref={pageEnd}
        onClick={loadMore}
      />
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
// const Loading = styled.div`
//   display: flex;
//   justify-content: center;
// `;
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
