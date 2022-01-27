import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NavBarMain() {
  const [input, setInput] = useState('');

  const handleTagInput = event => {
    setInput(event.target.value);
  };

  const navigate = useNavigate();

  const handleEnter = event => {
    if (event.key === 'Enter') {
      if (input) {
        navigate(`/list?tagname=${input}`);
      } else {
        navigate(`/list`);
      }
    }
  };

  return (
    <NavBarMainContainer>
      <HomeIconWrapper>
        <div className="logoWrapper">
          <img className="logo" alt="logo" src="./images/favicon.png" />
        </div>
        <div className="homeWrapper">
          <Link to="/navbarmain" className="home">
            홈
          </Link>
        </div>
      </HomeIconWrapper>
      <SearchWrapper>
        <div className="search">
          <div className="searchDetail">
            <img
              className="searchIcon"
              alt="searchIcon"
              src="./images/navbar/magnifier.png"
            />
            <div className="searchText">
              <input
                className="searchTextInput"
                type="text"
                placeholder="검색"
                onChange={handleTagInput}
                onKeyPress={handleEnter}
              ></input>
            </div>
          </div>
        </div>
      </SearchWrapper>
      <InfoWrapper>
        <div className="infoIcon">
          <img
            className="icon"
            alt="ringIcon"
            src="./images/navbar/ring-bell.png"
          />
        </div>
        <div className="infoIcon">
          <img className="icon" alt="chatIcon" src="./images/navbar/chat.png" />
        </div>
        <div className="infoIcon">
          <img className="icon" alt="userIcon" src="./images/navbar/user.png" />
        </div>
      </InfoWrapper>
    </NavBarMainContainer>
  );
}

export default NavBarMain;

const NavBarMainContainer = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 6px 0;
`;

const HomeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  flex-grow: 0;
  margin-left: 10px;

  .logoWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 48px;
  }

  .logo {
    height: 24px;
    width: 24px;

    cursor: pointer;
  }

  .homeWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    border-radius: 24px;
    height: 48px;
    width: 60px;
  }

  .home {
    border-radius: 5px;
    color: white;

    cursor: pointer;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  padding: 0 8px 0 20px;
  flex-grow: 1;

  .search {
    display: flex;
    align-items: center;
    height: 48px;
    flex-grow: 1;
    border-radius: 24px;
    background-color: #efefef;
  }

  .searchDetail {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 0;
    min-width: 0;
    padding: 0 0 0 16px;
  }

  .searchIcon {
    display: block;
    height: 16px;
    margin-right: 8px;
  }

  .searchText {
    display: block;
    height: 100%;
    width: 90%;
    min-height: 0;
    min-width: 0;
  }

  .searchTextInput {
    all: unset;
    height: 100%;
    width: 100%;
    vertical-align: middle;
    font-size: 16px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;

  .infoIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 48px;
    padding: 4px;
  }
  .icon {
    display: block;
    height: 24px;
  }
`;
