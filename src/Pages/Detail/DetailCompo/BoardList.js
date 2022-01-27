import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

const MyBoardList = () => {
  const [boardList, setBoardList] = useState({});
  useEffect(() => {
    axios.get('/datas/board.json').then(function (res) {
      setBoardList(res.data);
    });
  }, []);
  return (
    <BoardName>
      프로필
      <IoIosArrowDown className="arrowDown" />
    </BoardName>
  );
};
const BoardName = styled.span`
  margin-right: 20px;

  .arrowDown {
    margin-left: 5px;
  }
`;
export default MyBoardList;
