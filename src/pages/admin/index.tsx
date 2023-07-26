import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AdminDashBoardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/users');
  }, [router]);

  return null;
}
