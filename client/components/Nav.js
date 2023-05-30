const Nav = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <a href="/" className="text-white font-bold text-xl">
              Home
            </a>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="/myParagraph"
                  className="text-white hover:text-gray-300"
                >
                  Analyze something
                </a>
              </li>
              <li>
                <a href="/news" className="text-white hover:text-gray-300">
                  News
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-white hover:text-gray-300">
                  Reviews
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
