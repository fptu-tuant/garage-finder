import Link from 'next/link';

import { twcx } from '@/utils';

import { Tag } from '../Tag/Tag';

type SnippetItemProps = {
  title: string;
  description?: string;
  tags: string[];
  slug: string;
  className?: string;
};

export function SnippetItem({
  title,
  slug,
  description,
  tags,
  className = '',
}: SnippetItemProps) {
  return (
    <Link
      href={`/snippets/${slug}`}
      className={twcx(
        'flex bg-slate-800 rounded-md px-6 py-4 gap-2 transition',
        'hover:scale-105',
        className
      )}
    >
      <div className="grow">
        <h2 className="font-semibold line-clamp-1">{title}</h2>
        <p className="line-clamp-2 text-slate-400 text-sm">{description}</p>
      </div>
      <div className="flex gap-1">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
