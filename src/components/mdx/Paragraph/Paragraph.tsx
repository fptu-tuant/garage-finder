import { DetailedHTMLProps, HTMLAttributes, isValidElement } from 'react';

import { twcx } from '@/utils';

export function Paragraph({
  children,
  className,
  ...rest
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  if (isValidElement(children)) {
    const { type } = children;

    if (typeof type === 'string')
      return (
        <p className={twcx(className, 'mb-5')} {...rest}>
          {children}
        </p>
      );

    if (type.name === 'NextImage') return children;
  }

  return (
    <p className={twcx(className, 'mb-5')} {...rest}>
      {children}
    </p>
  );
}
