// // // const http = require('http');


// // // let server = http.createServer((request, response)=>{
// // // 	if (request.url === '/'){
// // // 		response.writeHead(200,{'content-type' : 'text/html'});
// // // 		response.write('<html><body><h1>Hello World</h1><p>This is root page</p></body></html>')
// // // 		response.end();
// // // 	}else if(request.url === '/profile'){
// // // 		response.writeHead(200,{'content-type' : 'text/html'});
// // // 		response.write('<html><body><h1>Hello Iims</h1><p>This is iims page</p></body></html>')
// // // 		response.end();
// // // 	}	
// // // 	else{
// // // 		response.writeHead(404,{'content-type': 'text'/'html'});
// // // 		response.write('<html><body><h1>404 Page not found</h1><p></body></html>')
// // // 	}
// // // });

// // // server.listen(8000);
// // // console.log('Server is running on port:', 8000);

// // const express = require('express');
// // var bodyParser = require('body-parser');

// // const app = express();
// // const port = 8000;


// // let blogs = [{
// // 	id : 1,
// // 	title : 'hello'
// // }
// // {
// // 	id : 2,
// // 	title : 'world'
// // }];


// // app.listen(port, () => {
// // 	console.log(`Application running on port: ${port}`);
// // })


// const mongoose = require('mongoose');
// const express = require('express');


// const bodyParser = require('body-parser');
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("mongodb connected");
  
// });


// const app = express();
// const port = 8000;

// let blogs = []; //{id:1, title: ''}


// app.use(bodyParser.json());
// app.set('view engine', 'ejs');


// // query all stored blogs
// app.get('/blog',(req, resp) => {
// 	resp.json(blogs);
// });

// // store a blog
// app.post('/blog',(req, res) => {
// 	// let {title} = req.body;
// 	let title = req.body.title;
// 	let data = {
// 		id: blogs.length + 1,
// 		title: title
// 	}
// 	blogs.push(data)
// 	res.json(data);
// });

// // Update a blog by id
// app.put('/blog/:id',(req, res) => {

// 	let blog = blogs.filter((value, index) => {
// 		return value.id === parseInt(req.params.id)
// 	});
// 	if(!blog[0]){
// 		return res.status(404).json({error: 'Data not found'});
// 	}
// 	let title = req.body.title;
// 	blogs.forEach((value, index) => {
// 		if(value.id === parseInt(req.params.id)){
// 			blogs[index].title = title;
// 		}
// 	})
// 	res.json({id: req.params.id, title:title});
// });

// // query a blog through given id
// app.get('/blog/:id', (req, res) => {
// 	let data = blogs.filter((value) => value.id === parseInt(req.params.id));
// 	if(!data[0]){
// 		return res.status(404).json({error: 'Data not found'});
// 	}
// 	res.json(data[0]);
// })

// // delete a blog by given id
// app.delete('/blog/:id', (req, res) => {
// 	let blog = blogs.filter((value, index) => {
// 		return value.id === parseInt(req.params.id)
// 	});
// 	if(!blog[0]){
// 		return res.status(404).json({error: 'Data not found'});
// 	}
// 	let deleteIndex;
// 	blogs.forEach((value, index) => {
// 		if(value.id === parseInt(req.params.id)){
// 			deleteIndex = index;
// 		}
// 	})
// 	blogs.splice(deleteIndex, 1);
// 	res.status(204).json({});
// })

// app.listen(port, () => {
// 	console.log(`Application is running on port: ${port}`);
// })






const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index.js');
const webRoutes = require('./routes/web.js');


const app = express();
const port = 8000;
let blogs = []; //{id:1, title: ''}


app.use(bodyParser.json());
app.set('view engine','ejs');

app.use((req, resp, next)=> {
	console.log('this is middleware example');
	next();
})
app.use('/api', apiRoutes);
app.use('/', webRoutes);


app.listen(port, () => {
	console.log(`Application is running on port: ${port}`);
})

module.exports =app

