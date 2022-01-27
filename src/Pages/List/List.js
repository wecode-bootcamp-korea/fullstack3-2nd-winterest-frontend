import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBarMain from '../../Components/NavBar/NavBarMain';
import WinLists from '../../Components/Win/WinLists';

function List() {
  const [winList, setWinList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);

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
      `${process.env.REACT_APP_SERVER_HOST}/win?tagname=${tagName}&pagenumber=${pageNumber}`,
      {
        headers: { Authorization: sessionStorage.getItem('token') },
      },
    );
    const data = await res.json();
    console.log(data);
    setLoading(true);
    if (data.winList) {
      setWinList(winList.concat(data.winList));
    }

    console.log(setWinList);
  };

  useEffect(() => {
    fetchWins(pageNumber);
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const pageEnd = useRef();
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadMore();
          } else {
            observer.unobserve(pageEnd.current);
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  return (
    <>
      <NavBarMain />
      <Container>
        {winList &&
          winList.map(win => {
            return (
              <WinLists
                src={win.imageUrl}
                key={win.id}
                content={win.userName}
                winId={win.id}
                userNumber={win.userNumber}
              />
            );
          })}
        <div></div>
      </Container>
      <Loading ref={pageEnd}>
        <LoadingBar src="/images/Winter.gif" alt="load" />
      </Loading>
    </>
  );
}

const Container = styled.div`
  column-width: 300px;
  margin: 50px 50px;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
`;
const LoadingBar = styled.img``;

export default List;
