import React, { useState, useRef, useLayoutEffect } from 'react';
import { ArrowLeft, Eye } from 'iconsax-react';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../../reduxtoolkit/slices/chat/MessageSlice';

const ChatSection = ({
    selectedChat,
    setSelectedChat,
    messages,
    socket,
}) => {
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    // Handle Filter Single Chat User
    const { user } = useSelector((state) => state.LoginUser);
    const getSenderName = (data) => {
        return data?.[0]?._id === user?._id ? data?.[1] : data?.[0];
    }

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
                        <div className='z-10 bg-chatheader w-full h-16 px-5 flex-shrink-0'>
                            <div className='w-full flex justify-between h-full items-center'>
                                <div className='flex gap-4 items-center'>
                                    <i className='cursor-pointer lg:hidden' onClick={() => setSelectedChat(null)}> <ArrowLeft /> </i>
                                    <img
                                        src="/images/usernotfound.png"
                                        alt="Not-Found"
                                        className='w-10 h-10 rounded-full'
                                    />
                                    <p>{selectedChat?.isGroupChat === true ? selectedChat.chatName : getSenderName(selectedChat?.users)?.name}</p>
                                </div>
                                <div className='cursor-pointer p-2 hover:bg-iconHover rounded-full'>
                                    <Eye />
                                </div>
                            </div>
                        </div>

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
