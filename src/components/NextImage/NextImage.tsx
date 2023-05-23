import Image from 'next/image';

type NextImageProps = {
  src?: string;
  alt?: string;
};

export function NextImage({ src = '', alt = 'no-alt' }: NextImageProps) {
  return (
    <div className="relative max-w-3xl aspect-video mx-auto mb-5">
      <Image
        className="object-contain"
        fill
        src={src}
        alt={alt}
        sizes="100vw"
      />
    </div>
  );
}
