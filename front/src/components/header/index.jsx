import { NavLink } from "react-router-dom";

import Button from "components/Button";
import { NAV_LIST } from "./constants";

import { Logo } from "assets/svgs/index";
import { HeaderContainer, HeaderWrapper, Nav } from "./header.style";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo />
        <Nav>
          <ul>
            {NAV_LIST.map((data) => (
              <li key={`nav-link-${data.id}`}>
                <NavLink
                  to={`${data.path}`}
                  style={({ isActive }) => ({
                    textDecoration: isActive ? "underline" : "none",
                    textDecorationColor: isActive ? "#333" : "none",
                    textUnderlinePosition: isActive ? "under" : "none",
                  })}
                >
                  {data.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button>로그인</Button>
        </Nav>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
