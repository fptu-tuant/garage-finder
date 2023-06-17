import { useEffect, useRef, useState } from 'react';

export function useHover<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [isHovering, setHovering] = useState<boolean>(false);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  useEffect(() => {
    const target = ref.current ?? window;

    target.addEventListener('mouseenter', handleMouseEnter);
    target.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      target.removeEventListener('mouseenter', handleMouseEnter);
      target.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  const changeHover = (isHovering: boolean) => setHovering(isHovering);

  return { ref, isHovering, changeHover };
}
