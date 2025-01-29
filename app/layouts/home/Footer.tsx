import { Link } from 'react-router';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

const footerColumns = [
  {
    title: 'Explore',
    items: [
      { name: 'Home', link: '/' },
      { name: 'Products', link: '/products' },
      { name: 'Reviews', link: '/reviews' },
      { name: 'Sign In', link: '/signIn' },
      { name: 'Create Account', link: '/signUp' },
    ],
  },
];

const socialLinks = [
  { icon: FaFacebook, link: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, link: 'https://instagram.com', label: 'Instagram' },
  { icon: FaTwitter, link: 'https://twitter.com', label: 'Twitter' },
];

function Footer() {
  return (
    <footer className="mt-10 w-full bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-10 md:px-8 lg:px-16">
        {/* Logo & Quick Links */}
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <MdCategory className="h-10 w-auto text-primary" />
            <div className="rounded-xl bg-gradient-to-r from-primary to-secondary px-3 py-1 text-center text-2xl font-bold">
              FR
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-start gap-10">
            {footerColumns.map((column, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center"
              >
                {/* <p className="mb-4 text-lg font-semibold">{column.title}</p> */}
                <ul className="flex flex-col items-center justify-center gap-4 text-sm md:flex-row">
                  {column.items.map((item, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        to={item.link}
                        className="text-gray-300 transition-all hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex justify-center space-x-4">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-all hover:bg-primary"
            >
              <social.icon className="text-white" size={20} />
            </a>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 border-t border-gray-700 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Frencho Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
