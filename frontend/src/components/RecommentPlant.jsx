import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import TagList from './TagList';
import sizes from '../styles/recommentPlant';

/*
tag {
   id: number;
   name: string;
   type: string;
}
*/

/*
plant {
  thumbnailPath: string;
  name: string;
  description: string;
  Tags: tag[];
}
desk: string (recommentPlant/sizes)
mobile: string (recommentPlant/sizes)
*/
function RecommendPlant({plant, desk, mobile}) {
  const {id, thumbnailPath = '', name, description, Tags} = plant;

  return (
    <Link to={`/plants/detail/${id}`}>
      <Wrapper className="card-wrapper" desk={desk} mobile={mobile}>
        <Img imgUrl={thumbnailPath} />
        <TextWrapper desk={desk} mobile={mobile}>
          <Title desk={desk} mobile={mobile}>
            {name}
          </Title>
          <Description desk={desk} mobile={mobile}>
            {description}
          </Description>
          <TagList tagData={Tags} desk={sizes[desk].tagSize} mobile={sizes[mobile].tagSize} isSimple />
        </TextWrapper>
      </Wrapper>
    </Link>
  );
}

RecommendPlant.defaultProps = {
  desk: 'md',
  mobile: 'sm',
};

const Img = styled.img`
  content: url(${({imgUrl}) => imgUrl});
  border-radius: inherit;
  border-bottom-right-radius: 0 !important;
`;

const Wrapper = styled.div`
  display: inline-block;
  margin: ${({desk}) => `0 ${sizes[desk].margin}px ${sizes[desk].margin}px 0`};
  ${({desk}) => sizes[desk].mb && `margin-bottom: ${sizes[desk].mb}px`};
  height: ${({desk}) => sizes[desk].height}px;

  border-radius: 45px 45px 45px 0px;
  box-shadow: 0px 25px 35px 0px rgba(0, 0, 0, 0.04);

  ${Img} {
    border-radius: inherit;
    width: ${({desk}) => sizes[desk].width}px;
    height: ${({desk}) => sizes[desk].width}px;
  }

  @media ${({theme}) => theme.devices.md} {
    margin: ${({mobile}) => `0 ${sizes[mobile].margin}px ${sizes[mobile].margin}px 0`};
    ${({mobile}) => sizes[mobile].mb && `margin-bottom: ${sizes[mobile].mb}px`};
    height: ${({mobile}) => sizes[mobile].height}px;

    border-radius: 19.1px 19.1px 19.1px 0px;
    box-shadow: 0px 14px 25px 0px rgba(0, 0, 0, 0.05);

    ${Img} {
      width: ${({mobile}) => sizes[mobile].width}px;
      height: ${({mobile}) => sizes[mobile].width}px;
    }
  }
`;

const TextWrapper = styled.div`
  padding: ${({desk}) => sizes[desk].padding}px;

  @media ${({theme}) => theme.devices.md} {
    padding: ${({mobile}) => sizes[mobile].padding}px;
  }
`;

const Title = styled.h2`
  font-weight: ${({theme}) => theme.fontWeights.medium};
  font-size: ${({desk}) => sizes[desk].titleSize}px;
  line-height: ${({desk}) => sizes[desk].titleLineHeight}px;

  color: ${({theme}) => theme.colors.green};

  @media ${({theme}) => theme.devices.md} {
    font-size: ${({mobile}) => sizes[mobile].titleSize}px;
    line-height: ${({mobile}) => sizes[mobile].titleLineHeight}px;
  }
`;

const Description = styled.p`
  margin-bottom: ${({desk}) => sizes[desk].divSpace}px;

  font-weight: ${({theme}) => theme.fontWeights.regular};
  font-size: ${({desk}) => sizes[desk].descSize}px;
  line-height: ${({desk}) => sizes[desk].textLineHeight}px;

  color: ${({theme}) => theme.colors.gray};

  @media ${({theme}) => theme.devices.md} {
    margin-bottom: ${({mobile}) => sizes[mobile].divSpace}px;
    font-size: ${({mobile}) => sizes[mobile].descSize}px;
    line-height: ${({mobile}) => sizes[mobile].textLineHeight}px;
  }
`;

export default React.memo(RecommendPlant);
