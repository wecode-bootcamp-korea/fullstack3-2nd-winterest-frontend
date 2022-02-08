import React, { useEffect, useState } from 'react';
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
  const location = decodeURI(useLocation().search);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTag(location);
    setWinList([]);
    setPageNumber(1);
  }, [location]);

  const tags = tag.split('=');
  const tagName = tags[1];

  // 스크롤 시 페이지 넘버 증가
  const scrollToEnd = () => {
    if (!loading) {
      setPageNumber(pageNumber + 1);
    }
  };

  // 리스트 패치
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST}/win?tagname=${tagName}&pagenumber=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          Authorization: sessionStorage.getItem('token'),
        },
      },
    )
      .then(res => res.json())
      .then(
        data => (setLoading(true), setWinList([...winList, ...data.winList])),
      );
  }, [pageNumber, tag, loading]);

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
      <Container>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {winList.length > 0 &&
            winList.map(win => {
              return (
                <WinLists
                  src={win.imageUrl}
                  key={win.id}
                  content={win.userName}
                  winId={win.id}
                  userNumber={win.userNumber}
                  winLike={win.likeCount}
                />
              );
            })}
        </Masonry>
      </Container>

      <Loading>
        <LoadingBar src="/images/Winter.gif" alt="load" />
      </Loading>
    </>
  );
}

const Container = styled.div`
  margin: 10% 5%;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
`;
const LoadingBar = styled.img``;

export default List;
