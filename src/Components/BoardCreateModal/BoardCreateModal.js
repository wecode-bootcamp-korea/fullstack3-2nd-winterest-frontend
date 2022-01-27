import styled from 'styled-components';

function BoardCreateModal() {
  return (
    <FullBoardContainer>
      <Title>보드 생성</Title>
      <BoardName>이름</BoardName>
      <BoardWrapper>
        <div className="Board">
          <div className="BoardDetail">
            <div className="BoardText">
              <input
                className="BoardTextInput"
                type="text"
                placeholder="보드명"
                // onChange={handleTagInput}
                // onKeyPress={handleEnter}
              ></input>
            </div>
          </div>
        </div>
      </BoardWrapper>

      <CreateContainer>
        <div>
          <button type="button">생성</button>
        </div>
      </CreateContainer>
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

const CreateContainer = styled.div`
  margin-top: 3%;
  margin-left: 8%;

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

export default BoardCreateModal;
