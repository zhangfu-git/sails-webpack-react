import React from  'react'


const Message = React.createClass({
  render: function(){
    var msg = this.props.Message;
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className="text-danger"><b>{msg.author}</b></span>在 {msg.time.toLocaleString()}留言:
        </div>
        <div className="panel-body">
          {msg.content}
        </div>
      </div>
    )
  }
});

export default Message;
