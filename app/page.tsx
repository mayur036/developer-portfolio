import { About } from '@/src/components/sections/about';
import { Contact } from '@/src/components/sections/contact';
import { Experience } from '@/src/components/sections/experience';
import { Footer } from '@/src/components/sections/footer';
import { Hero } from '@/src/components/sections/hero';
import { Navbar } from '@/src/components/sections/navbar';
import { Process } from '@/src/components/sections/process';
import { Projects } from '@/src/components/sections/projects';
import { Skills } from '@/src/components/sections/skills';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
