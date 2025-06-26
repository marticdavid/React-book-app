import React from 'react'

function Footer() {
  return (
    <footer className="border-slate-700 bg-gradient-to-r from-[#000080] to-[#2294ff] text-white shadow p-4 flex justify-center items-center">
      <p className="text-center">
        <strong className="text-white text-lg">Book App</strong>
        <br />
        <span className="text-white font-normal text-base font-sans">
          <strong className="text-center">
            Copyright &copy; 2025 Book App. All rights reserved.
          </strong>
        </span>
      </p>
    </footer>
  );
}

export default Footer;