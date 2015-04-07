var React = require("react/addons");
var CSSAnim = require("./cssAnim");
var cx = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
React.initializeTouchEvents(true);


// var DATA = [
//             {url: '/bieber_square.jpg', text: 'Will they get back together in 2015?', key: 8, animation_class: "",left: false, right: false},
//             {url: '/one_direction_square.png', text: 'Will they break up this year?', key: 9, animation_class: "",left: false, right: false},
//             {url: '/david-cameron_square.jpg', text: "Will he be PM after the election?", key: 10, animation_class: "", left: false, right: false},
//             {url: '/kim-jong-un_square.jpg', text: 'Will Kim die this year?', key: 3, animation_class: "",left: false, right: false},
//             {url: '/is_square.jpg', text: "Will IS lose the city of Mosul this summer?", key: 1, animation_class: "", left: false, right: false},
//             {url: '/saudi_square.png', text: 'Will Saudi Arabia invade Yemen this month?', key: 2, animation_class: "",left: false, right: false},
//             {url: '/ronaldo_square.jpg', text: "Will Real Madrid win the Champions League 2015?", key: 4, animation_class: "", left: false, right: false},
//             {url: '/sterling_square.jpg', text: 'Will Raheem Sterling leave Liverpool this summer?', key: 5, animation_class: "",left: false, right: false},
//             {url: '/manu_square.jpg', text: "Will Man Utd finish second in the Premier League?", key: 6, animation_class: "",left: false, right: false},
//             {url: '/boxing_square.jpg', text: 'Will Mayweather beat Pacquiao?', key: 7, animation_class: "",left: false, right: false}
// ];

// var MainBox = React.createClass({

//     getInitialState: function(){
//         var active = DATA.length - 1;
//         return  {
//             data: DATA,
//             active: active
//         };
//     },

//     handleTouchMove: function(e){
//         var lastX = e.touches[0].pageX;
//         this.setState({lastX: lastX});
//     },

//     handleTouchStart: function(e){
//         var firstX = e.touches[0].pageX;
//         this.setState({firstX: firstX});
//     },

//     onTouchEnd: function(image){
//         var didSwipe = false;
//         var swipe = "";
//         var newData = this.state.data;
//         var image_number = this.state.data.indexOf(image);

//         if(this.state.firstX - this.state.lastX > 75) {
//             didSwipe = true;
//             swipe = 'swipe-left';
//             newData[image_number].left = true;
//         } else if (this.state.firstX - this.state.lastX < -75) {
//             didSwipe = true;
//             newData[image_number].right = true;
//         }

//         newData[image_number].animation_class = swipe;
//         new_active = image_number - 1;

//         var newStateObj = {};
//         newStateObj.data = newData;
//         newStateObj.active = new_active;

//         if (didSwipe){
//             newStateObj.swipe = {};
//             newStateObj.swipe.left = "";
//             newStateObj.swipe.right = "";
//         }

//         this.setState(newStateObj);
//     },

//     render: function() {
//         return(
//         <div className="mainBox">
//             <PredictionBox  active={this.state.active}
//                             data={this.props.data}
//                             onTouchEnd={this.onTouchEnd}
//                             handleTouchStart={this.handleTouchStart}
//                             handleTouchMove={this.handleTouchMove}/>
//             <MenuBox />
//         </div>
//         );
//     }
// });


// var PredictionBox = React.createClass({
//     render: function() {
//         return(
//             <div className="predictionBox">
//                 <TextBox data={this.props.data} active={this.props.active}/>

//                 <ImageBox   data={this.props.data}
//                             onTouchEnd={this.props.onTouchEnd}
//                             handleTouchStart={this.props.handleTouchStart}
//                             handleTouchMove={this.props.handleTouchMove}/>
//             </div>
//         );
//     }
// });


// var MenuBox = React.createClass({
//     render: function() {
//         return(
//             <div className="menuBox">
//                 My Profile 23 | Read article | Categories
//             </div>
//             );
//     }
// });


// var TextBox = React.createClass({
//     render: function() {
//         if (this.props.active < 0) {
//             return(
//                 <div className="textBox">
//                     Load more stories...
//                 </div>
//             );
//         } else {

//         return(
//             <div className="textBox">
//                 {this.props.data[this.props.active].text}
//             </div>
//             );
//         }
//     }
// });


// var ImageBox = React.createClass({

//     render: function() {
//         var that = this;
//         var images = this.props.data.map(function(image, i){
//         if (image.left){
//             var no_style = {
//                 opacity: 1
//             };
//         }
//         if (image.right){
//             var yes_style = {
//                 opacity: 1
//             };
//         }

//            return (
//                 <div key={that.props.data.key}>

//                     <div
//                         className={image.animation_class}
//                         onTouchMove={that.props.handleTouchMove}
//                         onTouchEnd={that.props.onTouchEnd.bind(null,image)}
//                         onTouchStart={that.props.handleTouchStart}>
//                     <div style={yes_style} className='yes_stamp'>Yes</div>
//                     <div style={no_style} className='no_stamp'>No</div>
//                     <img className="predictionImg" src={image.url} /></div>
//                 </div>
//             );
//         }.bind(this));


//         return(
//             <div className="imageBox" >
//             <ReactCSSTransitionGroup transitionName="swipe">
//                 {images}
//             </ReactCSSTransitionGroup>

//             </div>
//         );
//     }
// });




React.render(
    <CSSAnim text={"hi m9"}/>,
    document.getElementById("content")
    );
