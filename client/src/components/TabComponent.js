import React, { useState, useEffect, useRef } from 'react';

const TabComponent = ({ items }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const firstBtnRef = useRef();

    useEffect(() => {
        firstBtnRef.current.focus();
    }, []);

    return (
        <div className='flex ' >
            <div className='max-w flex flex-col gap-y-2 w-full'>
                <div className=' max-w-sm flex pb-1 gap-x-2 font-bold text-gray-500 border-0 border-b-2 border-gray-300' >
                    {
                        items.map((item, index) => (
                            <button
                                ref={index === 0 ? firstBtnRef : null}
                                key={index}
                                onClick={() => setSelectedTab(index)}
                                className={`w-full p-2 hover:bg-green-300 rounded-xl text-center focus:bg-green-500 focus:text-gray-600 ${selectedTab === index ? ' bg-gradient-to-r from-green-300 to-green-500 text-grey-600 shadow-md' : ''
                                    } `}
                            >
                                {item.title}
                            </button>
                        ))
                    }
                </div>

                <div className='bg-white p-2 rounded-xl'>
                    {items.map((item, index) => (
                        <div className={`${selectedTab === index ? '' : 'hidden'}`}>
                            {item.content}
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};

export default TabComponent;