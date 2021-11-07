import React from 'react'
import { httpRequest } from '../../helpers/httpRequest';
import { errorToast, successToast } from '../../helpers/toastMessages';
class CommentBox extends React.Component {
    constructor() {
      super();
      
      this.state = {
        showComments: false,
        comments: [
          
        ]
      };
    }
    
    render () {
      const comments = this._getComments();
      let commentNodes;
      let buttonText = 'Show Comments';
      
      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list overflow-scroll h-96">{comments}</div>;
      }
      
      return(
        <div className="comment-box p-3 m-3">
          <h2>Join the Discussion!</h2>
          <CommentForm className="border-blue-700" addComment={this._addComment.bind(this)}/>
          <button id="comment-reveal" className="bg-buttonColor rounded p-2 text-white" onClick={this._handleClick.bind(this)}>
            {buttonText}
          </button>
          <h3>Comments</h3>
          <h4 className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </h4>
          {commentNodes}
        </div>  
      );
    } // end render
    
   async _addComment(userName, body) {
      const comment = {
        eventId:this.props.eventId,
        userName,
        comment:body
      };
      const res =  await httpRequest("POST",`/comments/save`,comment);
      if(res.error){
      }
      else{
        successToast("Comment Saved !!")
        this._updateState();
      }
    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    async _updateState(){
      const res =  await httpRequest("GET",`comments/findByEventId/${this.props.eventId}`);
      this.setState({comments:res.response.data.data}) ;
    }
    async componentWillMount(){
      const res =  await httpRequest("GET",`comments/findByEventId/${this.props.eventId}`);
      this.setState({comments:res.response.data.data}) ;
    }
    _getComments() {   
      return this.state.comments.map((comment) => { 
        return (
          <Comment 
            userName={comment.userName} 
            comment={comment.comment} 
            key={comment.id} />
        ); 
      });
    }
    
    _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  } // end CommentBox component
  
  class CommentForm extends React.Component {
    render() {
      return (
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="comment-form-fields">
            <input placeholder="Name" id="commentname" required ref={(input) => this._author = input}></input><br />
            <textarea placeholder="Comment" id="commentMessage" rows="4" required ref={(textarea) => this._comment = textarea}></textarea>
          </div>
          <div className="comment-form-actions">
            <button className="bg-buttonColor rounded p-2 text-white" type="submit">Post Comment</button>
          </div>
        </form>
      );
    } // end render
    
    _handleSubmit(event) { 
      event.preventDefault();   // prevents page from reloading on submit
      let userName = this._author;
      let comment = this._comment;
      this.props.addComment(userName.value, comment.value);
      this._author.value="";
      this._comment.value="";
    }
  } // end CommentForm component
  
  class Comment extends React.Component {
    render () {
      return(
        <div className="comment p-3 bg-gray-100 rounded">
          <p className="comment-header">{this.props.userName}</p>
          <p className="comment-body border-1 rounded bg-gray-200 p-4  text-sm">{this.props.comment}</p>
        </div>
      );
    }
  }

  export {CommentBox}