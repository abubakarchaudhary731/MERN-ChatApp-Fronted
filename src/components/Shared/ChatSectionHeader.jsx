import React, { useState } from 'react'
import { ArrowLeft } from 'iconsax-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AbDialog from '../dialog/AbDialog';
import CloseIcon from '@mui/icons-material/Close';
import AbInputField from '../inputfields/AbInputField';
import AbButton from '../inputfields/AbButton';

const ChatSectionHeader = ({
    selectedChat,
    setSelectedChat,
    user
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState({
        chatName: "",
        chatId: "",
    })

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    // Handle Filter Single Chat User
    const getSenderName = (data) => {
        return data?.[0]?._id === user?._id ? data?.[1] : data?.[0];
    }

    // Remove User From Group
    const removeUserFromGroup = (userId) => {
        //
    }

    // Update Group
    const handleUpdateGroup = (e) => {
        e.preventDefault();
        //
    }

    return (
        <>
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
                    <div className='cursor-pointer p-2 hover:bg-iconHover rounded-full' onClick={handleOpenDialog}>
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
            <AbDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                title={selectedChat.isGroupChat === true ? selectedChat.chatName : 'Profile'}
            >
                <div className='mb-5'><b>Group Admin:</b> {selectedChat.groupAdmin?.name} </div>
                {
                    selectedChat.isGroupChat === true ? (
                        <>
                            <div className='flex flex-wrap gap-4'>
                                {
                                    selectedChat.users.map((item, index) => {
                                        return (
                                            user._id === selectedChat.groupAdmin?._id ? (
                                                <>
                                                    <div className='bg-chatMsg px-4 py-1 rounded-lg relative' key={index}>
                                                        <p> {item.name} </p>
                                                        <div className='absolute cursor-pointer bg-chatMsg rounded-full bottom-5 right-0' onClick={() => removeUserFromGroup(item._id)} >
                                                            <CloseIcon fontSize='small' />
                                                        </div>
                                                    </div>
                                                </>
                                            ) :
                                                <div className='bg-chatMsg px-4 py-1 rounded-lg relative' key={index}>
                                                    <p> {item.name} </p>
                                                </div>

                                        )
                                    })
                                }
                            </div>
                            {
                                user._id === selectedChat.groupAdmin?._id && (
                                    <div className='mt-5 flex flex-col gap-3' >
                                        <form className='flex gap-2 items-center' onSubmit={handleUpdateGroup}>
                                            <div className='flex-grow'>
                                                <AbInputField
                                                    type="text"
                                                    placeholder="Enter New Group Name"
                                                    name="name"
                                                    className='py-1'
                                                />
                                            </div>
                                            <AbButton
                                                type="submit"
                                                text='Update'
                                                className='w-full py-2 rounded-lg px-4'
                                            />

                                        </form>
                                        <AbInputField
                                            type="text"
                                            placeholder="Search More Users To Add"
                                            name="search"
                                            className='py-1'
                                        />
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <img
                                src="/images/profile.png"
                                alt=""
                                className='w-24 h-24 rounded-full mx-auto'
                            />
                            <div className='mt-5 flex flex-col items-center gap-2'>
                                <h1 className='font-bold text-2xl'> {selectedChat?.isGroupChat === true ? selectedChat.chatName : getSenderName(selectedChat?.users)?.name} </h1>
                                <p> {selectedChat?.isGroupChat === true ? '' : getSenderName(selectedChat?.users)?.email} </p>
                            </div>
                        </>
                    )
                }
            </AbDialog>
        </>
    )
}

export default ChatSectionHeader