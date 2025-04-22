import React from 'react'
import "./UserChat.css"

function BuyerChat() {
  return (
    <div className='userChat'> 

<div className='userchat-container'>

    <div className='userchatdetails'>
    <h1>Item Name : &nbsp;&nbsp;&nbsp;&nbsp;Luminere</h1>
   <h1>Artist : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Adarsh</h1>
    </div>
    
  
</div>

<div className='user-chatinbox'>

<div className='row' id='userchattingsection'>
<div className='col-6 userchatting-usersection userartist-msgtym'>
<div className='user-usermessage'>
<h1>hello Luminere</h1>
<p>12:30</p>
</div>
</div>


<div className='col-6 userchatting-artistsection useruser-msgtym' >
<div className='usermessage'>
<h1>hello</h1>
<p>12:35</p>
</div>


</div>   
</div>  



</div>

    
        <div className='userchat-container-3'>
<div className="userchatmessage-input">
<input type='text' placeholder='Message...'/>
</div>
<div className='usermsgsendbtn'>
    

</div>


        </div>
         
        </div>
  )
}

export default BuyerChat