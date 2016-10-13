import React from 'react'
import ReactDOM from 'react-dom'

var Hello = React.createClass({
  render: () => {
    return(
      <div>hello world hahah</div>
    )
  }
})

ReactDOM.render(
  <Hello/>,
  document.getElementById('root')
)
