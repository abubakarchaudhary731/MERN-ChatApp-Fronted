import React from 'react'
import { MessageText, People, Profile } from 'iconsax-react';

const SideBar = ({
    activeTab,
    setActiveTab,
    selectedChat,
}) => {
    return (
        <>
            <div className={`basis-16 h-full bg-chatheader lg:flex flex-row lg:flex-col gap-5 items-center pt-8 justify-center ${selectedChat ? 'hidden' : 'flex'}`}>
                <div
                    className={`cursor-pointer hover:bg-iconHover rounded-full p-3 ${activeTab === 1 ? 'bg-iconHover' : ''}`}
                    onClick={() => setActiveTab(1)}
                >
                    <MessageText size={25} />
                </div>
                <div
                    className={`cursor-pointer hover:bg-iconHover rounded-full p-3 ${activeTab === 2 ? 'bg-iconHover' : ''}`}
                    onClick={() => setActiveTab(2)}
                >
                    <People size={25} />
                </div>
                <div
                    className={`cursor-pointer hover:bg-iconHover rounded-full p-3  lg:mt-auto lg:mb-3 ${activeTab === 3 ? 'bg-iconHover' : ''}`}
                    onClick={() => setActiveTab(3)}
                >
                    <Profile size={25} />
                </div>
            </div>
        </>
    )
}

export default SideBar