'use strict';

var React = require('react');
var cx = require('classnames');
var PopupWindow = require('../public/modals/PopupWindow.jsx');

var MainApp = React.createClass({

	getInitialState: function() {
		return {
			cards:10,
			grow: false,
			section: 'something',
			open: false,
		};
	},

	makeBoxMenu: function() {
		var grow = cx({
			'menu-card': true,
			'open': this.state.open
		});

		var cardArray = [];

		for (var i = 0; i < this.state.cards; i++) {

			cardArray.push(
				<div className='single-card-box'id={i} key={i}>
					<PopupWindow className={grow} id={i} section={this.state.section}/> 
				</div>
			);
		}

		return cardArray;
	},


	toggleMenu: function(e) {
		e.preventDefault();
		this.setState({
			open: !this.state.open 
		});

	},
	

	render: function() {

		var menuButton = cx({
			'menu-button': true,
			'fa fa-th': true,
			"open": this.state.open,

		});
		var menuCardBox = cx({
			'menu-card-box': true,
			'open': this.state.open
		});

		return (
			<div className="main-body">
				<header className="header"> 
					<h1 className="welcome">Welcome.</h1>	
					<div className='button-box'>
						<i onClick={this.toggleMenu} className={menuButton} />	
					</div>
				</header>
				<div className="content-box">
					<div className={menuCardBox}>
						{this.makeBoxMenu()}
					</div>
						
				</div>
			</div>	
		);
	}
});

module.exports = MainApp;
