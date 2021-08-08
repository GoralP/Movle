import React from "react";
import { Navigation } from "../components";
import { Footer } from "../components";

const PrivacyPolicy = () => {
  return (
    <div className="container-fluid">
      <Navigation />
      <section className="buyer-browse-image all-image">PRIVACY POLICY</section>
      <div className="main-criteria-bg">
        <div className="container py-5">
          <p className="recent-search">PRIVACY POLICY</p>
          <div className="line"></div>
          <p className="mt-4 condition-text">
            This Privacy Policy, together with the Terms of Use posted on our
            Website, set forth the general rules and policies governing your use
            of our Website. Depending on your activities when visiting our
            Website, you may be required to agree to additional terms and
            conditions.
          </p>
          <p className="condition-text">
            We generally keep this Privacy Policy posted on the Website and you
            should review it frequently, as it may change from time to time
            without notice. Any changes will be effective immediately upon the
            posting of the revised Privacy Policy.
          </p>
          <p className="condition-text">
            Our Website typically collects two kinds of information about you:
            information that you provide which personally identifies you; and
            information that does not personally identify you which we
            automatically collect when you visit our Website or that you provide
            us.
          </p>
          <p>
            <strong>Personally Identifiable Information</strong>
          </p>
          <p className="condition-text">
            Our definition of personally identifiable information includes any
            information that may be used to specifically identify or contact
            you, such as your name, address, e-mail address, phone number, etc.
            As a general policy, to facilitate the use of FreeWebTemplates.com
            content, you must provide personally identifiable information when
            registering. Affiliates of FreeWebTemplates.com may also be required
            to provide a tax identification number.
          </p>
          <p className="condition-text">
            The app does use third party services that may collect information
            used to identify you. [You can mention Google services here and link
            to Google's privacy policy if you want].
          </p>
          <p>
            <strong>Non-Personal Information:</strong>
          </p>
          <p className="condition-text">
            Our definition of non-personal information is any information that
            does not personally identify you. Non-personal information can
            include certain personally identifiable information that has been
            de-identified; that is, information that has been rendered
            anonymous. We obtain non-personal information about you from
            information that you provide us, either separately or together with
            your personally identifiable information. We also automatically
            collect certain non-personal information from you when you access
            our Websites.
          </p>

          <p>
            <strong>Cookies</strong>
          </p>
          <p className="condition-text">
            "Cookies" are small text files from a website that are stored on
            your hard drive. These text files make using our Website more
            convenient by, among other things, saving your passwords and
            preferences for you. Cookies themselves do not typically contain any
            personally identifiable information. We may analyze the information
            derived from these cookies and match this information with data
            provided by you or another party.
          </p>
          <p className="condition-text">
            Check if this is true for your app, if unsure, just assume that you
            do use cookies and modify this next line This Services does not uses
            these “cookies” explicitly. However, the app may use third party
            code and libraries that use “cookies” to collection information and
            to improve their services. You have the option to either accept or
            refuse these cookies, and know when a cookie is being sent to your
            device. If you choose to refuse our cookies, you may not be able to
            use some portions of this Service.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
