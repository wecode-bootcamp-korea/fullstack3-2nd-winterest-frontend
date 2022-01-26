import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { saveAs } from 'file-saver';
import { FaArrowLeft } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiShare } from 'react-icons/fi';
import { BiCopy } from 'react-icons/bi';
import Comment from '../../Components/Comment/Comment';
import axios from 'axios';
import DetailModal from './DetailModal/DetailModal';

const WinDetail = () => {
  const params = useParams();
  const [winData, SetWinData] = useState('');

  const [winModal, setWinModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  const [isAuthor, setIsAuthor] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const [modalTitle, setModalTitle] = useState('');

  const downloadImage = imgUrl => {
    const imgName = imgUrl.split('/')[2];
    saveAs(imgUrl, imgName); // Put your image url here.
    setWinModal(false);
  };

  const modifyWinHandler = () => {
    switch (winModal) {
      case true:
        setWinModal(false);
        break;
      case false:
        setWinModal(true);
        break;
    }
  };

  // 수정 modal 화면 띄우기
  const showModifyModal = e => {
    setWinModal(false);
    setModifyModal(true);
  };

  const saveWinHandler = () => {
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: sessionStorage.getItem('token'),
    };
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/win`, { headers });
  };

  const followingHandler = () => {
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: sessionStorage.getItem('token'),
    };

    const followData = {
      followingId: winData.authorId,
    };
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/follow`, followData, {
      headers,
    });
  };

  const linkToTag = tagName => {
    return `/win?tagname=${tagName}`;
  };

  const LinkToUser = num => {
    return `/win/user/${num}`;
  };

  useEffect(() => {
    const headers = {
      Authorization: sessionStorage.getItem('token'),
    };
    axios
      .get('/datas/winDetail.json')
      // .get(`${process.env.REACT_APP_SERVER_HOST}/win/${params.winId}`, {headers})
      .then(function (res) {
        SetWinData(res.data.winDetail);
        setIsAuthor(res.data.winDetail.isAuthor);
        setIsSaved(res.data.winDetail.isSaved);
      });
  }, []);

  return (
    <Section>
      {modifyModal ? (
        <DetailModal winData={winData} setModifyModal={setModifyModal} />
      ) : null}
      <Main>
        <Aside>
          <FaArrowLeft className="goBack" />
        </Aside>
        <Article>
          {winModal ? (
            <WinFunction>
              {isSaved ? (
                <>
                  {isAuthor ? (
                    <ModifyWin
                      onClick={() => showModifyModal(winData.isAuthor)}
                    >
                      핀 수정
                    </ModifyWin>
                  ) : (
                    <ModifyBoard
                      onClick={() => showModifyModal(winData.isAuthor)}
                    >
                      보드 수정
                    </ModifyBoard>
                  )}
                  <ImgDownLoad onClick={() => downloadImage(winData.imageUrl)}>
                    이미지 다운로드
                  </ImgDownLoad>
                </>
              ) : (
                <ImgDownLoad onClick={() => downloadImage(winData.imageUrl)}>
                  이미지 다운로드
                </ImgDownLoad>
              )}
            </WinFunction>
          ) : null}
          <ImgSection>
            <DetailImg alt="ImgAlt" src={winData.imageUrl} />
          </ImgSection>
          <FunctionSection>
            <IconsAndBoard>
              <Icons>
                <BiDotsHorizontalRounded
                  onClick={modifyWinHandler}
                  className="more"
                />

                <FiShare
                  onClick={() => alert('준비중임다!')}
                  className="send"
                />
                <BiCopy onClick={() => alert('준비중임다!')} className="copy" />
              </Icons>
              <MyBoard>
                <SaveBtn
                  isSaved={isSaved ? 'black' : 'red'}
                  onClick={() => saveWinHandler}
                >
                  {isSaved ? '저장됨' : '저장'}
                </SaveBtn>
              </MyBoard>
            </IconsAndBoard>
            <ImgTitle>{winData.title}</ImgTitle>
            <TagArea>
              {winData.tags?.map(tagName => (
                <Link to={linkToTag(tagName)} className="linkTo">
                  <ImgTag>{tagName}</ImgTag>
                </Link>
              ))}
            </TagArea>
            <UserAndFollow>
              <ProfileAndFollower>
                <Link to={LinkToUser(winData.userNumber)}>
                  <UserLogo parent>
                    {winData.author && winData.author[0]}
                  </UserLogo>
                </Link>
                <UserInfo>
                  <UserId>{winData.author}</UserId>
                  <Followers>팔로워 {winData.followCount}명</Followers>
                </UserInfo>
              </ProfileAndFollower>
              <FollowBtn
                onClick={followingHandler}
                isFollowing={
                  winData.isFollowing ? 'black' : 'rgb(237, 237, 237)'
                }
                color={winData.isFollowing ? 'white' : 'black'}
              >
                {winData.isFollowing ? '팔로잉' : '팔로우'}
              </FollowBtn>
            </UserAndFollow>
            <Comment winId={winData.id} />
          </FunctionSection>
        </Article>
      </Main>
      <WinList />
    </Section>
  );
};

