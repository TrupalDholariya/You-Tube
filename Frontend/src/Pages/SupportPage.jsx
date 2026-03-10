import React from 'react'
import Footer from '../Components/Footer/Footer';
import SupportDocument from '../Components/SupportDocument';

function SupportPage() {
  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <SupportDocument />
        <Footer />
      </div>
    </>
  );
}

export default SupportPage
