import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start text-white">
        
        <div className="ml-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-lg  font-extrabold mb-4">SHOP</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  TOP
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  ETHIC WEAR
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  HIJAB
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  CORD SETS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-extrabold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="hover:text-gray-400 transition-colors">
                  ABOUT US
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/fotcAexeYhcCYwMMA" className="hover:text-gray-400 transition-colors">
                   LOCATION
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  BLOG
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-extrabold mb-4">SUPPORT</h4>
            <ul className="space-y-2">
              <li>
                <a href="/contact-us" className="hover:text-gray-400 transition-colors">
                  CONTACT US
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                   PRODUCT AND SHIPPING POLICY
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  REFUND AND CANCELLATION
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  POLICY
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  TERMS AND CONDITIONS
                </a>
              </li>
            </ul>
          </div>

          <div className=" mb-6 md:mb-0">
          <h4 className="text-lg font-medium mb-4">Sagey</h4>
          <p className="text-sm">
          15/538-D
Spacequre building 
Karuthaparamba 
Karassery post
Mukkam 
Kozhikode
Kerala 673602
          </p>
        </div>
          {/* <div>
  <h4 className="text-lg font-extrabold mb-4">NEWSLETTER</h4>
  <div className="flex flex-col sm:flex-row items-center">
    <input
      type="email"
      placeholder="Enter Your Email Address"
      className="bg-white border-none rounded-l-md py-2 px-4 text-sm flex-1 text-black mb-2 sm:mb-0 sm:rounded-r-none"
    />
    <button className="bg-white text-black border-none rounded-r-md py-2 px-4 text-sm hover:bg-gray-700 transition-colors sm:rounded-l-none sm:rounded-r-md">
      SUBSCRIBE
    </button>
  </div>
</div> */}

        </div>
      
      </div>
      <div className="mt-8 text-center text-sm text-white">
        <p>&copy; 2024 Sagey. All rights revered</p>
      </div>
    </footer>
  );
}

export default Footer;