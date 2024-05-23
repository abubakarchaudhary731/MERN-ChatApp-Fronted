import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'iconsax-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AbDialog from '../dialog/AbDialog';
import CloseIcon from '@mui/icons-material/Close';
import AbInputField from '../inputfields/AbInputField';
import AbButton from '../inputfields/AbButton';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToGroup, removeUserFromGroup, updateGroupName } from '../../reduxtoolkit/slices/group/GroupSlice';
import { fetchChats, searchUser } from '../../reduxtoolkit/slices/chat/FetchChatSlice';
import { addSnackbarData } from '../../reduxtoolkit/slices/SnakbarMessageSlice';

const ChatSectionHeader = ({
    selectedChat,
    setSelectedChat,
    user
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [chatName, setChatName] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(searchUser(search));
    }, [search]);
    const { searchUsers } = useSelector((state) => state.Chats);

    // Handle Open Dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Handle Filter Single Chat User
    const getSenderName = (data) => {
        return data?.[0]?._id === user?._id ? data?.[1] : data?.[0];
    };

    const dispatch = useDispatch();
    // Remove User From Group
    const removeUserToGroup = (userId) => {
        dispatch(removeUserFromGroup({ chatId: selectedChat._id, userId })).then((result) => {
            if (result?.payload?.data) {
                dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
                setSelectedChat(result?.payload?.data);
                dispatch(fetchChats());
                // setOpenDialog(false);
            } else {
                dispatch(addSnackbarData({ message: result?.payload?.error, variant: 'error' }));
            }
        })
    };

    // Leave Group
    const handleLeaveGroup = () => {
        dispatch(removeUserFromGroup({ chatId: selectedChat._id, userId: user?._id })).then((result) => {
            if (result?.payload?.data) {
                dispatch(addSnackbarData({ message: 'You have left the group', variant: 'success' }));
                setSelectedChat(null);
                dispatch(fetchChats());
                setOpenDialog(false);
            } else {
                dispatch(addSnackbarData({ message: result?.payload?.error, variant: 'error' }));
            }
        })
    };

    // Update Group Name
    const handleUpdateGroupName = (e) => {
        e.preventDefault();
        dispatch(updateGroupName({ chatId: selectedChat._id, chatName: chatName })).then((result) => {
            if (result?.payload?.data) {
                dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
                dispatch(fetchChats());
                setChatName("");
                setOpenDialog(false);
            } else {
                dispatch(addSnackbarData({ message: result?.payload?.error, variant: 'error' }));
            }
        });
    };

    // Add New User To Group
    const handleAddUserToGroup = (userId) => {
        dispatch(addUserToGroup({ chatId: selectedChat._id, userId })).then((result) => {
            if (result?.payload?.data) {
                const { data } = result?.payload
                dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
                setSelectedChat(data);
                dispatch(fetchChats());
                setSearch("");
                // setOpenDialog(false);
            } else {
                dispatch(addSnackbarData({ message: result?.payload?.error, variant: 'error' }));
            }
        })
    };

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
                                    selectedChat.users.map((item) => (
                                        <div className='bg-chatMsg px-4 py-1 rounded-lg relative' key={item._id}>
                                            <p> {item.name} </p>
                                            {user._id === selectedChat.groupAdmin?._id && (
                                                <div className='absolute cursor-pointer bg-chatMsg rounded-full bottom-5 right-0' onClick={() => removeUserToGroup(item._id)} >
                                                    <CloseIcon fontSize='small' />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                user._id === selectedChat.groupAdmin?._id && (
                                    <div className='mt-5 flex flex-col gap-3' >
                                        <form className='flex gap-2 items-center' onSubmit={handleUpdateGroupName}>
                                            <div className='flex-grow'>
                                                <AbInputField
                                                    type="text"
                                                    placeholder="Enter New Group Name"
                                                    name="chatName"
                                                    className='py-1'
                                                    value={chatName}
                                                    onchange={(e) => setChatName(e.target.value)}
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
                                            value={search}
                                            onchange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                )
                            }
                            <div className='my-5'>
                                {
                                    search.length > 0 && (
                                        searchUsers.length > 0 ? (
                                            searchUsers.slice(0, 4).map((user, index) => {
                                                return (
                                                    <div className='flex gap-4 w-full items-center cursor-pointer mb-2' key={index} onClick={() => handleAddUserToGroup(user._id)}>
                                                        <img
                                                            src="/images/profile.png"
                                                            alt="Not-Found"
                                                            className='w-10 h-10 rounded-full object-contain'
                                                        />
                                                        <div>
                                                            <p className='font-bold'> {user.name} </p>
                                                            <p className='text-sm'> {user.email} </p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className='text-center'>No Result Found</p>
                                        )
                                    )
                                }
                            </div>
                            <div className='flex justify-end'>
                                <AbButton
                                    type="submit"
                                    text='Leave Group'
                                    className='w-full py-2 rounded-lg px-4 bg-red-500'
                                    handleClick={handleLeaveGroup}
                                />
                            </div>
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
    );
};

export default ChatSectionHeader;