import React from "react";
import Moment from "react-moment";

const Comments = ({ comments }) => {
  return (
    <div className="ca-comments-wrap">
      <h1 className="ca-count">Total: {comments.length}</h1>
      {comments.map((comment) => (
        <div key={comment.id} className="ca-comment">
          <div className="ca-comment-container">
            <div className="ca-comment-info">
              <span className="ca-comment-name">{comment.name}</span> |{" "}
              <Moment format="ddd MMM Do YYYY @h:mm A">
                {comment.created_at}
              </Moment>
            </div>

            <p className="ca-comment-content">{comment.content}</p>
          </div>
        </div>
      ))}
      {!comments.length && (
        <div className="ca-comment">
          <div className="ca-comment-container">
            <h1 className="ca-comment-first">Be the First to Comment</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
