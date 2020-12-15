import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ContactForm from "../components/form/contact";
import NewsletterForm from "../components/form/newsletter";

const ContactPage = ({ data }) => {
  return (
    <Layout seo={data.strapiContactpage.seo}>
      <header className="ca-header">
        <div className="ca-header-content">
          <div className="ca-header-container e-con">
            <h1 className="ca-header-title">
              {data.strapiContactpage.hero.title}
            </h1>
          </div>
        </div>
      </header>

      <section className="ca-contact">
        <div className="ca-contact-content">
          <div className="ca-contact-container e-con">
            <div className="ca-form-wrap">
              <h1 className="ca-form-title">General</h1>

              <p className="ca-form-text">
                If you want to drop us a message please fill out the form below
                — you can reach one of the authors directly or our general
                inbox.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="ca-contact">
        <div className="ca-contact-content">
          <div className="ca-contact-container e-con">
            <div className="ca-form-wrap">
              <h1 className="ca-form-title">Newsletter</h1>

              <p className="ca-form-text">
                If you'd like to subscribe to our newsletter send us your email
                and we'll keep you up to date with new content!
              </p>

              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <section className="ca-contact">
        <div className="ca-contact-content">
          <div className="ca-contact-container e-con">
            <div className="ca-form-wrap">
              <h1 className="ca-form-title">Support</h1>

              <p className="ca-form-text">
                For any other concerns or general support you can email us
                directly at —
              </p>

              <a
                className="ca-link-underline -large"
                href="mailto:support@career-anxiety"
              >
                support@career-anxiety
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

export const query = graphql`
  {
    strapiContactpage {
      hero {
        title
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          publicURL
        }
        color {
          accent
        }
      }
    }
  }
`;
