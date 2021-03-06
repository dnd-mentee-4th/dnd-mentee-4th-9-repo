import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Section, {SIDE} from '../Section';
import SubHead from '../../styles/SubHead';
import TagList, {BUTTON} from '../TagList';
import Button from '../../styles/Button';
import Slider from '../Slider';

import {getTagPlants} from '../../api/plantsAPI';
import {isEmptyStr, getQsTag} from '../../lib/handler';
import {getReactiveSize} from '../../lib/calculate';

const margin = getReactiveSize(16);

/*
tag: {
  id: number;
  name: string;
  type: string;
}
*/

/*
plandId: number
name: string
keywords: tag[]
*/
function AllKeywords({plantId, name = '', keywords = []}) {
  const {plants, selected, onKeywordClick} = useKeywordPlants(plantId);
  const history = useHistory();

  const event = {
    type: 'search',
    func: onKeywordClick,
  };

  const allKeywordsSearch = () => {
    window.scrollTo({
      top: 0,
    });
    history.push({
      pathname: '/plants',
      search: `?tag=${getQsTag(selected)}`,
    });
  };

  return (
    <Section width="lg" margin={80} order={SIDE}>
      <KeywordsHead>{`${name} #키워드`}</KeywordsHead>

      <TagsWrapper>
        <TagList plantId={plantId} tagData={keywords} type={BUTTON} selected={[selected]} event={event} />
      </TagsWrapper>

      <SliderWrapper>{!isEmptyStr(selected) && <Slider plants={plants} />}</SliderWrapper>

      <BtnWrapper>
        {isEmptyStr(selected) ? (
          <Button iconSize={36} borderColor="lightGreen" color="lightGreen">
            <img src={`${process.env.PUBLIC_URL}/images/search.svg`} alt="search" />
            다른 키워드로 검색
          </Button>
        ) : (
          <Button onClick={allKeywordsSearch} bgColor="lightGreen" borderColor="lightGreen" color="white" className="selected">
            <span>선택한 키워드 전체보기</span>
            <img src={`${process.env.PUBLIC_URL}/images/search_arrow.svg`} alt="search arrow" />
          </Button>
        )}
      </BtnWrapper>
    </Section>
  );
}

function useKeywordPlants(plantId) {
  const [plantsInfo, setInfo] = useState({
    plants: [],
    selected: '',
  });

  const {plants, selected} = plantsInfo;

  const onKeywordClick = async (current) => {
    const resPlants = await getTagPlants({tags: current});

    setInfo((prevInfo) => ({
      ...prevInfo,
      plants: selected === current ? [] : resPlants,
      selected: selected === current ? '' : current,
    }));
  };

  useEffect(() => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      selected: '',
    }));
  }, [plantId]);

  return {plants, selected, onKeywordClick};
}

const KeywordsHead = styled(SubHead)`
  color: ${({theme}) => theme.colors.darkgGray};
`;

const TagsWrapper = styled.div`
  margin: 50px 0;
  @media ${({theme}) => theme.devices.md} {
    margin: 15px 0;
  }
`;

const SliderWrapper = styled.div`
  margin: 50px 0 20px 0;

  @media ${({theme}) => theme.devices.md} {
    margin: 15px 0 25px 0;
    .card-wrapper {
      margin-bottom: 0 !important;
    }
  }
`;

const BtnWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;

  @media ${({theme}) => theme.devices.md} {
    margin-bottom: 0;
  }

  .selected {
    img {
      position: relative;
      top: 2.5px;
      margin: 0 0 0 ${margin.lg}px;
      width: 15px;

      @media ${({theme}) => theme.devices.md} {
        top: 1.3px;
        margin: 0 0 0 ${margin.md}px;
        transform: scale(0.5);
      }
    }
  }
`;

export default AllKeywords;
