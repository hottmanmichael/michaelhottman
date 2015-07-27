'use strict';
var React = require('react/addons');

module.exports = React.createClass({
  getDefaultProps: function(){
    return {
      close: function(){},
      isOpen: false,
      transition:200
    }
  },
  portal:false,
  render: function(){
    return null;
  },
  componentDidMount: function(){
    if(this.props.isOpen){
      this.mount(this.props);
    }
  },
  hide: function(callback){
    if(this.portal){
      this.portal.className = 'modal fade out';
      if(typeof(callback)=='function'){
        setTimeout(callback,this.props.transition);
      }
    }
  },
  show: function(callback){
    if(this.portal){
      this.portal.className = 'modal fade in';
      if(typeof(callback)=='function'){
        setTimeout(callback,this.props.transition);
      }
    }
  },
  handleClick: function(e){
    if(e.target.className=='modal-backdrop'){
      this.unmount();
    }
  },
  mount: function(props){
    if(!this.portal){
      this.portal = document.createElement('div');
      this.portal.className='modal fade';
      document.body.appendChild(this.portal);
    }
    this.doRender(props);
    setTimeout(this.show,10);
  },
  doRender: function(props){
    React.render(<div style={{ overflow: 'auto' }} onClick={this.handleClick} className="modal-backdrop"><div {...props}>{props.children}</div></div>, this.portal);
  },
  unmount: function(){
    this.hide(function(){
      React.unmountComponentAtNode(this.portal);
      document.body.removeChild(this.portal);
      this.portal = false;
      this.props.close();
    }.bind(this));
  },
  componentWillReceiveProps: function(newProps){
    if(newProps.isOpen && !this.props.isOpen){
      this.mount(newProps);
    } else if(!newProps.isOpen && this.props.isOpen) {
      this.unmount();
    }
    else if(this.props.isOpen && newProps.isOpen) {
      this.doRender(newProps);
    }
  },
  componentWillUnmount: function(){
    this.unmount();
  }


})