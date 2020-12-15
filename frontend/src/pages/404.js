import React from "react";

import Layout from "../components/layout";

const NotFoundPage = () => (
  <Layout
    seo={{
      metaTitle: "404: Not found",
      metaDescription: "It looks like you got lost",
    }}
  >
    <header className="ca-header">
      <div className="ca-header-content">
        <div className="ca-header-container e-con e-cen">
          <h1 className="ca-header-title">404: NOT FOUND</h1>
          <p className="ca-not-found">
            You just hit a route that doesn't exist... the sadness.
          </p>
        </div>
      </div>
    </header>
  </Layout>
);

export default NotFoundPage;
