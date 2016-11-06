// import React, { Component } from 'react';
// import Konva from 'konva';
// import ReactDOM from 'react-dom';

// export default class App extends Component {

// 	constructor(props){
// 		super(props)

//       this.state = {
//       	stage: null,
//       	layer: null
//       }
      

// 	}

// 	//var stage = Konva.Node.create(json, 'container');

//  componentDidMount() {
//         // this.testKonva();
//         // console.log(document.getElementById('wrap').clientWidth)
         
//          this.setState(
//          	{
//          // 	stage: new Konva.Stage({
// 	        // container: 'wrap',
// 	        // width: 1200,
// 	        // height: 700

//          //     }),

//             stage: localStorage.getItem("canvas") == null ? new Konva.Stage({container: 'wrap', width: 1200, height: 700}) : Konva.Node.create(localStorage.getItem("canvas"), 'wrap'),

//          	layer: new Konva.Layer()

//             })

//      //    var stage = new Konva.Stage({
//      //    container: 'wrap',
//      //    width: 1200,
//      //    height: 700

//      // });
//     }


// // testKonva(){
// //    var stage = new Konva.Stage({
// //         container: 'wrap',
// //         width: 1200,
// //         height: 700

// //     });

 

// //     // add canvas element 
// //       var layer = new Konva.Layer();

// //       var box = new Konva.Circle({
// //         x: 100,
// //         y: 100,
// //         width: 25,
// //         height: 25,
// //         fill: '#00D2FF',
// //         stroke: 'black',
// //         strokeWidth: 4,
// //         draggable: true,
// //         dragBoundFunc: function(pos) {


// //             return {
// //                 x: Math.min(stage.getWidth()-20, Math.max(20, pos.x)),
// //                 y: Math.min(stage.getHeight()-20, Math.max(20, pos.y)),
// //             };
// //         }
// //     });

// //     box.on('mouseover', function() {
// //         document.body.style.cursor = 'pointer';
// //     });
    
// //     box.on('mouseout', function() {
// //         document.body.style.cursor = 'default';
// //     });  

// //      box.on('click', function() {
// //         this.setStrokeWidth(20);
// //         layer.draw();
// //         console.log(this.getFill())
// //     }); 

// //     layer.add(box);
 
// //     layer.draw();
    
// //     stage.add(layer);
// // }



//   addSeat(){
 
//       // var name = ReactDOM.findDOMNode(this.refs.name).value.trim()

   
//       var box = new Konva.Circle({
//         x: 100,
//         y: 100,
//         width: 25,
//         height: 25,
//         fill: '#00D2FF',
//         stroke: 'black',
//         strokeWidth: 4,
//         // name: name,
//         draggable: true,
//         dragBoundFunc: (pos) => {


//             return {
//                 x: Math.min(this.state.stage.getWidth()-20, Math.max(20, pos.x)),
//                 y: Math.min(this.state.stage.getHeight()-20, Math.max(20, pos.y)),
//             };
//         }
//     });

//       this.state.layer.add(box);
 
//       this.state.layer.draw();
    
//       this.state.stage.add(this.state.layer);
//       // var str = JSON.stringify(this.state.layer.children);
//       // console.log(str);
//       // console.log(JSON.parse(str))

//       var json = this.state.stage.toJSON();

//       console.log(this.state.stage);
      
//       localStorage.setItem("canvas", json);

//    }




//   render() {
//     return (
//       <div>
//       	<h1>Works</h1>
//         <input type="text" ref="name" />  
//       	<button onClick={::this.addSeat}>Create new Seat</button>
//         <div id="wrap"></div>
//       </div>
//     );
//   }
// }



// // import {fabric} from 'fabric';

// // export default class App extends Component{
   
// //    constructor(props){
// //        super(props);

// //        this.state = { canvas: null }
// //    }




// //    componentDidMount(){
   
// //   	//var canvas = new fabric.Canvas('c');

// //    this.setState({canvas: new fabric.Canvas('c') })


   
// //    	//console.log(canvas)
// //    }


// //    addSeat(){
  
// //     // var canvas = new fabric.Canvas('c');

// //    	var rect = new fabric.Rect({
// // 		  left: 100,
// // 		  top: 100,
// // 		  fill: 'red',
// // 		  width: 20,
// // 		  height: 20
// // 		});

// //    	rect.name = "MAXIM";




// //    	this.state.canvas.add(rect);
// //    	console.log(this.state.canvas.getObjects());
// //    }

  
   
 
     
// //      render() {
	    
// // 	    return (
// // 	      <div>
// // 	      	<h1>Works</h1>
	      
// // 	      	<button onClick={::this.addSeat}>Create new Seat</button>
// // 	        <canvas width="1000" height="700" id="c"></canvas>
// // 	      </div>
// // 	    )
// //     }
// // }