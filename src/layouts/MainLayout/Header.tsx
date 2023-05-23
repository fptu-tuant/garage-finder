import { twcx } from '@/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return <header className={twcx(className)}>Header</header>;
}
