import React from "react";

const Footer = () => {
  return (
    <footer className="py-3 bg-primary text-center text-light">
      All rights reserved &copy; {new Date().getFullYear()};
    </footer>
  );
};

export default Footer;
