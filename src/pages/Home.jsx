import React, { useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import AllChatsContact from '../components/Shared/AllChatsContact';
import SideBar from '../components/Shared/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, searchUser } from '../reduxtoolkit/slices/chat/FetchChatSlice';
import ChatSection from '../components/Shared/ChatSection';
import Profile from './Profile';

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.LoginUser);
  const { ChatUsers, searchUsers } = useSelector((state) => state.Chats);
  const groupChat = ChatUsers.filter((user) => user.isGroupChat === true);
  const singleUserChat = ChatUsers.filter((user) => user.isGroupChat === false);

  const renderMiddleSection = () => {
    switch (activeTab) {
      case 1:
        return <AllChatsContact title='Chats' chat={singleUserChat} search={search} setSearch={setSearch} searchUsers={searchUsers} setSelectedChat={setSelectedChat} />;
      case 2:
        return <AllChatsContact title='Groups' chat={groupChat} search={search} setSearch={setSearch} searchUsers={searchUsers} setSelectedChat={setSelectedChat} />;
      case 3:
        return <Profile />;
      default:
        return <AllChatsContact title='Chats' />;
    }
  };

  // **************** Handle Fetch Chat **************** //
  useEffect(() => {
    if (token) {
      dispatch(fetchChats())
    }
  }, [dispatch, token]);

  // **************** Handle Search User **************** //
  useEffect(() => {
    if (search !== "" && token) {
      dispatch(searchUser(search))
    }
  }, [dispatch, search, token]);

  return (
    <AppLayout>
      <div className='w-full h-full lg:p-10'>
        <div className='flex flex-col lg:flex-row h-full'>

          <SideBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedChat={selectedChat}
          />

          <div className={`basis-full lg:basis-[32rem] lg:overflow-y-auto bg-chatsBg px-5 lg:block ${selectedChat ? 'hidden' : 'block'}`}>
            {renderMiddleSection()}
          </div>

          <div className={`w-full lg:flex-1 ${selectedChat ? 'flex' : 'hidden'} lg:flex flex-col h-full`}>
            <ChatSection
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default Home;