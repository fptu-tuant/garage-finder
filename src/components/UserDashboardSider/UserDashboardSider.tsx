import { Menu } from 'antd';
import { useRouter } from 'next/router';

import { MENU_ITEMS } from '@/constants';

export function UserDashboardSider() {
  const router = useRouter();

  return <Menu selectedKeys={[router.pathname]} items={MENU_ITEMS} />;
}
