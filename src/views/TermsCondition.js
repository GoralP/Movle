import React from "react";
import { Navigation } from "../components";
import { Footer } from "../components";

const TermsCondition = () => {
  return (
    <div className="container-fluid">
      <Navigation />
      <section className="buyer-browse-image all-image">
        TERMS AND CONDITIONS
      </section>
      <div className="main-criteria-bg">
        <div className="container py-5">
          <p className="recent-search">TERMS AND CONDITIONS</p>
          <div className="line"></div>
          <p className="mt-4 condition-text">
            These Website Standard Terms And Conditions (these “Terms” or these
            “Website Standard Terms And Conditions”) contained herein on this
            webpage, shall govern your use of this website, including all pages
            within this website (collectively referred to herein below as this
            “Website”). These Terms apply in full force and effect to your use
            of this Website and by using this Website, you expressly accept all
            terms and conditions contained herein in full. You must not use this
            Website, if you have any objection to any of these Website Standard
            Terms And Conditions.
          </p>

          <p>
            <strong>Your Content</strong>
          </p>
          <p className="condition-text">
            In these Website Standard Terms And Conditions, “Your Content” shall
            mean any audio, video, text, images or other material you choose to
            display on this Website. With respect to Your Content, by displaying
            it, you grant [Sender.Company] a non-exclusive, worldwide,
            irrevocable, royalty-free, sublicensable license to use, reproduce,
            adapt, publish, translate and distribute it in any and all media.
          </p>

          <p>
            <strong>No warranties</strong>
          </p>
          <p className="condition-text">
            This Website is provided “as is,” with all faults, and
            [Sender.Company] makes no express or implied representations or
            warranties, of any kind related to this Website or the materials
            contained on this Website. Additionally, nothing contained on this
            Website shall be construed as providing consult or advice to you.
          </p>

          <p>
            <strong>Limitation of liability</strong>
          </p>
          <p className="condition-text">
            In no event shall [Sender.Company] , nor any of its officers,
            directors and employees, be liable to you for anything arising out
            of or in any way connected with your use of this Website, whether
            such liability is under contract, tort or otherwise, and
            [Sender.Company] , including its officers, directors and employees
            shall not be liable for any indirect, consequential or special
            liability arising out of or in any way related to your use of this
            Website.
          </p>
          <p>
            <strong>Indemnification</strong>
          </p>
          <p className="condition-text">
            You hereby indemnify to the fullest extent [Sender.Company] from and
            against any and all liabilities, costs, demands, causes of action,
            damages and expenses (including reasonable attorney’s fees) arising
            out of or in any way related to your breach of any of the provisions
            of these Terms.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsCondition;
