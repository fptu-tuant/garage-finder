import { FC, SVGProps } from 'react';

declare module '*.svg' {
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}
