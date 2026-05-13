'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackView, getSessionId } from '@/lib/api';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackView(getSessionId(), pathname, document.referrer);
  }, [pathname]);

  return null;
}
