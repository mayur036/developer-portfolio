import { About } from '@/src/components/sections/about';
import { Contact } from '@/src/components/sections/contact';
import { Credentials } from '@/src/components/sections/credentials';
import { Experience } from '@/src/components/sections/experience';
import { Footer } from '@/src/components/sections/footer';
import { Hero } from '@/src/components/sections/hero';
import { Navbar } from '@/src/components/sections/navbar';
import { Projects } from '@/src/components/sections/projects';
import { Services } from '@/src/components/sections/services';
import { Skills } from '@/src/components/sections/skills';
import { BackToTop } from '@/src/components/back-to-top';

import { InteractiveGrid } from '@/src/components/interactive-grid';

export default function Home() {
  return (
    <>
      <InteractiveGrid />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Services />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
