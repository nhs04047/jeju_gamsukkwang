import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.colors.black};

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  span {
    width: auto;
    font-size: 18px;
    margin-bottom: 10px;
  }

  span:last-child {
    background: linear-gradient(#fff 50%, rgba(255, 136, 29, 60%) 50%);
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    text-align: center;
    line-height: 150%;

    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 30px;
      line-height: 150%;
    }

    span {
      width: auto;
      font-size: 18px;
      margin-bottom: 10px;
      line-height: 150%;
    }

    span:last-child {
      background: linear-gradient(#fff 50%, rgba(255, 136, 29, 60%) 50%);
    }
  }
`;

const Button = styled.button`
  width: 442px;
  height: 48px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: 0.8s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const TextButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray03};
  span:last-child {
    margin-top: 10px;
    cursor: pointer;
  }
`;

export { HomeContainer, ContentsBox, Button, TextButtonBox };
