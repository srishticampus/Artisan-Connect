import React from 'react'
import Navbar from '../navigation/Navbar'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom'

function NotificationMain() {
    return (

        <>
            <Navbar/>

            <section className='Cover-img'>
                <h1>Notification</h1>
            </section>

            <div className='NotificationMain'>

                <div className='delivery-schedule'>
                    <h1>Delivery Schedule</h1>
                    <table width={"100%"} className='deliverytable'>
                        <thead >
                            <tr >
                                <th width={"48%"}>Date(order)</th>
                                <th width={"42%"}>Track Order</th>
                                <th width={"48%"}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12/11/2024</td>
                                <td>Order Fulfiled</td>
                                <td id='delivered'>Deliverd</td>
                            </tr>
                            <tr>
                                <td>12/11/2024</td>
                                <td>Track order</td>
                                <td id='intransist'>In transist</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='notificaation-messages'>
                    <h1>Messages</h1>

                    <table width={"100%"} className='deliverytable'>
                        <thead >
                            <tr >
                                <th width={"93%"}>Messages</th>
                               
                                <th width={"50%"}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Link to="/user_messages">We have received your message regarding slow delivery we are working .....</Link> </td>
                                
                                <td id='read'>Read</td>
                            </tr>
                            <tr>
                                <td> <Link to="/user_messages">We have received your message regarding slow delivery we are working .....</Link> </td>
                               
                                <td id='unread'>Unread</td>
                            </tr>
                        </tbody>
                    </table>


                </div>

            </div>
            <Footer />
        </>

    )
}

export default NotificationMain