import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BoardList = ({ modalOpen, userNumber }) => {
  const [boardData, setBoardData] = useState([]);

  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: sessionStorage.getItem('token'),
  };

  const data = {
    userNumber: userNumber,
  };

  useEffect(() => {
    axios
      // .get('/datas/board.json')
      .post(`${process.env.REACT_APP_SERVER_HOST}/user/board`, data, {
        headers,
      })
      .then(res => setBoardData(res.data.boardList))
      .catch(error => console.log(error));
  }, [modalOpen]);

  const linkToBoard = id => {
    return `/board/${id}`;
  };

  return (
    <BoardArea>
      {boardData?.map(boardData => (
        <>
          <BoardLink>
            <Link to={linkToBoard(boardData.id)} className="linkTo">
              {boardData.name}
            </Link>
          </BoardLink>
        </>
      ))}
    </BoardArea>
  );
};

const BoardArea = styled.section`
  display: flex;
  margin-top: 30px;
`;

const BoardLink = styled.section`
  margin-right: 20px;

  .linkTo {
    text-decoration: none;
    color: black;
  }
`;

export default BoardList;
