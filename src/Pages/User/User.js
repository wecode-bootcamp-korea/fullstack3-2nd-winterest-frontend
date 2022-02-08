import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BoardList from './BoardList';
import { Link, useParams } from 'react-router-dom';
import Modal from '../../Components/Modal/Modal';
import BoardCreateModal from '../../Components/BoardCreateModal/BoardCreateModal';
import BoardModifyModal from '../../Components/BoardModifyModal/BoardModifyModal';
import NavBarMain from '../../Components/NavBar/NavBarMain';

const User = () => {
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [changeForm, setChangeForm] = useState('Modify');
  const [userData, setUserData] = useState({});
  const [followed, setFollowed] = useState(false);

  const openModal = e => {
    if (e.target.name === 'Modify') {
      setChangeForm('Modify');
    } else {
      setChangeForm('Create');
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const headers = {
    Authorization: sessionStorage.getItem('token'),
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/user/${params.userNumber}`, {
        headers,
      })
      .then(res => setUserData(res.data.userInfo))
      .catch(error => console.log(error));
  }, [followed]);

  const userEmail = email => {
    const result = email.split('@')[0];
    return result;
  };

  const followChange = () => {
    if (followed) return setFollowed(false);
    else return setFollowed(true);
  };

  const followingHandler = () => {
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: sessionStorage.getItem('token'),
    };

    const followData = {
      followingId: userData.id,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/follow`, followData, {
        headers,
      })
      .then(followChange);
  };

  return (
    <UserPage>
      <NavBarMain />
      <Modal open={modalOpen} close={closeModal}>
        {changeForm === 'Modify' && <BoardModifyModal />}
        {changeForm === 'Create' && (
          <BoardCreateModal setModalOpen={setModalOpen} />
        )}
      </Modal>
      <UserInfo>
        <UserLogo>{userData.name && userData.name[0]}</UserLogo>
        <UserName>{userData.name}</UserName>
        <UserId>@{userData.email && userEmail(userData.email)}</UserId>
        <UserFollowing>팔로잉 {userData.followerCount}명</UserFollowing>
        <FunctionTag>
          <span className="linkTo">
            {userData.isMine ? (
              <CopyLink onClick={openModal} name="Create">
                보드 추가
              </CopyLink>
            ) : (
              <CopyLink onClick={followingHandler} name="Create">
                {userData.isFollowing ? '팔로잉' : '팔로우'}
              </CopyLink>
            )}
          </span>
          <Link to="/win/user/upload" className="linkTo">
            <WinUploadLink>Win 업로드</WinUploadLink>
          </Link>
        </FunctionTag>
        <BoardTitle>
          보드 목록
          <BoardList modalOpen={modalOpen} userNumber={params.userNumber} />
        </BoardTitle>
      </UserInfo>
    </UserPage>
  );
};

const UserPage = styled.main`
  background-color: ${props => props.theme.white};
  width: 100%;
  text-align: center;
`;

const TextArea = styled.textarea``;

const UserInfo = styled.article`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  width: 80%;
`;

const UserLogo = styled.section`
  width: 120px;
  height: 120px;
  line-height: 120px;
  margin: auto;
  border: none;
  border-radius: 50%;
  vertical-align: middle;
  font-size: 40px;
  font-weight: 700;
  background-color: rgb(237, 237, 237);
`;

const UserName = styled.p`
  margin-top: 20px;
  font-size: 36px;
  font-weight: 700;
`;

const UserId = styled.p`
  margin-top: 15px;
`;
const UserFollowing = styled.p`
  margin-top: 10px;
  font-weight: 500;
`;

const BoardTitle = styled.section`
  margin-top: 20px;
  font-weight: 700;
  font-size: 30px;
`;

const FunctionTag = styled.section`
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  width: 18%;

  .linkTo {
    text-decoration: none;
    color: black;
  }
`;
const CopyLink = styled.span`
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  padding: 10px;
  background-color: rgb(237, 237, 237);
  border: none;
  border-radius: 20px;

  :hover {
    background-color: lightgray;
  }
`;

const WinUploadLink = styled.span`
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  background-color: rgb(237, 237, 237);
  border: none;
  border-radius: 20px;
  :hover {
    background-color: lightgray;
  }
`;

export default User;
