import React from 'react';

function skeleton(props) {
    return (
        <div>
            <div className="w-80 h-56 border-2 bg-maincolor rounded-md mx-auto mt-5">
                <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                    <div className="w-12 bg-gray-300 h-12 rounded-full ">
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="w-36 bg-gray-300 h-6 rounded-md ">
                        </div>
                        <div className="w-24 bg-gray-300 h-6 rounded-md ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default skeleton;