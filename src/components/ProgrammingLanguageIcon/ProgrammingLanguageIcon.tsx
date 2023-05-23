import { TypescriptReactIcon } from '@/icons';

type ProgrammingLanguageIconProps = {
  lang?: 'tsx' | 'html' | 'css' | string;
};

export function ProgrammingLanguageIcon({
  lang,
}: ProgrammingLanguageIconProps) {
  switch (lang) {
    case 'tsx':
      return <TypescriptReactIcon />;

    default:
      return null;
  }
}
