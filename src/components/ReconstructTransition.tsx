import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  x: number;
  y: number;
  to: string;
  onDone?: () => void;
}

export default function ReconstructTransition({ x, y, to, onDone }: Props) {
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
      navigate(to);
      if (onDone) onDone();
    }, 700); // アニメ時間
    return () => clearTimeout(timer);
  }, [navigate, to, onDone]);

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none bg-white dark:bg-black"
      style={{
        clipPath: `circle(${animating ? '0%' : '150%'} at ${x}px ${y}px)`,
        transition: 'clip-path 0.7s ease-out',
      }}
    />
  );
}
