import { twcx } from '@/utils';

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return <footer className={twcx(className)}>Footer</footer>;
}
