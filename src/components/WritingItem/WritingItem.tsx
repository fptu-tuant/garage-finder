import dayjs from 'dayjs';
import Link from 'next/link';

import { ArrowRightIcon, CalendarIcon } from '@/icons';
import { twcx } from '@/utils';

import { Tag } from '../Tag/Tag';

type WritingItemProps = {
  date: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
};

export function WritingItem({
  date,
  description,
  slug,
  title,
  tags,
}: WritingItemProps) {
  const dateStr = dayjs(date).format('MMMM DD, YYYY');

  return (
    <div className="flex">
      <div className="text-sm font-semibold p-4 hidden md:block">
        <span className="h-7 flex items-center">{dateStr}</span>
      </div>
      <div className="mx-8 flex items-stretch w-px bg-slate-600 relative">
        <div className="absolute w-3 h-3 border-2 rounded-full left-1/2 -translate-x-1/2 top-6 bg-slate-900 border-slate-400" />
      </div>
      <Link
        className="grow hover:bg-slate-800/50 p-4 rounded-xl mb-4"
        href={`/writings/${slug}`}
      >
        <h2 className="h-7 flex items-center font-bold mb-2 line-clamp-1">
          {title}
        </h2>
        <p className="line-clamp-2 text-slate-400">{description}</p>
        <div className="mt-2 gap-1">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="text-sm mt-5 flex gap-1 items-center md:hidden text-slate-400">
          <CalendarIcon />
          <span>{dateStr}</span>
        </div>
        <button
          className={twcx(
            'mt-4 text-sm font-semibold flex gap-2 items-center',
            'dark:text-sky-500'
          )}
        >
          Read more <ArrowRightIcon className="translate-y-0.5" />
        </button>
      </Link>
    </div>
  );
}
