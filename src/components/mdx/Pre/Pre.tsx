import { DetailedHTMLProps, HTMLAttributes, useRef } from 'react';

import { ProgrammingLanguageIcon } from '@/components/ProgrammingLanguageIcon/ProgrammingLanguageIcon';
import { useClipboard } from '@/hooks';
import { CopyIcon } from '@/icons';
import { twcx } from '@/utils';

type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  fileName?: string;
  language?: string;
};

export function Pre({
  children,
  className,
  fileName,
  language,
  ...rest
}: PreProps) {
  const codeRef = useRef<HTMLPreElement>(null);

  const clipboard = useClipboard();

  const handleCopy = async () => {
    const content = codeRef.current?.innerText || '';
    clipboard.copy(content);
  };

  return (
    <div className="rounded-md mb-5 bg-slate-800 overflow-hidden shadow-xl not-prose">
      <div className="bg-slate-900/50 px-3 text-sm pt-2 h-11 flex">
        {fileName && (
          <div
            className={twcx(
              'inline-flex px-3 py-2 bg-slate-800 rounded-t-lg items-center gap-2'
            )}
          >
            <ProgrammingLanguageIcon lang={language} />
            <span>{fileName}</span>
          </div>
        )}
        <div className="grow flex justify-end items-center">
          <button className="relative" onClick={handleCopy}>
            <span
              className={twcx(
                'absolute rounded-full right-full bg-violet-200 px-2 py-1 top-1/2 -translate-y-1/2 transition-all text-purple-600 font-bold text-sm',
                clipboard.copied ? 'visible -translate-x-2' : 'invisible'
              )}
            >
              copied
            </span>
            <CopyIcon className="cursor-pointer text-lg" />
          </button>
        </div>
      </div>
      <pre
        ref={codeRef}
        className={twcx('py-4 overflow-auto', className)}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}
