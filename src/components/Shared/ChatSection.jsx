import React from 'react';
import { ArrowLeft, Eye } from 'iconsax-react';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';

const ChatSection = ({
    selectedChat,
    setSelectedChat,
}) => {
    // **************** Handle Filter Single Chat User **************** //
    const { user } = useSelector((state) => state.LoginUser);
    const getSenderName = (data) => {
        return data?.[0]?._id === user?.id ? data?.[0] : data?.[1];
    }

    return (
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
            <div className='relative flex-grow'>
                <img
                    src="/images/bgwhatsapp.png"
                    alt="NOT-FOUND"
                    className='absolute w-full h-full object-cover'
                />
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-65'></div>
                {/* Message Section */}
                <div className='absolute bottom-0 left-0 p-4'>
                    <p className='bg-chatMsg p-2 rounded-lg w-fit'>messages</p>
                </div>
            </div>

            {/* Input Field */}
            <div className='bg-chatheader py-2 pl-10 pr-4 flex-shrink-0 flex items-center gap-2 h-16'>
                <input
                    type="text"
                    placeholder='Type a Message'
                    className='w-full bg-iconHover py-2 px-3 rounded-lg border-none ring-0 outline-none'
                />
                <button type='submit'>
                    <SendIcon />
                </button>
            </div>
        </>
    )
}

export default ChatSection;