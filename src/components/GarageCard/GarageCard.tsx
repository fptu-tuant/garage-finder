import Image from 'next/image';

type GarageCardProps = {
  image: string;
  title: string;
  address: string;
  totalRate: number;
  rating: number;
};

export function GarageCard({
  image,
  address,
  rating,
  title,
  totalRate,
}: GarageCardProps) {
  return (
    <div>
      <div className="relative aspect-video">
        <Image src={image} fill alt={title} className="object-cover" />
      </div>
    </div>
  );
}
