import styled from 'styled-components';

function NavBarHome() {
  const onClick = () => {
    alert('Someday, coming soon.');
  };

  return (
    <NavContainer>
      <LogoWrapper>
        <Icon alt="logo" src="favicon.png" />
        <Title>Winterest</Title>
      </LogoWrapper>
      <NavWrapper>
        <InfoWrapper>
          <div onClick={onClick}>About</div>
          <div onClick={onClick}>Business</div>
          <div onClick={onClick}>Blog</div>
        </InfoWrapper>
        <ButtonWrapper>
          <button className="login">Log in</button>
        </ButtonWrapper>
        <ButtonWrapper>
          <button className="signup">Sign up</button>
        </ButtonWrapper>
      </NavWrapper>
    </NavContainer>
  );
}

export default NavBarHome;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: ${props => props.theme.background};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  margin-left: 20px;
  width: 32px;
`;

const Title = styled.span`
  margin-left: 5px;
  font-weight: 700;
  font-size: 21px;
  color: #0b66e6;
`;

const NavWrapper = styled.div`
  display: flex;
  margin-right: 24px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  font-size: 16px;
  font-weight: 700;

  div {
    margin: 16px;
    padding-top: 5px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin: 8px;

  button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 54px;
    height: 17px;
    padding: 13px 12px 8px 12px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .login {
    background-color: #0b66e6;
    color: white;
    transition-property: background-color;
    transition-duration: 85ms;
    transition-timing-function: ease-out;
    transition-delay: 0s;

    &:hover {
      background-color: #05326e;
    }
  }

  .signup {
    background-color: #e2e2e2;
    color: black;
    transition-property: background-color;
    transition-duration: 85ms;
    transition-timing-function: ease-out;
    transition-delay: 0s;

    &:hover {
      background-color: #bdbdbd;
    }
  }
`;
