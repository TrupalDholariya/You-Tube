import React from 'react'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import MiddleSectionForPrivacyPolicy from '../Components/MiddleSectionForPrivacyPolicy';

function PrivacyPolicyPage() {
  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <MiddleSectionForPrivacyPolicy />
        <Footer />
      </div>
    </>
  );
}

export default PrivacyPolicyPage
