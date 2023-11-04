const Header: React.FC = () => {
  return ( 
    <div className="bg-white w-full h-[3.5rem] flex items-center px-5">
      <img 
        src="/favicon.png"
        width="0"
        height="0"
        alt="bodypace logo"
        className="w-8 h-8"
      />
      <span className="text-2xl ml-2">
        Bodypace
      </span>
      <nav className="flex flex-row w-full">
        <ul className="list-none flex flex-row ml-[4rem] w-full">
          <li><a href="" className="flex px-4 h-[3.5rem] hover:bg-gray-200 items-center">Home</a></li>
          <li><a href="" className="flex px-4 h-[3.5rem] hover:bg-gray-200 items-center">Download</a></li>
          <li><a href="" className="flex px-4 h-[3.5rem] hover:bg-gray-200 items-center">Future Plan</a></li>
          <li><a href="" className="flex px-4 h-[3.5rem] hover:bg-gray-200 items-center">Development</a></li>
          <li className="mr-0 flex px-4 h-[3.5rem] hover:bg-gray-200 items-center ml-auto"><a href="">Online Account</a></li>
        </ul>
      </nav>
    </div>
   );
}
 
export default Header;