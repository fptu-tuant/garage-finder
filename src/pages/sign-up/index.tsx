import { Button, Divider, Typography } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

import {
  CarIllustrate,
  CarOwnerSignUpForm,
  GarageOwnerSignUpForm,
} from '@/components';

export default function SignUpPage() {
  const [signUpFor, setSignUpFor] = useState<
    'car-owner' | 'garage-owner' | 'not-select-yet'
  >('not-select-yet');

  return (
    <div className="flex mt-20">
      <div className="relative w-3/5 min-h-[500px]">
        <CarIllustrate />
      </div>
      <div className="w-2/5 px-5 flex flex-col items-center justify-center">
        {signUpFor === 'not-select-yet' && (
          <div className="flex flex-col max-w-md w-full gap-4">
            <Button
              type="primary"
              className="rounded-full shadow-md"
              size="large"
              onClick={() => setSignUpFor('car-owner')}
            >
              Đăng kí tài khoản chủ xe
            </Button>
            <Divider>hoặc</Divider>
            <Button
              type="primary"
              className="rounded-full shadow-md bg-red-400"
              size="large"
              onClick={() => setSignUpFor('garage-owner')}
            >
              Đăng kí tài khoản Garage
            </Button>
          </div>
        )}

        {signUpFor === 'car-owner' && <CarOwnerSignUpForm />}
        {signUpFor === 'garage-owner' && <GarageOwnerSignUpForm />}

        {signUpFor !== 'not-select-yet' && (
          <Typography className="text-center">
            <span>Bạn đã có tài khoản? </span>{' '}
            <Link href="/sign-in" className="text-primary font-semibold">
              Đăng nhập
            </Link>
          </Typography>
        )}
      </div>
    </div>
  );
}
