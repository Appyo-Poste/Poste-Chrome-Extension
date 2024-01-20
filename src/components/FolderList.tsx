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

type Checked = DropdownMenuCheckboxItemProps['checked'];

export interface Folder {
  title: string;
  id: string;
}

interface FolderListProps {
  folders: Array<Folder>;
}

const FolderList = ({ folders }: FolderListProps) => {
  // @TODO update this state hook
  const [selectedFolderId, setSelectedFolderId] = React.useState<string>('2');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Associated Folder</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Folder for Post</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {folders.map(({ id, title }: Folder) => (
          <DropdownMenuCheckboxItem
            checked={selectedFolderId === id}
            onCheckedChange={() => setSelectedFolderId(id)}
            key={id}
          >
            {title}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderList;
