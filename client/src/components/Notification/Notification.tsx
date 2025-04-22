import React from 'react'
import Navbar from '../navigation/Navbar'
import Footer from '../footer/Footer'



function Notification() {
    return (
        <>
            <Navbar />

            <section className='Cover-img'>
                <h1>Messages</h1>
            </section>

            <div className='notification'>



                <div className='notification-alert'>
                    <h1>We have recieved your message regarding...</h1>
                </div>
                <div className='notification-msgcontent'>
                    <p>We have recieved your message regarding slow delivery its okLumière canvases are explosions of color, a vibrant dance of emotions poured onto the surface. Inspired by the chaos and beauty of the urban landscape, she uses bold strokes and gestural movements to capture the fleeting energy of life. Every piece is an invitation to lose yourself in the rhythm of color and find your own story within the abstract.
                    </p>
                </div>

                <div className='notification-btn'>
                    <button>Mark as read</button>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Notification