import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Componenets
import WinAddComment from './WinAddComment';
import CommentList from './CommentList';
// Font Icons
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

const Comment = ({ winId }) => {
  //댓글 fold & unfold
  const [cmtState, setCmtState] = useState(true);

  const [cmtList, setCmtList] = useState({});
  const [reCmt, setReCmt] = useState(false);

  const headers = {
    Authorization: sessionStorage.getItem('token'),
  };

  useEffect(() => {
    axios
      // .get('/datas/comments.json')
      .get(`${process.env.REACT_APP_SERVER_HOST}/comment/${winId}`, { headers })
      .then(function (res) {
        setCmtList(res.data);
        console.log(cmtList);
      });
  }, [reCmt]);

  //댓글 fold & unfold handler
  const cmtStateHandler = () => {
    switch (cmtState) {
      case true:
        setCmtState(false);
        break;
      case false:
        setCmtState(true);
        break;
    }
  };

  return (
    <>
      {cmtState ? (
        <Comments>
          댓글
          <IoIosArrowDown className="commentArrow" onClick={cmtStateHandler} />
          <CommentDesc>
            피드백을 공유하거나 질문을 하거나 칭찬을 남겨주세요
          </CommentDesc>
          <WinAddComment reCmt={reCmt} setReCmt={setReCmt} winId={winId} />
          {/* <WinAddComment winId={winId} /> */}
          {cmtList.comments?.map(cmtList => (
            <>
              <CommentList
                winId={winId}
                data={cmtList}
                logoWidth="45px"
                commentWidth="380px"
                reCmt={reCmt}
                setReCmt={setReCmt}
              />
              {cmtList.comments?.map(ccmtList => (
                <>
                  <CommentList
                    data={ccmtList}
                    logoWidth="32px"
                    commentWidth="348px"
                    reCmt={reCmt}
                    setReCmt={setReCmt}
                  />
                  {ccmtList.comments?.map(cccmtList => (
                    <CommentList
                      data={cccmtList}
                      logoWidth="32px"
                      commentWidth="348px"
                      reCmt={reCmt}
                      setReCmt={setReCmt}
                    />
                  ))}
                </>
              ))}
            </>
          ))}
        </Comments>
      ) : (
        <Comments>
          댓글
          <IoIosArrowForward
            className="commentArrow"
            onClick={cmtStateHandler}
          />
        </Comments>
      )}
    </>
  );
};

const Comments = styled.section`
  position: relative;
  margin-top: 50px;
  font-size: 20px;
  font-weight: 700;

  .commentArrow {
    position: absolute;
    margin-top: -7px;
    margin-left: 10px;
    font-size: 30px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const CommentDesc = styled.p`
  margin-top: 30px;
  margin-left: 2px;
  font-size: 12px;
`;

export default Comment;
