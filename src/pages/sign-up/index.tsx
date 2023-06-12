import { Typography } from 'antd';
import Link from 'next/link';

import { CarIllustrate, SignUpForm } from '@/components';

export default function SignUpPage() {
  return (
    <div className="flex my-20">
      <div className="relative w-3/5 min-h-[500px]">
        <CarIllustrate />
      </div>
      <div className="w-2/5 px-5 flex flex-col items-center justify-center">
        <SignUpForm />
        <Typography className="text-center">
          <span>Bạn đã có tài khoản? </span>{' '}
          <Link href="/sign-in" className="text-primary font-semibold">
            Đăng nhập
          </Link>
        </Typography>
      </div>
    </div>
  );
}
