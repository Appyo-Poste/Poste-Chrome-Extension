import React, { useState } from 'react';
import { PlusCircledIcon } from '@radix-ui/react-icons';

interface TagProps {
  onClick?: () => void;
  text: string;
}

const createTagStyle = {
  backgroundColor: '#F0F0F0',
  border: 'none',
  borderRadius: '20px',
  padding: '5px 10px',
  fontSize: '12px',
  color: '#747474',
  cursor: 'pointer',
  outline: 'none',
  width: 'fit-contents',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '4px',
  marginTop: '4px',
};

const displayTagStyle = {
  backgroundColor: 'rgba(53, 116, 151, 0.2)',
  border: '2px solid #357497',
  borderRadius: '20px',
  padding: '5px 10px',
  fontSize: '12px',
  color: '#222222',
  cursor: 'default',
  outline: 'none',
  width: 'fit-contents',
  minWidth: '100px',
  textAlign: 'center',
  marginLeft: '4px',
  marginTop: '4px',
};

export const CreateTag = ({
  onCreate,
}: {
  onCreate: (tag: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      onCreate(inputValue);
      setInputValue('');
    }
  };

  return (
    <div style={{ ...createTagStyle }}>
      <PlusCircledIcon style={{ marginRight: '2px', color: 'inherit' }} />
      <input
        type="text"
        placeholder="add tags..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ border: 'none', outline: 'none', backgroundColor: 'inherit' }}
      />
    </div>
  );
};

interface DisplayTagProps {
  text: string;
}

export const DisplayTag = ({ text }: DisplayTagProps) => {
  return <div style={{ ...displayTagStyle }}>{text}</div>;
};
