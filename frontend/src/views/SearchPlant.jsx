import React, {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Section, {SECTION} from '../components/Section';
import FilteringTags from '../components/SearchPlants/FilteringTags';
import ColorTags from '../components/SearchPlants/ColorTags';
import PlantList from '../components/SearchPlants/PlantList';
import Nothing from '../components/Nothing';
import TestMain from '../components/TestMain';
import Footer from '../components/Footer/Footer';

import {getAllTags} from '../api/plantsAPI';
import {EMPTY, isEmptyArr, isEmptyStr, qsParse, formatTag} from '../lib/handler';
import {useKeywordInfo} from '../lib/hooks';

const SPACE = ' ';

const SearchPlant = ({location: {search}}) => {
  const [keywordInfo, inputKeyword, searchKeyword] = useKeywordInfo();
  const tagData = useTagData([]);

  const middle = tagData.length / 2;
  const [leftTags, rightTags] = [tagData.slice(0, middle), tagData.slice(middle)];
  const qsTag = qsParse(search).tag;
  const tagArr = isEmptyStr(qsTag) ? [] : qsTag.split(SPACE);
  const selectedTag = isEmptyArr(tagArr) ? tagArr : tagArr.filter((tag) => tag !== EMPTY);

  const [isSearch, setIsSearch] = useState(false);

  const setSearching = () => setIsSearch(true);
  const setNotSearching = () => setIsSearch(false);

  if (!tagData) return null;

  return (
    <Wrapper>
      <Section width="lg" bgColor="lightGreen">
        <SearchInput>
          <img src={`${process.env.PUBLIC_URL}/images/search-black.svg`} alt="search-plant" />
          <input type="text" placeholder="어떤 식물 친구를 찾으시나요?" value={keywordInfo.keyword} onFocus={setSearching} onBlur={setNotSearching} onChange={inputKeyword} onKeyDown={searchKeyword} />
        </SearchInput>
      </Section>

      {/* tag only start */}
      {!keywordInfo.keyword && (
        <>
          <Section width="lg">
            <ChooseHeader>
              <img src={`${process.env.PUBLIC_URL}/images/filter.svg`} alt="choose keyword" />
              <h1>선호하는 키워드를 선택해보세요</h1>
              {!isEmptyArr(selectedTag) && (
                <DelAllTags to="/plants">
                  <img src={`${process.env.PUBLIC_URL}/images/cancle.svg`} alt="delete all tags" />
                  모두해제
                </DelAllTags>
              )}
            </ChooseHeader>
          </Section>
          <FilteringTags leftTags={leftTags} rightTags={rightTags} selectedTag={selectedTag} search={search} />
          <ColorTags tags={selectedTag} />
        </>
      )}
      <PlantList filterTag={selectedTag} isSearch={keywordInfo.keyword && isSearch} />

      <Nothing />
      <Section bgColor="green" margin={200}>
        <TestMain type={SECTION} />
      </Section>

      <Footer />
    </Wrapper>
  );
};

const useTagData = (initData) => {
  const [tagData, setTagData] = useState(initData);
  const getTags = useCallback(async () => {
    const data = await getAllTags();
    setTagData(formatTag(data));
  }, []);

  useEffect(() => {
    getTags();
  }, [getTags]);

  return tagData;
};

// const useIsSearch = (initData) => {
//   const [isSearch, setIsSearch] = useState(initData);

//   const isSearching = () => setIsSearch(true);
//   const isNotSearching = () => setIsSearch(false);

//   return [isSearch, ];
// }

const Wrapper = styled.div`
  margin-top: 0;
`;

const SearchInput = styled.div`
  position: relative;
  margin-top: 56px;
  margin-bottom: 20px;
  height: 80px;
  img {
    position: absolute;
    top: 28px;
    left: 38px;
  }
  input {
    border-radius: 20px;
    border: none;
    height: 80px;
    width: 100%;
    padding: 22px 38px 22px 76px;
    color: ${({theme}) => theme.colors.gray};
    font-family: 'Iropke Batang', Batang, Serif;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.05em;
    :focus {
      outline: none;
    }
  }

  @media ${({theme}) => theme.devices.md} {
    height: 40px;

    img {
      transform: scale(0.54);
      top: 9px;
      left: 12px;
    }
    input {
      border-radius: 5px;
      height: 40px;
      width: 100%;
      padding: 11px 19px 11px 36px;
      font-size: 14px;
      line-height: 18.2px;
    }
  }
`;

const ChooseHeader = styled.header`
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;

  img {
    position: absolute;
    margin-right: 34px;
  }
  h1 {
    font-family: 'Iropke Batang', Batang, Serif;
    font-size: 24px;
    line-height: 46px;
    letter-spacing: -0.05em;
    color: ${({theme}) => theme.colors.green};
    padding-left: 34px;
  }

  @media ${({theme}) => theme.devices.md} {
    height: 50px;

    img {
      transform: scale(0.54);
      margin-right: 5px;
    }
    h1 {
      font-size: 14px;
      line-height: 21px;
      padding-left: 18px;
    }
  }
`;

const DelAllTags = styled(Link)`
  position: absolute;
  right: 0;
  font-size: 24px;
  color: ${({theme}) => theme.colors.lightBlack};

  display: flex;
  align-items: center;

  img {
    position: static !important;
    margin-right: 14px !important;
  }

  @media ${({theme}) => theme.devices.md} {
    font-size: 14px;

    img {
      transform: scale(0.5);
      margin-right: 4.6px !important;
    }
  }
`;

export default SearchPlant;
