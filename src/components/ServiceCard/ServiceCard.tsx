import { Button } from 'antd';
import Image from 'next/image';

type ServiceCardProps = {
  image: string;
  title: string;
  onButtonClick?: () => void;
};

export function ServiceCard({ image, title, onButtonClick }: ServiceCardProps) {
  return (
    <div className="h-40 grid gap-1 grid-cols-2 border border-slate-500 border-solid rounded-md p-4">
      <div className="relative">
        <Image alt="Dichvu 1" src={image} fill />
      </div>
      <div className="flex flex-col items-center justify-around">
        <span className="text-xl font-semibold">{title}</span>
        <Button type="primary" className="w-32" onClick={onButtonClick}>
          Chi tiết
        </Button>
      </div>
    </div>
  );
}
