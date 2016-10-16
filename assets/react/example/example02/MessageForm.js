
import React from 'react';
import ReactDOM from 'react-dom'

var MessageForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var content = this.refs.content.value.trim();

    this.props.submitMessage(author, content);
    this.refs.author.value = '';
    this.refs.content.value = '';
  },
  render: function(){
    return (
      <div className="well">
        <h4>Leave a Message:</h4>
        <div role="form">
          <div className="form-group">
            <input ref="author" className="form-control" placeholder = "name"/>
          </div>
          <div className="form-group">
            <textarea className="form-control" ref="content" rows="3"></textarea>
          </div>
          <a className="btn btn-success" onClick = {this.handleSubmit}>提交</a>
        </div>
      </div>
    )
  }
})

export default MessageForm;
