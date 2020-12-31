import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Moment from "react-moment";
import Markdown from "react-markdown";

import Layout from "../components/layout";
import UnderlineLink from "../components/link/underline";
import CommentsCollection from "../components/collections/comments";
import CommentForm from "../components/form/comment";

import time from "../components/time";

const Article = ({ data }) => {
  const article = data.strapiArticle;
  const [comments, setComments] = React.useState([]);

  const fetchComments = () => {
    fetch(`${process.env.API_URL}/comments?article=${article.strapiId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        setComments(time.sortMostRecent(result));
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    fetchComments();
  }, []);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
    color: data.strapiBlogpage.seo.color,
  };

  const articleWithEdges = data.allStrapiArticle.edges.filter(
    ({ node }) => node.strapiId === article.strapiId
  );

  const unwrappedArticle = articleWithEdges.length
    ? articleWithEdges[0]
    : { previous: null, next: null };

  return (
    <Layout seo={seo}>
      <header className="ca-header">
        <div className="ca-post-header-content">
          <div className="ca-post-header-container e-con">
            <h1 className="ca-post-title">{article.title}</h1>

            <p className="ca-post-description">{article.description}</p>
          </div>
        </div>
      </header>

      <section className="ca-post">
        <div className="ca-post-content">
          <div className="ca-post-container e-con">
            <div className="ca-post-image">
              <Img
                alt={article.title}
                fluid={article.image.childImageSharp.fluid}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ca-section">
        <div className="ca-content">
          <div className="ca-container e-con">
            <div className="ca-post-info">
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

            <div className="ca-post-main">
              <div className="ca-markdown-wrap">
                <Markdown source={article.content} escapeHtml={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ca-comments">
        <div className="ca-comments-content">
          <div className="ca-comments-container e-con">
            <h1 className="ca-comments-title">Comments</h1>

            <CommentsCollection comments={comments} />

            <div className="ca-form-wrap">
              <CommentForm
                articleId={article.strapiId}
                fetchComments={fetchComments}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ca-edges">
        <div className="ca-edges-content">
          <div className="ca-edges-container e-con">
            <div className="ca-edges-split-wrap">
              {unwrappedArticle.previous && (
                <div className="ca-edges-split">
                  <UnderlineLink to={`/blog/${unwrappedArticle.previous.slug}`}>
                    Prev
                  </UnderlineLink>
                </div>
              )}

              {unwrappedArticle.next && (
                <div className="ca-edges-split">
                  <UnderlineLink to={`/blog/${unwrappedArticle.next.slug}`}>
                    Next
                  </UnderlineLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Article;

export const query = graphql`
  query ArticleQuery($slug: String!) {
    strapiArticle(slug: { eq: $slug }, status: { eq: "published" }) {
      strapiId
      title
      description
      content
      publishedAt
      image {
        publicURL
        childImageSharp {
          fluid(maxWidth: 2500, maxHeight: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      author {
        name
        headshot {
          childImageSharp {
            fixed(width: 30, height: 30) {
              src
            }
          }
        }
        slug
      }
      category {
        name
        slug
      }
    }
    allStrapiArticle(filter: { status: { eq: "published" } }) {
      edges {
        node {
          strapiId
        }
        next {
          slug
        }
        previous {
          slug
        }
      }
    }
    strapiBlogpage {
      seo {
        color {
          accent
        }
      }
    }
  }
`;
