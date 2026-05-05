'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Pricing from '@/components/sections/Pricing';
import ContactCTA from '@/components/sections/ContactCTA';
import Footer from '@/components/Footer';
import Parther from '@/components/sections/Parther';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <div
        className="transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0, backgroundColor: 'E3E2E1' }}
      >
        <Navbar />
        <Hero />
        <Parther />
        <Pricing />
        <Services />
        <Portfolio />
        <ContactCTA />
        <Footer />
      </div>
    </>
  );
}
