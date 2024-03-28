import React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import { formControlStyles } from './CreatePostForm';
import { useNavigate } from 'react-router-dom';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export interface Folder {
  title: string;
  id: string;
}

interface FolderListProps {
  folders: Array<Folder>;
}

const FolderList = ({ folders }: FolderListProps) => {
  const navigate = useNavigate();

  const [selectedFolderId, setSelectedFolderId] = React.useState<
    string | undefined
  >(undefined);
  return (
    <div style={{ width: '100%' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            style={{
              ...formControlStyles,
              marginTop: '8px',
              width: '100%',
              textAlign: 'left',
              justifyContent: 'left',
            }}
          >
            {selectedFolderId === undefined
              ? 'Move file to...'
              : folders[folders.findIndex((f) => f.id === selectedFolderId)]
                  .title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          style={{
            border: '1px solid #F0F0F0',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#747474',
          }}
        >
          {folders.length > 0 && (
            <DropdownMenuLabel>Select Folder</DropdownMenuLabel>
          )}
          {folders.length > 0 && <DropdownMenuSeparator />}
          {folders.map(({ id, title }: Folder) => (
            <DropdownMenuCheckboxItem
              checked={selectedFolderId === id}
              onCheckedChange={() => setSelectedFolderId(id)}
              key={id}
            >
              {title}
            </DropdownMenuCheckboxItem>
          ))}
          {folders.length > 0 && <DropdownMenuSeparator />}
          <DropdownMenuLabel
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/folder')}
          >
            Create Folder
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FolderList;
