import React, { useState, useRef, useLayoutEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../../reduxtoolkit/slices/chat/MessageSlice';
import ChatSectionHeader from './ChatSectionHeader';
import { fetchChats } from '../../reduxtoolkit/slices/chat/FetchChatSlice';

const ChatSection = ({
    selectedChat,
    setSelectedChat,
    messages,
    socket,
}) => {
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    const { user } = useSelector((state) => state.LoginUser);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages, selectedChat]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            dispatch(sendMessage({ chatId: selectedChat?._id, content: content.trim() })).then((result) => {
                if (result.payload.content) {
                    dispatch(fetchMessages(selectedChat?._id));
                    dispatch(fetchChats());
                    setContent('');
                    scrollToBottom();
                    socket.emit("new message", result.payload);
                }
            });
        }
    }

    return (
        <>
            {
                selectedChat ? (
                    <>
                        {/* Header */}
                        <ChatSectionHeader
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            user={user}
                        />

                        {/* Background and Overlay */}
                        <div className='relative flex-grow flex flex-col h-[calc(100vh-13rem)]'>
                            <img
                                src="/images/bgwhatsapp.png"
                                alt="NOT-FOUND"
                                className='absolute w-full h-full object-cover'
                            />
                            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-85'></div>
                            {/* Message Section */}
                            <div ref={messagesEndRef} className='relative flex-grow p-4 flex flex-col overflow-y-auto'>
                                {messages?.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`mb-2 p-2 rounded-lg w-fit max-w-[75%] ${message.sender._id === user?._id ? 'bg-chatMsg self-end' : 'bg-chatheader self-start'
                                            }`}
                                    >
                                        {message.chat?.isGroupChat === true && message.sender._id !== user?._id ? <p className='text-sm text-primary'>~{message?.sender?.name}</p> : null}
                                        <p className='break-words'>{message.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Input Field */}
                        <form
                            onSubmit={handleSubmit}
                            className='bg-chatheader py-2 pl-10 pr-4 flex-shrink-0 flex items-center gap-2 h-16'
                        >
                            <input
                                type="text"
                                placeholder='Type a Message'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='w-full bg-iconHover py-2 px-3 rounded-lg border-none ring-0 outline-none'
                            />
                            <button type='submit'>
                                <SendIcon
                                // style={{ transform: 'rotate(-45deg)' }} 
                                />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className='flex justify-center h-full items-center bg-chatheader'>
                        <p className='font-bold text-3xl'> Welcome to WhatsApp </p>
                    </div>
                )
            }
        </>
    );
}

export default ChatSection;
