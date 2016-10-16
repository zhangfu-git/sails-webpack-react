import React from 'react'
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import Pager from './Pager';
import Server from '../../../js/server';


var MessageBoard = React.createClass({
  getInitialState : function(){
    return {
      messages: [],
      lastPage: false,
      firstPage: true
    }
  },
  submitMessage: function(author, content){
    var time = new Date();
    var me = this;
    Server({
      method: 'post',
      url: '/messages/postMessage',
      data: { author: author, content: content, time: time},
      success: function(data){
        console.log(data)
        me.listMessage();
      },
      error: function(error){
        console.log(error)
      }
    })
  },
  listMessage: function(page){
    if(page === 1){
      this.state.firstPage = true;
    }else{
      this.state.firstPage = false;
    }
    const me = this;
    Server({
      url: '/messages/getMessage',
      data: { page: page, limit: 3},
      success: function(data){
        var result = JSON.parse(data);
        if(result.length < 3){
          me.setState({
            lastPage: true
          })
        }else{
          me.setState({
            lastPage: false
          })
        }
        me.setState({
          messages: result
        })
      },
      error: function(error){
        console.log('请求失败返回状态码', error)
      }
    })
  },
  componentDidMount: function(){
    this.listMessage(1);
  },
  render: function(){
    var pager_props = {
      listMessage : this.listMessage,
      lastPage: this.state.lastPage,
      firstPage: this.state.firstPage
    };
    return (
      <div>
        <MessageForm submitMessage = {this.submitMessage}/>
        <MessageList messages = {this.state.messages}/>
        <Pager {...pager_props}/>
      </div>
    )
  }
})

export default MessageBoard
