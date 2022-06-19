import { useState } from "react";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import theme from "styles/Theme";
import Button from "components/Button";

const ReviewForm = () => {
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

  return (
    <>
      <HeaderContainer align="center" justify="center">
        <Title>랜드마크를 평가해주세요!</Title>
        <Required>필수</Required>
      </HeaderContainer>

      <StarContainer>
        {[1, 2, 3, 4, 5].map((el) => (
          <BsStarFill
            color={
              (clicked >= el) | (hovered >= el)
                ? theme.colors.secondary
                : theme.colors.gray02
            }
            key={el}
            size={theme.fontSizes.titleSize}
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setClicked(el)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </StarContainer>
      <div style={{ position: "relative" }}>
        {[1, 2, 3, 4, 5].map((num) => (
          <HiddenText key={num} show={hovered === num}>
            {textList[num - 1]}
          </HiddenText>
        ))}
      </div>

      <HeaderContainer align="center">
        <Title>다른 여행객을 위한 후기와 팁</Title>
        <Required>필수</Required>
      </HeaderContainer>
      <div>
        <textarea style={{ width: "100%", height: "300px", margin: "1% 0" }} />
      </div>
      <BtnPosition>
        <Button color="secondary">리뷰 등록</Button>
      </BtnPosition>
    </>
  );
};

const textList = [
  "별로예요",
  "그저 그래요",
  "보통이에요",
  "좋아요",
  "최고예요",
];

const StarContainer = styled.div`
  text-align: center;
  border: none;
  padding: 3% 1%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-top: 10%;
`;

const Title = styled.div`
  font-size: ${theme.fontSizes.xxxl};
  font-weight: bold;
  margin-right: 0.5%;
`;

const Required = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.secondary};
  font-weight: bold;
`;

const BtnPosition = styled.div`
  width: 100%;
  padding-left: 93%;
`;

const HiddenText = styled.p`
  position: absolute;
  top: 10px;
  left: 50%;
  text-align: center;
  width: 130px;
  height: 30px;
  transform: translate(-50%, -50%);
  color: ${theme.colors.gray03};
  font-size: ${theme.fontSizes.lg};
  ${({ show }) => (show ? `display:block` : `display: none`)}
`;

export default ReviewForm;