import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBarMain from '../../Components/NavBar/NavBarMain';
import WinLists from '../../Components/Win/WinLists';
import Masonry from 'react-masonry-css';
import './styles.css';

// 카드 레이아웃 반응형 변수.
const breakpointColumnsObj = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1,
};

function List() {
  const [winList, setWinList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataCnt, setDataCnt] = useState([]);

  const location = decodeURI(useLocation().search);
  useEffect(() => {
    setTag(location);
    setWinList([]);
    setPageNumber(1);
  }, [location]);

  const tags = tag.split('=');
  const tagName = tags[1];

  const fetchWins = async pageNumber => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST}/win?tagname=${tagName}&pagenumber=${pageNumber}&per_page=10`,
      {
        headers: { Authorization: sessionStorage.getItem('token') },
      },
    );

    const data = await res.json();
    console.log(data);
    setWinList(winList => [...winList, ...data.winList[0]]);
    setDataCnt(data.winList[1][0].count);
    setLoading(true);
  };

  useEffect(() => {
    fetchWins(pageNumber);
  }, [pageNumber, tag]);

  const loadMore = () => {
    if (winList.length < dataCnt) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
      console.log(winList.length);
      console.log(pageNumber);
    }
    return;
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

  return (
    <>
      <NavBarMain pageNumber={setPageNumber} />
      <Container>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {winList &&
            winList.map(winabc => {
              return (
                <WinLists
                  src={winabc.imageUrl}
                  key={winabc.createdAt}
                  content={winabc.userName}
                  winId={winabc.id}
                  userNumber={winabc.userNumber}
                  winLike={winabc.likeCount}
                />
              );
            })}
        </Masonry>
      </Container>

      <LoadingBar
        src="/images/Winter.gif"
        alt="load"
        onClick={loadMore}
        ref={pageEnd}
      />
    </>
  );
}

const Container = styled.div`
  margin: 10% 5%;
`;
// const Loading = styled.div``;
const LoadingBar = styled.img`
  margin-left: 50%;
`;

export default List;
