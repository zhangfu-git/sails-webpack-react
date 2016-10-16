import React from 'react'
import Addons from 'react-addons'


const Pager = React.createClass({
  getInitialState : function(){
    return{
      page: 1
    }
  },
  clickHandler: function(newPage){
    this.props.listMessage(newPage)
  },
  Increase: function(){
    var newPage = this.state.page + 1;
    this.setState({page: newPage});
    this.clickHandler(newPage);
  },
  Reduction: function(){
    var newPage = this.state.page - 1;
    this.setState({page: newPage});
    this.clickHandler(newPage);
  },
  render: function(){
    let cx = Addons.classSet;
    let preClass = cx({
      'previous':true,
      'disabled': this.props.firstPage == true
    });

    var nextClass = cx({
      'next': true,
      'disabled': this.props.lastPage == true
    });

    return(
      <ul className="pager">
        <li className={preClass} onClick={this.Reduction}>
          <a href="#" >Prev</a>
        </li>
        <li>
          <span>{this.props.page}/{this.props.page}</span>
        </li>
        <li className={nextClass} onClick={this.Increase}>
          <a href="#">Next</a>
        </li>
      </ul>
    )

  }
})

export default Pager;
