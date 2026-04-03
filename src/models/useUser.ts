import { postUsersLogout } from '@/services/rhilex/yonghuguanli';
import { LOGIN_PATH } from '@/utils/constant';
import { useRequest } from 'ahooks';
import { useAppStore } from '@/store';
import { useSystemStore } from '@/store';

const useUser = () => {
  const setInitialState = useAppStore((s) => s.setInitialState);
  const resetState = useAppStore((s) => s.resetState);
  const systemCancel = useSystemStore((s) => s.systemCancel);

  // 退出登录
  const { run: logout } = useRequest(() => postUsersLogout(), {
    manual: true,
    onSuccess: () => {
      resetState();
      localStorage.clear();
      window.location.href = LOGIN_PATH;
      systemCancel();
    },
  });

  return {
    logout,
  };
};

export default useUser;
