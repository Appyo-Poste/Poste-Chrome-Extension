import React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

type Checked = DropdownMenuCheckboxItemProps['checked'];

interface Folder {
  name: string;
  id: string;
}

interface FolderListProps {
  folders: Array<Folder>;
}

const FolderList = ({ folders }: FolderListProps) => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Associated Folder</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Folder for Post</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {folders.map(({ id, name }: Folder) => {
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
            key={id}
          >
            {name}
          </DropdownMenuCheckboxItem>;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderList;
