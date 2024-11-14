const Input = ({ msg, icon: Icon, ...props }) => {
    return (
        <div className="mb-6 w-full">
            <div className='relative w-full'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <Icon className='size-5 text-green-500' />
                </div>
                <input
                    {...props}
                    className='w-full outlin-none  pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700  focus:outline-none text-white placeholder-gray-400 transition duration-200'
                />
            </div>
            <p className=" font-normal text-red-500">
            {msg}

            </p>
        </div>
    );
};
export default Input;