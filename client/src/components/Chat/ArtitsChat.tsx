import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseApi/baseurl';
import ArtisanNavbar from '../navigation/ArtisanNavbar';

const ArtisanChat = () => {
  const artisanId = localStorage.getItem("artisanid");
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/getAllChatsForArtisan/${artisanId}`)
      .then(res => {
        console.log(res.data, "kk");
        setChatList(res.data.data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div><ArtisanNavbar />
      <div className="flex" style={{minHeight:"80vh"}}>
        {/* Sidebar */}
        <div className="w-1/4 border-r p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Chats</h2>
          {chatList.map((chat, index) => (
            <div
              key={index}
              className=" border-b cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveChat(chat)}
            >
              <p className="font-medium text-primary"> {chat?.user?.firstname||chat?.toUser}<p className="text-sm text-gray-500">Product : {chat?.product?.name}</p></p>
              
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="w-2/3 p-4">
          {activeChat ? (
            <ChatBox chat={activeChat} artisanId={artisanId} />
          ) : (
            <p className="text-gray-500">Select a conversation to start chatting.</p>
          )}
        </div>
      </div></div>
  );
};

export default ArtisanChat;

const ChatBox = ({ chat, artisanId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const { toUser, productId } = chat;

  useEffect(() => {
    axiosInstance.get(`/history/${artisanId}/${toUser}/${productId}`)
      .then(res => setMessages(res.data.data))
      .catch(err => console.log(err));
  }, [chat, artisanId, toUser, productId]);

  const handleSend = () => {
    if (newMsg.trim() === "") return;

    axiosInstance.post("/send", {
      msg: newMsg,
      fromUser: artisanId,
      fromRole: "artists",
      toUser: toUser,
      toRole: "users",
      productId: productId
    }).then(res => {
      setMessages(prev => [...prev, res.data.data]);
      setNewMsg("");
    }).catch(err => console.log(err));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg?.fromUser === artisanId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-md text-sm 
                ${msg?.fromUser === artisanId ? 'bg-indigo-100 text-right' : 'bg-gray-200 text-left'}`}
            >
              {msg?.msg}
            </div>
          </div>
        ))}
      </div>

      <div className="flex p-2 border-t">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};
