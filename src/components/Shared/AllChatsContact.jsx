import React, { useState, useEffect, useRef } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { addSnackbarData } from '../../reduxtoolkit/slices/SnakbarMessageSlice';
import { logoutUser } from '../../reduxtoolkit/slices/auth/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { fetchChats, startChat } from '../../reduxtoolkit/slices/chat/FetchChatSlice';

const AllChatsContact = ({
    title,
    search,
    setSearch,
    chat,
    searchUsers,
    setSelectedChat,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // **************** Handle Dropdown **************** //
    const dropdownRef = useRef(null);
    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // **************** Handle Logout **************** //
    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(addSnackbarData({ message: 'Logout Successfully', variant: 'success' }));
        navigate('/login');
    };

    // **************** Handle Filter Single Chat User Name **************** //
    const { user } = useSelector((state) => state.LoginUser);
    const getSenderName = (data) => {
        return data?.[0]._id === user.id ? data?.[0].name : data?.[1].name;
    }

    // **************** Handle Start Chat To New User **************** //
    const startChatToNewUser = (data) => {
        dispatch(startChat({ userId: data._id })).then((result) => {
            if (result.payload.chatName) {
                dispatch(fetchChats());
                // setSelectedChat(data)
                setSearch("");
            }
        })
    }

    return (
        <>
            <div className='mt-5 flex justify-between items-center relative'>
                <p className='font-bold text-2xl'> {title} </p>
                <i className='cursor-pointer' onClick={handleToggleDropdown}>
                    <MoreVertIcon />
                </i>
                {isDropdownOpen && (
                    <div
                        ref={dropdownRef}
                        className='absolute right-0 top-7 w-48 bg-chatheader rounded-md shadow-lg z-10'
                    >
                        <div className='py-2'>
                            <button
                                className='block px-4 py-2 text-sm text-white hover:bg-iconHover w-full text-left'
                            // onClick={handleNewGroup}
                            >
                                New Group
                            </button>
                            <button
                                className='block px-4 py-2 text-sm text-white hover:bg-iconHover w-full text-left'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-7'>
                <input
                    type="text"
                    placeholder='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full px-5 py-2 rounded-lg bg-iconHover focus:ring-0 border-0 outline-0'
                />
            </div>

            <div className='mt-5 overflow-y-auto h-[calc(100vh-15rem)]'>
                {
                    search.length > 0 ? (
                        searchUsers.length > 0 ? (
                            searchUsers.map((user, index) => {
                                return (
                                    <div className='flex gap-4 w-full items-center cursor-pointer mb-2' key={index} onClick={() => startChatToNewUser(user)}>
                                        <img
                                            src="/images/profile.png"
                                            alt="Not-Found"
                                            className='w-16 h-16 rounded-full object-contain'
                                        />
                                        <div>
                                            <p className='font-bold'> {user.name} </p>
                                            <p className='text-sm mt-1'> {user.email} </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p className='text-center'>No Result Found</p>
                        )
                    ) : (
                        chat.length > 0 ? (
                            chat.map((chat, index) => {
                                return (
                                    <div className='flex gap-4 w-full items-center cursor-pointer mb-3' key={index} onClick={() => setSelectedChat(chat)}>
                                        <img
                                            src="/images/profile.png"
                                            alt="Not-Found"
                                            className='w-16 h-16 rounded-full object-contain'
                                        />
                                        <div className='w-full'>
                                            <div className='flex justify-between w-full'>
                                                <p className='font-bold'> {chat.isGroupChat === true ? chat.chatName : getSenderName(chat.users)} </p>
                                                <p className='text-sm'> 2:00 PM </p>
                                            </div>
                                            <p className='text-sm mt-1'> Last Message </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p className='text-center'>No Chats Found</p>
                        )
                    )
                }
            </div>
        </>
    )
}

export default AllChatsContact