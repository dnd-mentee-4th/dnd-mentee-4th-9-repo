import React from 'react';
import styled from 'styled-components';
import FooterItem from '../../styles/FooterItem';

function Corp() {
  return (
    <Wrapper marginRight={100}>
      <LogoWrapper className="item-corp">
        <span className="logo">
          <img src="/images/logo_footer.png" alt="See-at logo" />
        </span>
        <h3>See-at</h3>
      </LogoWrapper>
      <p>© 2021. SeeAt Corp. all right reserved.</p>
    </Wrapper>
  );
}

const Wrapper = styled(FooterItem)`
  p {
    font-size: 12px;
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 16px;
  height: 21px;
  display: flex;

  span {
    margin-right: 6px;
    width: 21px;
  }

  h3 {
    font-family: 'Fredoka One', cursive;
    font-size: 21px;
    color: ${({theme}) => theme.colors.lightGreen} !important;
  }

  @media ${({theme}) => theme.devices.footer} {
    margin-bottom: 6px !important;
  }
`;

export default Corp;
