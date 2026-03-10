import React from 'react'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import TermAndCondition from '../Components/TermAndCondition';

function TermsAndConditionPage() {
  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        {/* <Header /> */}
        <TermAndCondition />
        <Footer />
      </div>
    </>
  );
}

export default TermsAndConditionPage
