import React from 'react'
import Navbar from '../navigation/Navbar';
import Hero from './Hero';
import FeaturedArtisans from './FeaturedArtisans';
import Footer from '../footer/Footer';
function UserHome() {
  return (
    <div>
      <div>
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedArtisans />
      </main>
      <Footer />
    </div>
    </div>
    </div>
  )
}

export default UserHome
