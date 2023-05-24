import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';

export default function TestPage() {
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (token) => {
      console.log(token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <Button onClick={() => loginWithGoogle()}>Login By Google</Button>
    </div>
  );
}
