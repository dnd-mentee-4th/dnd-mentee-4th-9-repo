/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Section, {NAV} from '../Section';
import {useLocation, Link} from 'react-router-dom';
import theme from '../../styles/theme';

const menuList = [{name: '테스트', path: '/test-start'}, {name: '식물도감', path: '/plants'}, {name: '정기구독'}];

const opacityPath = ['/', '/test-start'];

function Nav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery(theme.devices.md);

  const toggleMenuList = () => setIsOpen(!isOpen);
  const closeMenuList = () => setIsOpen(false);
  const disableMenu = (path) => {
    !path && alert('정기 구독 서비스는 추후 제공될 예정입니다.');
  };
  const getBgColor = () => {
    if (opacityPath.includes(location.pathname)) {
      return 'rgba(100, 204, 128, 0.3)';
    } else if (location.pathname === '/test') {
      return 'rgba(17, 17, 17, 0.3)';
    } else {
      return 'lightGreen';
    }
  };
  const bgColor = getBgColor();

  return (
    <>
      <Section width="lg" bgColor={bgColor} type={NAV}>
        <LeftWrapper to="/">
          <LogoImage src={`${process.env.PUBLIC_URL}/images/logo_nav.svg`} alt="See-at logo" />
        </LeftWrapper>
        <RightWrapper>
          {!matches && (
            <MenuWrapper isOpen={isOpen}>
              {menuList.map(({name, path}) => (
                <MenuList isOpen={isOpen} key={name}>
                  <Menu to={path} onClick={() => disableMenu(path)} $isCurrentMenu={path === location.pathname}>
                    {name}
                  </Menu>
                </MenuList>
              ))}
            </MenuWrapper>
          )}
          <MenuBar onClick={toggleMenuList} imgUrl={`${process.env.PUBLIC_URL}/images/hamburger${isOpen ? '_green' : ''}.svg`} />
        </RightWrapper>
      </Section>
      {matches && (
        <MenuWrapper isOpen={isOpen}>
          {menuList.map(({name, path}) => (
            <MenuList isOpen={isOpen} key={name} onClick={closeMenuList}>
              <Menu to={path} onClick={() => disableMenu(path)} $isCurrentMenu={path === location.pathname}>
                {name}
              </Menu>
            </MenuList>
          ))}
          <MenuBar onClick={closeMenuList} imgUrl={`${process.env.PUBLIC_URL}/images/close_btn.svg`} />
        </MenuWrapper>
      )}
    </>
  );
}

const LeftWrapper = styled(Link)`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const LogoImage = styled.img`
  width: 77px;
  height: 15px;
  color: ${({theme}) => theme.colors.white};
  display: flex;
  align-items: center;
`;

const RightWrapper = styled.ul`
  display: flex;
  align-items: center;
  @media ${({theme}) => theme.devices.md} {
    ${({isOpen}) => {
      if (!isOpen) return;
      return css`
        position: absolute;
      `;
    }}
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1000;
  @media ${({theme}) => theme.devices.md} {
    ${({isOpen}) => {
      if (!isOpen) {
        return css`
          display: none;
        `;
      }
      return css`
        flex-direction: column;
        width: 120px;
        height: 100%;
        position: fixed;
        right: 0;
        background-color: rgba(255, 255, 255, 0.9);
        box-shadow: -10px 0px 30px 0px rgba(0, 0, 0, 0.05);
        padding-top: 56px;
        ${MenuBar} {
          position: absolute;
          bottom: 23.5px;
          right: 19.5px;
        }
      `;
    }}
  }
`;

const MenuList = styled.li`
  margin-left: 99px;
  &:hover {
    cursor: pointer;
  }

  @media ${({theme}) => theme.devices.md} {
    display: none;
    ${({isOpen}) => {
      if (!isOpen) return;
      return css`
        display: flex;
        justify-content: flex-end;
        padding: 6.5px 20px;
        margin: 0;
        line-height: 36px;
        :first-child {
          padding-top: 10px;
        }
      `;
    }}
  }
`;

const Menu = styled(Link)`
  font-weight: ${({$isCurrentMenu}) => ($isCurrentMenu ? 900 : 500)};
  font-size: 16px;
  line-height: 24px;
  color: ${({theme}) => theme.colors.white};

  @media ${({theme}) => theme.devices.md} {
    color: ${({theme}) => theme.colors.green};
  }
`;

const MenuBar = styled.a`
  display: none;
  &:before {
    content: url(${({imgUrl}) => imgUrl});
  }

  @media ${({theme}) => theme.devices.md} {
    display: block;
    z-index: 2000;
  }
`;

export default Nav;
