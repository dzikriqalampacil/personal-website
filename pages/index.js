import React from 'react'
import Navbar from '../ui/component/Navbar'
import Hero from '../ui/component/Hero'
import About from '../ui/component/About'
import Skills from '../ui/component/Skills'
import Experiences from '../ui/component/Experiences'
import Projects from '../ui/component/Projects'
import Contact from '../ui/component/Contact'
import Footer from '../ui/component/Footer'

export default function Home() {
  return (<>
    <Hero />
    <About />
    <Skills />
    <Experiences />
    <Projects />
    <Contact />
    <Footer />
  </>)
}
