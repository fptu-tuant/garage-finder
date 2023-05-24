import Image from 'next/image';

import otoImage from '@/assets/images/5.png';

export function CarIllustrate() {
  return (
    <div className="h-full relative">
      <div className="absolute w-3/5 h-full bg-primary-100" />
      <div className="absolute h-4/5 w-full mt-[10%]">
        <Image src={otoImage} alt="oto" fill className="object-contain" />
      </div>
    </div>
  );
}
