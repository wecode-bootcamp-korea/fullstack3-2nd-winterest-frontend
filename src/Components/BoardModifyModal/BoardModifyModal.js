import styled from 'styled-components';

function BoardModifyModal() {
  return (
    <FullBoardContainer>
      <Title>보드 수정</Title>
      <BoardName>이름</BoardName>
      <BoardWrapper>
        <div className="Board">
          <div className="BoardDetail">
            <div className="BoardText">
              <input
                className="BoardTextInput"
                type="text"
                placeholder="보드명"
              ></input>
            </div>
          </div>
        </div>
      </BoardWrapper>
      <DeleteContainer>
        <h3>작업</h3>
        <h1>보드 삭제</h1>
        <div>
          <h4>이 보드와 모든 핀을 영구적으로 삭제합니다.</h4>
          <h4>이 작업은 취소할 수 없습니다!</h4>
          <button type="button">완료</button>
        </div>
      </DeleteContainer>
    </FullBoardContainer>
  );
}

const FullBoardContainer = styled.div`
  padding-bottom: 80px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: -30px;
  font-weight: 700;
  font-size: 30px;
`;
const BoardName = styled.div`
  color: black;
  font-size: 20px;
  margin-left: 8%;
  margin-bottom: 3%;
`;

const BoardWrapper = styled.div`
  display: flex;
  padding: 0 8px 0 20px;
  flex-grow: 1;
  .Board {
    display: flex;
    align-items: center;
    height: 48px;
    flex-grow: 1;
    border-radius: 24px;
    background-color: #efefef;
  }

  .BoardDetail {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 0;
    min-width: 0;
    padding: 0 0 0 16px;
  }

  .BoardText {
    display: block;
    height: 100%;
    width: 90%;
    min-height: 0;
    min-width: 0;
  }

  .BoardTextInput {
    all: unset;
    height: 100%;
    width: 100%;
    vertical-align: middle;
    font-size: 16px;
  }
`;

const DeleteContainer = styled.div`
  margin-top: 3%;
  margin-left: 8%;

  h3 {
    margin-bottom: 3%;
  }
  h1 {
    font-weight: 700;
    font-size: 25px;
  }
  div {
    margin-top: 3%;
    color: red;
  }
  button {
    float: right;
    margin-right: 5%;
    font-size: 17px;
    border-radius: 24px;
    background-color: red;
    color: white;
    padding: 12px 16px;
  }
`;

export default BoardModifyModal;
