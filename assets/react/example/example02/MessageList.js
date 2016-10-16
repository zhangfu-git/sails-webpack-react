import React from 'react'
import Message from './Message'


const MessageList = React.createClass({
  render: function(){
    var message = this.props.messages.map(function(item){
      return <Message key={item.time}  Message={item}/>
    });
    return(
      <div>
        {message}
      </div>
    )
  }
});

export default MessageList;