//전역 styled-component
const TagInModal = css`
  margin: 2px;
  padding: 12px;
  cursor: pointer;
  :hover {
    box-shadow: inset 0px 0px 0px 4px rgb(121, 182, 252);
    border-radius: 14px;
    background-color: rgb(237, 237, 237);
  }
`;

const Section = styled.section`
  background-color: ${props => props.theme.white};
`;

const Main = styled.main`
  display: flex;
  position: relative;
`;

const Aside = styled.aside`
  position: absolute;

  margin-top: 110px;
  .goBack {
    margin-left: 30px;
    font-size: 18px;
  }
`;

const Article = styled.article`
  display: flex;
  position: relative;
  margin: 0 auto;
  margin-top: 100px;
  width: 1016px;
  border: 1px solid none;
  border-radius: 32px;
  box-shadow: 0px 1px 20px 0px rgb(0 0 0 / 10%);
`;

const WinFunction = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  margin-left: 450px;
  z-index: 1000;
  width: 180px;
  padding: 2px;
  font-size: 16px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica,
    ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, メイリオ, Meiryo,
    ＭＳ Ｐゴシック, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  border: 1px solid none;
  border-radius: 16px;
  box-shadow: 0px 1px 20px 0px rgb(0 0 0 / 10%);
  background-color: white;
`;

const ModifyWin = styled.p`
  ${TagInModal}
`;

const ModifyBoard = styled.p`
  ${TagInModal}
`;

const ImgDownLoad = styled.p`
  ${TagInModal}
`;

const ImgSection = styled.section``;

const DetailImg = styled.img.attrs(props => ({
  alt: props.alt,
  src: props.src,
}))`
  width: 508px;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
`;

const FunctionSection = styled.section`
  width: 508px;
  margin: 30px 30px 20px 30px;
`;

const IconsAndBoard = styled.section`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: white;
`;

const Icons = styled.section`
  display: flex;
  position: relative;
  .more {
    margin-right: 30px;
    font-size: 35px;
    padding: 3px;
    :hover {
      cursor: pointer;
      background-color: rgb(237, 237, 237);
      border: none;
      border-radius: 50%;
      box-shadow: inset 0px 0px 0px 4px rgb(237, 237, 237);
    }
  }

  .send {
    margin-right: 30px;
    font-size: 27px;
    padding: 5px;
    :hover {
      cursor: pointer;
      background-color: rgb(237, 237, 237);
      box-shadow: inset 0px 0px 0px 4px rgb(237, 237, 237);
      border: none;
      border-radius: 50%;
    }
  }

  .copy {
    margin-right: 30px;
    font-size: 30px;
    padding: 5px;
    :hover {
      cursor: pointer;
      background-color: rgb(237, 237, 237);
      box-shadow: inset 0px 0px 0px 4px rgb(237, 237, 237);
      border: none;
      border-radius: 50%;
    }
  }
`;

const MyBoard = styled.section``;

const SaveBtn = styled.button`
  width: 60px;
  height: 48px;
  border: 0;
  border-radius: 30px;
  font-size: 17px;
  text-align: center;
  color: white;
  background-color: ${props => props.isSaved};
  cursor: pointer;
`;

// const UploadUser = styled.p`
//   margin-top: 15px;
//   font-size: 20px;
// `;

const ImgTitle = styled.p`
  margin-top: 20px;
  font-size: 35px;
  font-weight: 700;
`;

const TagArea = styled.section`
  margin: 30px auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .linkTo {
    text-decoration: none;
    color: black;
    margin: 20px 15px 10px 0;
  }
`;

const ImgTag = styled.span`
  cursor: pointer;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  font-weight: 800;
  border: none;
  border-radius: 26px;
  background-color: rgb(237, 237, 237);

  :hover {
    background-color: lightgray;
  }
`;

const UserAndFollow = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ProfileAndFollower = styled.section`
  display: flex;
`;

const UserLogo = styled.section`
  width: ${props => (props.parent ? '45px' : '32px')};
  height: ${props => (props.parent ? '45px' : '32px')};
  line-height: ${props => (props.parent ? '45px' : '32px')};
  border: 0;
  border-radius: 50%;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  background-color: rgb(237, 237, 237);
`;

const UserInfo = styled.section`
  display: flex;
  flex-direction: column;
  margin: 13px 13px;
`;

const UserId = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const Followers = styled.span`
  margin-left: -2px;
  margin-top: 10px;
  font-size: 14px;
`;

const FollowBtn = styled.button`
  min-width: 60px;
  height: 48px;
  border: 0;
  border-radius: 30px;
  padding: 12px 16px;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  color: ${props => props.color};
  background-color: ${props => props.isFollowing};
  cursor: pointer;
`;

const WinList = styled.section`
  height: 1000px;
`;

export default WinDetail;
