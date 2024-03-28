import React, { useCallback } from 'react';
import { CreateTag, DisplayTag } from './Tag';

interface TagsListProps {
  tags: string;
  setTags: (tags: string) => void;
}

const TagsList = ({ tags, setTags }: TagsListProps) => {
  const transformTags = useCallback(
    (newTag: string) => {
      if (tags.length > 0) {
        setTags(`${tags}, ${newTag}`);
      } else {
        setTags(newTag);
      }
    },
    [tags, setTags]
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        marginLeft: '-8px',
      }}
    >
      <CreateTag onCreate={transformTags} />
      {tags.length > 0 &&
        tags
          .split(',')
          .map((tag) => tag.trim())
          .map((tag) => {
            return <DisplayTag text={tag} />;
          })}
    </div>
  );
};

export default TagsList;
