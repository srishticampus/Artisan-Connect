import React, { useEffect, useState } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../footer/Footer';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../BaseApi/Baseurl';

function BuyerChat() {
  const { artisanId, productId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const fromUser = localStorage.getItem('buyerid');
  const fromRole = 'users';
  const toUser = artisanId;
  const toRole = 'artists';

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get(`/history/${fromUser}/${toUser}/${productId}`);
      console.log(res.data);
      
      setMessages(res.data.data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    try {
      const res = await axiosInstance.post('/send', {
        msg: newMsg,
        fromUser,
        fromRole,
        toUser,
        toRole,
        productId
      });
      setMessages(prev => [...prev, res.data.data]);
      setNewMsg('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Optional: Auto refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center bg-gray-100 py-2 px-1" style={{minHeight:"50vh"}}>
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-2 border-b">
            <h2 className="text-xl font-bold">Chat with Artisan</h2>
            <p className="text-sm text-gray-600">Product ID: {productId}</p>
          </div>
          <div className="p-2 h-96 overflow-y-auto space-y-3 bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center">No messages yet.</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 max-w-xs rounded-lg ${
                    msg?.fromUser === fromUser
                      ? 'bg-indigo-100 self-end ml-auto'
                      : 'bg-gray-200 self-start mr-auto'
                  }`}
                >
                  {msg?.msg}
                </div>
              ))
            )}
          </div>
          <div className="flex items-center p-4 border-t">
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BuyerChat;
