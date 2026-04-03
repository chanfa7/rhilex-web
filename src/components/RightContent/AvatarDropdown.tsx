import { useAppStore } from '@/store';
import { Spin } from 'antd';
import { useEffect } from 'react';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const currentUser = useAppStore((s) => s.currentUser);
  const initialState = useAppStore();

  useEffect(() => {
    if (!initialState || !currentUser || !currentUser.username) {
      localStorage.clear();
    }
  }, [initialState]);

  if (!initialState || !currentUser || !currentUser.username) {
    // loading
    return (
      <span className="flex items-center h-[56px] ml-auto px-[8px] cursor-pointer rounded-[2px] hover:bg-gray-900/6">
        <Spin size="small" className="mx-[8px]" />
      </span>
    );
  }

  return <HeaderDropdown />;
};

export default AvatarDropdown;
