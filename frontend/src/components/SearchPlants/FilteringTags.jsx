import React from 'react';
import styled from 'styled-components';
import Section from '../Section';
import TagList, {ADD_FILTER} from '../TagList';
import {isEmptyArr} from '../../lib/handler';

/*
leftTags, rightTags:
[
  {
    id: number;
    type: string;
    name: string; (required)
  }
]
selectedTag: string[];
search: string;
*/
function FilteringTags({leftTags, rightTags, selectedTag, search}) {
  return (
    <Section width="lg" bgColor="lightGray">
      <KeywordGroup height={isEmptyArr(leftTags) ? '404px' : 'auto'}>
        <div>
          {leftTags.map(({type, tags}) => (
            <KeywordField key={type}>
              <h2>{type}</h2>
              <TagList tagData={tags} selected={selectedTag} event={{type: ADD_FILTER}} query={search} />
            </KeywordField>
          ))}
        </div>
        <div className="right-tags">
          {rightTags.map(({type, tags}) => (
            <KeywordField key={type}>
              <h2>{type}</h2>
              <TagList tagData={tags} selected={selectedTag} event={{type: ADD_FILTER}} query={search} />
            </KeywordField>
          ))}
        </div>
      </KeywordGroup>
    </Section>
  );
}

FilteringTags.defaultProps = {
  leftTags: [],
  rightTags: [],
  selectedTag: [],
  search: '',
};

const KeywordGroup = styled.fieldset`
  height: ${({height}) => height};
  padding: 40px 0 22px 0;
  display: flex;

  & > div {
    flex: 1;
  }

  @media ${({theme}) => theme.devices.lg} {
    flex-direction: column;
  }

  @media ${({theme}) => theme.devices.md} {
    padding: 20px 0 10px 0;
  }
`;

const KeywordField = styled.div`
  min-height: 88px;
  height: max-content;

  display: flex;
  flex-direction: row;
  align-items: baseline;

  h2 {
    width: 127px;
    font-size: 28px;
    line-height: 42px;
    letter-spacing: -0.05em;
    color: ${({theme}) => theme.colors.darkGray};
  }

  @media ${({theme}) => theme.devices.md} {
    min-height: 31.5px;

    h2 {
      width: 65px;
      font-size: 14px;
      line-height: 21px;
    }

    @media (max-width: 359px) {
      flex-direction: column;

      h2 {
        margin-bottom: 5px;
      }
    }
  }
`;

export default FilteringTags;
