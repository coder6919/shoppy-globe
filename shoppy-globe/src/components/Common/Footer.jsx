
const Footer = () => {
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className={`${containerClass} py-8 text-sm border-t border-gray-700`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Logo & Copyright */}
          <div>
            <h3 className="text-lg font-bold text-indigo-400 mb-2">ShoppyGlobe</h3>
            <p>&copy; {new Date().getFullYear()} ShoppyGlobe E-commerce.</p>
            <p>All rights reserved.</p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-semibold mb-2">COMPANY</h4>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Careers</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* Column 3: Policy */}
          <div>
            <h4 className="font-semibold mb-2">POLICY</h4>
            <ul className="space-y-1">
              <li>Returns & Exchanges</li>
              <li>Shipping Policy</li>
              <li>Terms of Use</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-semibold mb-2">CONTACT</h4>
            <ul className="space-y-1">
              <li>Help Center</li>
              <li>Email: support@shoppyglobe.com</li>
              <li>Phone: +91 1234567890</li>
            </ul>
          </div>

        </div>
        
        <div className="mt-8 text-center pt-4 border-t border-gray-700">
            Made by Syed Saifuddin with React and Redux Toolkit.
        </div>
      </div>
    </footer>
  );
};

export default Footer;