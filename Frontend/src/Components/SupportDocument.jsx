import React from 'react'

function SupportDocument() {
  return (
    <>
      <section className="relative mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h1 className="mb-10 text-6xl font-bold text-[#ae7aff]">Support</h1>
          <h2 className="mb-4 text-4xl font-bold">We're here to help</h2>
          <h3 className="text-gray-300">
            If you're experiencing any issues with videoTube or have questions,
            you've come to the right place. Below, you'll find answers to
            commonly asked questions and how to reach us for additional help.
          </h3>
        </div>

        <div className="mb-8">
          <p className="mb-4 text-gray-300">
            At videoTube, we strive to ensure that our users have the best
            experience possible. Whether you need assistance with technical
            issues or have general inquiries, we're here to guide you through it
            all.
          </p>
          <p className="mb-4 text-gray-300">
            Below are detailed sections that address common support topics such
            as account issues, video uploading problems, and more. If your
            question isn't answered here, feel free to reach out to our support
            team directly.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
            Frequently Asked Questions (FAQs)
          </h3>
          <p className="mb-4 text-gray-300">
            <strong>Q: How do I reset my password?</strong>
            <br />
            A: To reset your password, go to the login page and click on the
            "Forgot Password" link. Follow the instructions to receive a
            password reset link via email.
          </p>
          <p className="mb-4 text-gray-300">
            <strong>Q: How can I upload a video?</strong>
            <br />
            A: After logging in, go to the dashboard and click on the "Upload"
            button at the top of the page. Follow the prompts to select your
            video file and fill in the necessary details.
          </p>
          <p className="mb-4 text-gray-300">
            <strong>
              Q: My video is taking too long to upload. What should I do?
            </strong>
            <br />
            A: Ensure that your internet connection is stable. If the issue
            persists, try uploading a smaller video file or contact our support
            team for assistance.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
            Troubleshooting Common Issues
          </h3>
          <p className="mb-4 text-gray-300">
            If you're facing technical difficulties, try the following steps:
          </p>
          <ul className="list-disc list-inside text-gray-300">
            <li>Check your internet connection to ensure it's stable.</li>
            <li>Clear your browser's cache and cookies.</li>
            <li>
              Try using a different web browser or device to see if the issue
              persists.
            </li>
            <li>
              Make sure you're using the latest version of your web browser.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
            Contact Us
          </h3>
          <p className="mb-4 text-gray-300">
            If the above solutions don’t resolve your issue, please don't
            hesitate to reach out to our support team. We're available 24/7 to
            help with any problems or questions you may have.
          </p>
          <ol className="list-decimal pl-4 text-gray-300">
            <li>
              Email:{" "}
              <a href="mailto:support@videotube.com" className="text-blue-500">
                support@videotube.com
              </a>
            </li>
            <li>Phone: (123) 456-7890</li>
            <li>
              Live Chat: Click on the chat icon at the bottom right of this page
              to start a live conversation with one of our support
              representatives.
            </li>
          </ol>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
            Our Commitment to You
          </h3>
          <p className="mb-4 text-gray-300">
            At videoTube, your satisfaction is our top priority. We are
            committed to providing you with timely and effective support. We
            value your feedback, so feel free to share any suggestions to help
            us improve your experience.
          </p>
        </div>
      </section>
    </>
  );
}

export default SupportDocument
