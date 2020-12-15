import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Moment from "react-moment";

import UnderlineLink from "../components/link/underline";

const Article = ({ article }) => {
  return (
    <div
      className="ca-article"
      data-cursor-text="See Post"
      data-cursor="var(--color-blog)"
    >
      <h1 className="ca-article-title">{article.title}</h1>

      <div
        className="ca-article-link-wrap"
        onClick={() => {
          window.sessionStorage.setItem("scroll", "false");
        }}
      >
        <Link className="ca-article-link" to={`/blog/${article.slug}`}>
          <Img
            alt={article.title}
            fluid={article.image.childImageSharp.fluid}
          />
        </Link>
      </div>

      <div className="ca-article-info">
        <Moment format="MMM DD, YYYY">{article.publishedAt}</Moment> |{" "}
        <UnderlineLink to={`/blog/author/${article.author.slug}`}>
          {article.author.name}
        </UnderlineLink>{" "}
        |{" "}
        <UnderlineLink to={`/blog/category/${article.category.name}`}>
          {article.category.name}
        </UnderlineLink>
      </div>
    </div>
  );
};

export default Article;
