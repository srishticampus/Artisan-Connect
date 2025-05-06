import React from 'react'
import ArtisanNavbar from '../navigation/ArtisanNavbar'
import "../Artisan/ArtisanHomePage.css"

function ArtistChat() {
    
  return (

    <>
    <ArtisanNavbar/>
    
    
    <div className=' ArtistChat'>

<div className='artistchat-container'>

    <div className='artistchatdetails'>
    <h1>Item Name : &nbsp;&nbsp;&nbsp;&nbsp;Luminere</h1>
   <h1>User : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Adarsh</h1>
    </div>
    
  
</div>

<div className='artist-chatinbox'>
<div className='artistchat-container2'>
</div>

<div className='row' id='artistchattingsection'>
<div className='col-6 artistchatting-usersection artist-msgtym'>
<div className='artist-usermessage'>
<h1>hello Luminere</h1>
<p>12:30</p>
</div>
</div>


<div className='col-6 artistchatting-artistsection user-msgtym' >
<div className='artistmessage'>
<h1>hello</h1>
<p>12:35</p>
</div>


</div>   
</div>  



</div>

    
        <div className='artistchat-container-3'>
<div className="chatmessage-input">
<input type='text' placeholder='Message...'/>
</div>
<div className='artistmsgsendbtn'>
    
<button>message</button>

</div>


        </div>
         
        </div>
   
    </>
    
  )
}

export default ArtistChat