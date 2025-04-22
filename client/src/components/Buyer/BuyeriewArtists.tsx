import React from 'react'
import Navbar from '../navigation/Navbar'
import Footer from '../footer/Footer'
import artistimg from "../../assets/contactus.jpg"
import { Link } from 'react-router-dom'

function ViewArtists({url}) {
    return (
        <>
            <Navbar url={url} />

            <section className='Cover-img'>
                <h1>Artists</h1>
            </section>

            <div className='ViewArtists'>
                <h1>Artists</h1>
                <p>We provide the tools and support to help your artistic compass guide you.</p>

                <div className='viewartists-list'>
                    <div className='row'>

                        
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                            <div className='viewartists-listimg col-3'>

                            <Link to="/view_artistworks">

                                <div className='viewartists-image'>
                                    <img src={artistimg} alt='artist image' />
                                </div>
                                <h1>Lumiere</h1>
                                
                                </Link>

                            </div>
                       


                    </div>

                </div>

           

            </div>
            <Footer />
        </>
    )
}

export default ViewArtists