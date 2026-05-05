'use client';

import { useEffect } from 'react';

export default function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        delay: 0,
      });
    });
  }, []);

  return <>{children}</>;
}
