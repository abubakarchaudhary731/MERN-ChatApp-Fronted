import React, { useState, useEffect, useRef } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { addSnackbarData } from '../../reduxtoolkit/slices/SnakbarMessageSlice';
import { logoutUser } from '../../reduxtoolkit/slices/auth/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { emptySearchUser, fetchChats, searchUser, startChat } from '../../reduxtoolkit/slices/chat/FetchChatSlice';
import { getTimeDifference } from '../utilis/Logic';
import AbDialog from '../dialog/AbDialog';
import AbInputField from '../inputfields/AbInputField';
import AbButton from '../inputfields/AbButton';
import CloseIcon from '@mui/icons-material/Close';
import { createGroup } from '../../reduxtoolkit/slices/group/GroupSlice';

const AllChatsContact = ({
    title,
    search,
    setSearch,
    chat,
    searchUsers,
    setSelectedChat,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState({
        name: "",
        search: "",
        users: [],
    });
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle Dropdown
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

    // Handle Logout
    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(addSnackbarData({ message: 'Logout Successfully', variant: 'success' }));
        navigate('/login');
    };

    // Filter Single Chat User Name
    const { user } = useSelector((state) => state.LoginUser);
    const getSenderName = (data) => {
        return data?.[0]._id === user._id ? data?.[1].name : data?.[0].name;
    };

    // Start Chat To New User
    const startChatToNewUser = (userData) => {
        dispatch(startChat({ userId: userData._id })).then((result) => {
            if (result.payload.chatName) {
                dispatch(fetchChats());
                setSearch("");
            }
        });
    };

    // Handle Search User
    useEffect(() => {
        if (data.search !== "") {
            dispatch(searchUser(data.search));
        }
    }, [dispatch, data.search]);

    // Select User to Start Group
    const selectUsers = (user) => {
        if (!data.users.some(u => u._id === user._id)) {
            setData(prevData => ({
                ...prevData,
                users: [...prevData.users, user]
            }));
            setSelectedUserIds(prevIds => [...prevIds, user._id]);
            dispatch(emptySearchUser());
            setData(prevData => ({
                ...prevData,
                search: ""
            }));
        }
    };
    // Remove User from Group
    const removeUser = (userId) => {
        setData(prevData => ({
            ...prevData,
            users: prevData.users.filter(user => user._id !== userId)
        }));
        setSelectedUserIds(prevIds => prevIds.filter(id => id !== userId));
    };

    // Handle Create a New Group

    const validateForm = () => {
        const errors = {};
        if (!data.name) errors.name = 'Name is required';
        if (selectedUserIds.length < 2) errors.selectedUserIds = 'AtLeast Two Users Required For Group Chat';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCreateNewGroup = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const groupData = {
                name: data.name,
                users: JSON.stringify(selectedUserIds)
            };
            dispatch(createGroup(groupData)).then((result) => {
                if (result.payload?.chatName) {
                    dispatch(fetchChats());
                    setOpenDialog(false);
                    setData({ name: "", search: "", users: [] });
                    setSelectedUserIds([]);
                    dispatch(addSnackbarData({ message: 'Group Created Successfully', variant: 'success' }));
                }
            })
        }
    };

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
                                onClick={() => setOpenDialog(true)}
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
                                );
                            })
                        ) : (
                            <p className='text-center'>No Result Found</p>
                        )
                    ) : (
                        chat.length > 0 ? (
                            chat.map((chatData, index) => {
                                return (
                                    <div className='flex gap-4 w-full items-center cursor-pointer mb-3' key={index} onClick={() => setSelectedChat(chatData)}>
                                        <img
                                            src="/images/profile.png"
                                            alt="Not-Found"
                                            className='w-16 h-16 rounded-full object-contain'
                                        />
                                        <div className='w-full'>
                                            <div className='flex justify-between w-full'>
                                                <p className='font-bold'> {chatData.isGroupChat === true ? chatData.chatName : getSenderName(chatData.users)} </p>
                                                <p className='text-sm'> {chatData?.latestMessage?.content && getTimeDifference(chatData?.latestMessage?.createdAt)} </p>
                                            </div>
                                            <p className='text-sm mt-1'> {chatData?.latestMessage?.content} </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className='text-center'>No Chats Found</p>
                        )
                    )
                }
            </div>
            <AbDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                title="Create a New Group"
            >
                <div className='flex gap-2 flex-wrap mb-3'>
                    {
                        data.users.length > 0 && (
                            data.users.map((user, index) => {
                                return (
                                    <div className='bg-chatMsg px-4 py-1 rounded-lg relative' key={index}>
                                        <p> {user.name} </p>
                                        <div className='absolute cursor-pointer bg-chatMsg rounded-full bottom-5 right-0' onClick={() => removeUser(user._id)} >
                                            <CloseIcon fontSize='small' />
                                        </div>
                                    </div>
                                );
                            })
                        )
                    }
                </div>
                <form className='flex flex-col gap-4' onSubmit={handleCreateNewGroup}>
                    <AbInputField
                        type="text"
                        name='name'
                        value={data.name}
                        onchange={handleChange}
                        placeholder="Group Name"
                        className='py-1'
                        error={errors.name}
                    />
                    <AbInputField
                        type="text"
                        name='search'
                        placeholder="Search Users to Add"
                        value={data.search}
                        onchange={handleChange}
                        className='py-1'
                        error={errors.selectedUserIds}
                    />
                    {
                        data.search.length > 0 && (
                            searchUsers.length > 0 ? (
                                searchUsers.slice(0, 4).map((user, index) => {
                                    return (
                                        <div className='flex gap-4 w-full items-center cursor-pointer mb-2' key={index} onClick={() => selectUsers(user)}>
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
                    <AbButton
                        text="Create Group"
                        type='submit'
                        className='bg-chatMsg py-2 rounded-lg'
                    />
                </form>
            </AbDialog>
        </>
    );
};

export default AllChatsContact;