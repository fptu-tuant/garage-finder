import { PropsWithChildren } from 'react';

import { twcx } from '@/utils';

type CodeBlockProps = PropsWithChildren<{
  className?: string;
}>;

export function CodeBlock({ children, className }: CodeBlockProps) {
  return <code className={twcx(className)}>{children}</code>;
}
