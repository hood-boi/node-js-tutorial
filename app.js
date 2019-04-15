'using strict'

const print = console.log;

print('---Node JS Tutorial---');

/* Feb 11 */
/*Ex-1-----------------------------------------------------------------------------*/

/*
const util = require('util');

const str = util.format('%s %s', 'csc', '309');
print(str);
*/

/*Ex-2-----------------------------------------------------------------------------*/

/*
const fs = require('fs');
fs.writeFileSync('feb11.txt', 'writing to file\n'); 
*/

/*Ex-3-----------------------------------------------------------------------------*/

/*
const course = require('./app-module').course;

course.addCourse('csc343');
course.removeCourse('csc301');
print(course.courseList);
*/

/*Ex-4-----------------------------------------------------------------------------*/

/*
const chalk = require('chalk');
print(chalk.blue('Feeling blue'));
print(chalk.blue.bgRed.bold('Hello world'));
print(chalk.bgCyan('Hello', 'world!', 'foo', 'bar'));
*/

/*Ex-5-----------------------------------------------------------------------------*/

/*
const course = require('./app-module').course;

print('Normal ARGV:');
print(process.argv); // node app hello world
const arg1 = process.argv[2];
const arg2 = process.argv[3];
print('ARG # 1 : ' + arg1); // hello
print('ARG # 2 : ' + arg2); // world

const yargs = require('yargs');
const yargs_argv = yargs.argv;
print('Yargs ARGV:');
print(yargs_argv);

if('add' in yargs_argv){ //--add [BLAH]
	course.addCourse(yargs_argv['add']);
	print(course.courseList);	
}

if('remove' in yargs_argv){
	course.removeCourse(yargs_argv['remove']);
	print(course.courseList);
}
*/

/*Ex-6-----------------------------------------------------------------------------*/

/*
const student = {
	name : 'Bob',
	year : 3,
	courses : ['csc301','csc309','csc343','phy207'],
}

const studentString = JSON.stringify(student);
print(studentString);

const fs = require('fs');
fs.writeFileSync('student.json', studentString);

const studentJSONString = fs.readFileSync('student.json');

const studentParsed = JSON.parse(studentJSONString);
print(studentParsed);
*/

/*Ex-7-----------------------------------------------------------------------------*/

/*
const fs = require('fs');

const student = {
        name : 'Bob',
        year : 3,
        courses : ['csc301','csc309','csc343','phy207'],
}

const studentS = [
	student,
	{
		name : 'Jerry',
        	year : 1,
        	courses : ['csc301','csc309','csc143','phy107'],		
	}
];

const studentsString = JSON.stringify(studentS);
print(studentsString);
fs.writeFileSync('students.json', studentsString);

const studentsJSONString = fs.readFileSync('students.json');
const studentsParsed = JSON.parse(studentsJSONString);
print(studentsParsed);
print(studentsParsed[1].name);

//Map takes in function as arg. Returns an array based on what function returns. 
const student_names = studentsParsed.map((son) => {
	return son.name;
});
print('Student Names:');
print(student_names);

const courseEnrollment = studentsParsed.reduce((enrollment, student) => {
	student.courses.map((course) => {
		if(course in enrollment){
			enrollment[course] = enrollment[course] + 1;
		}else{
			enrollment[course] = 1;
		}
	})
	return enrollment;
}, {});
print(courseEnrollment);
*/

/*Ex-8-----------------------------------------------------------------------------*/

/*
const students = [
	{name : 'Bob', year:3},
	{name : 'Kelly', year:2},
	{name : 'Randy', year:1},
	{name : 'Jimmy', year:4},
	{name : 'Betty', year:3},
	{name : 'Clara', year:1},
	{name : 'Kenny', year:2},
	{name : 'Bobby', year:3}
];

const thirdYear = [];
for(let i = 0; i < students.length; i++){
	if(students[i].year === 3){
		thirdYear.push(students[i]);
	}
}
print('Third Year:');
print(thirdYear);

//Alternative
//const thirdYears = students.reduce((turdYears, student) => {
//        if(student.year === 3){
//                turdYears.push(student);
//        }
//        return turdYears;
//}, []);

//print(thirdYears);

const studentNames = students.map( (student) => {
	return student.name;
})
print('Student Name:');
print(studentNames);
*/

/*Ex-9-Arrow Functions-------------------------------------------------------------*/

/*
const square = function(x){
	return x * x;
}

const squareA = (x) => {
	return x * x
};

print(square(5)," === ", squareA(5));

const noArgs = () => {
	return 6;
}
print('No args : ',noArgs());

const multipleArgs = (a,b) => {
	return a + b;
}

print('Multiple Args : ', multipleArgs(2,2)); 
*/

/*Ex-10-Filter Function------------------------------------------------------------*/

/*
const students = [
        {name : 'Bob', year:3},
        {name : 'Kelly', year:2},
        {name : 'Randy', year:1},
        {name : 'Jimmy', year:4},
        {name : 'Betty', year:3},
        {name : 'Clara', year:1},
        {name : 'Kenny', year:2},
        {name : 'Bobby', year:3}
];

const thirdYears = students.filter((student) => {
	return  student.year === 3;
})

print('Third Years:');
print(thirdYears);

const studentNames = students.map((student) => {
	return student.name;
})

print('Student Names');
print(studentNames);
*/

/*Ex-11-this-arrow-function-------------------------------------------------------*/

/*
const s = {
	name : 'Jimmy',
	sayName : ()=> {
		print(this.name); //Will not work. Arrow functions don't have 'this' proto
	},
	sayName2 : function(){
		print(this.name);
	},
	sayName3 : function(){
		print('Inside Function');
		(()=>{
			print(this.name);
		})();
	},
}

s.sayName();
s.sayName2();
s.sayName3();
*/

/*Ex-12-Total-Balance-Reduce-With-Arrow--------------------------------------------*/

/*
const accounts = [
	{balance : 5},
	{balance : 10},
	{balance : -3}
];

const totalBalance = accounts.reduce((accumulator, account) => {
	accumulator = accumulator + account.balance;
	return accumulator;
},0);

print('Total Balance : '+ totalBalance);
*/

/*Ex-13-Students-Library-----------------------------------------------------------*/

/*
const student = require('./app-module.js').students;

student.add('Salman', 4 , ['csc309', 'csc209', 'csc343']);

print(student.remove(3));

student.addCourse(4, 'csc369');

print(student.read());

print(student.search(1));
*/

/*Ex-14-Callback-hell--------------------------------------------------------------*/

/*
const bike_info = require('./app-module.js').bike_location;
bike_info.stationInfo(7000, (errorMessage, station)=> {
	if(errorMessage){
		print(errorMessage);
	}else{
		print(station);
		bike_info.getAddress(station.lat, station.lon, (error, station) => {
			if(error){
				print(error);
			}else{
				print(station.address);
			}
		})	
	}
});
*/

/*Ex-15-Promises-------------------------------------------------------------------*/

/*
const myPromise = new Promise((resolve, reject) => {

	setTimeout(() => {
		resolve({message : 'Promise Resolved'}) 
	}, 2000);
	
	setTimeout(() => {
                reject({message : 'Promise Rejected'})
        }, 1000);	

})

myPromise.then((result) => {
	print(result.message);
}, (error) => {
	print(error.message);
})
*/

/*Ex-16----------------------------------------------------------------------------*/

/*
const promiseSquare = (n) => {
	return new Promise((resolve, reject) => {
		setTimeout(() =>{
			if(typeof(n) === 'number'){
				resolve(n * n);
			}else{
				reject('Error. Input is not a number.');
			}
		},1000);
	});
}


//promiseSquare('4').then((result) => { // will give us undefined because it thinks we've settled everything
//        log('Squared it', result)
//        return promiseSquare(result)
//}, (error) => {
//        log(error)
//}).then((result) => {
//        log('Squared it again', result)
//        return promiseSquare(result)
//}, (error) => {
//        log(error)
//})


promiseSquare('5').then((result) => {
        print('Squared it', result)
        return promiseSquare(result)
}).then((result) => {
        print('Squared it again', result)
        return promiseSquare(result)
}).catch((error) => {
        print(error)
})

*/

/*Ex-17-Promise-Bike-Location------------------------------------------------------*/

/*
const bike_info = require('./app-module.js').bike_location;
bike_info.stationInfoP(7000).then((result) => {
	return bike_info.getAddressP(result.lat, result.lon);	
}).then((result) => {
	print(result.address);
}).catch((error) => {
	print(error);
})
*/

/*Ex-18-Expres---------------------------------------------------------------------*/

/*
//Core Modules
const path = require('path'); 

//Npm Modules
const express = require('express');
const app = express();

const directory = __dirname;
const file = __filename;

const html_path = path.join(__dirname, 'pages')

print(html_path)
app.use(express.static(html_path));

app.get('', (req, res) => {
	res.status(200).send('<h1>Root</h1>')
})

app.get('/help', (req, res) => {
	res.status(201).send('Help Page');
})

app.get('/about', (req, res) => {
        res.status(202).send('About');
})

app.get('/json', (req, res) => {
        res.status(203).send([{name : 'JSON', version : '1.0'}, {name : 'Express', version : '2.0'}]);
})

app.listen(3000, () => {
	print('Server is up on port 3000');
});
*/

/*Ex-19-Template-Engine------------------------------------------------------------*/

/*
//Core Modules
const path = require('path'); 

//Npm Modules
const express = require('express');
const app = express();

//Define Paths
const publicPath = path.join(__dirname, 'pages');
const viewsPath = path.join(__dirname, 'views');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); //Express.js view engine for handlebars.js
app.set('views', viewsPath);

// Setup static directory to server
app.use(express.static(publicPath));

app.get('', (req, res) => {
	res.render('index', {
		title : 'Weather App',
		name : 'Salman',
	});
})

app.listen(3000, () => {
	print('Server is up on port 3000');
});
*/

/*Ex-20-Partials-Handles-and-404-page---------------------------------------------*/

/*
//Core Modules
const path = require('path'); 

//Npm Modules
const express = require('express');
const hbs = require('hbs');
const app = express();

//Define Paths
const publicPath = path.join(__dirname, 'pages');
const viewsPath = path.join(__dirname, 'views');
const partialsPath = path.join(__dirname, 'partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); //Express.js view engine for handlebars.js
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server 
app.use(express.static(publicPath));

app.get('', (req, res) => {
        res.render('index', {
                title : 'Weather App',
                name : 'Salman',
		message : 'Hello World!',
        });
})

app.get('/help', (req, res) => {
        res.render('help', {
                title : 'Help Page',
                name : 'Salman',
                message : 'This is the help page!',
        });
})

//404 Error - Match other url routes not defined. Put at the end
app.get('*', (req, res) => {
	res.send('My 404 Page');
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
        print(`Server is up on port ${port}`);
});
*/

/*Ex-21-Mongodb-INSERTING-DOCUMENTS-------------------------------------*/

/*
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
// const {MongoClient, ObjectID} = require('mongodb');


const id = new ObjectID();
print(id); 
print(id.getTimestamp());
print(ObjectID.isValid(id));
print(id.toHexString().length);


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
	if(error){
		return print(error);
	}
	
	print('Connected');
	
	//MongoDB will create DB automatically if not there
	const db = client.db(databaseName);
	//Creates collection automatically if not there
	const user_collection = db.collection('users');
	

	//INSERT ONE
	user_collection.insertOne({
		name : 'Sadamama',
		age : 21,
	}, (error, result)=> {
		if(error){
			return print(error);
		}
		
		print(result.ops) //Array of docs
	})

	//INSERT MANY
	user_collection.insertMany(
		[
			{
				name : 'Jen',
				age: 28,
			},
			{
				name : 'Gunther',
				age : 50,
			}
		], (error, result) => {
			if(error){
				return print(error);
			}
			print(result.ops);
		}
	)
	//FIND ONE
	user_collection.findOne({name : 'Sadamama', age : 21}, (error, user) => {
		if(error){
			return print(error);
		}
		if(user){
			print('Find 1');
			print(user);
		}else{
			print('Not found');
		}
	})

	user_collection.findOne({_id : new ObjectID("5c9a73151b56b220c645a833")}, (error, user) => {
                if(error){
                        return print(error);
                }
                if(user){
			print('Find 2');
                        print(user);
                }else{
                        print('Not found');
                }
        })
	//FIND - Returns Cursor
	user_collection.find({age : 21}).toArray((error, users)=> {
		print('Find 3');
		print(users);
	})

	user_collection.find({age : 21}).count((error, count)=> {
                print('Find 4');
                print(count);
        })

	//UPDATE ONE
	const updatePromise = user_collection.updateOne({
		_id : new ObjectID("5c9a6fc85713ff20412e66bf")
	}, {
		$set : { //[More Operators : https://docs.mongodb.com/manual/reference/operator/update/
			name : 'Derp Bro',
		},
		$inc : {
			age : 100,
		}
	})

	updatePromise.then((result)=> {
		print(result);
	}).catch((error)=> {
		print(result);
	});

	//UPDATE MANY
	user_collection.updateMany(
		{},
		{
			$inc : {
				age : -20,	
			},
		}
	).then((result) => {
		print(result);
	}).catch((error) => {
		print(error);
	})
	
	//DELETE MANY
	user_collection.deleteMany({
		age : 1,
	}).then((result) => {
		print(result);
	}).catch((error) => {
		print(error);
	})
	
	//DELETE ONE
	user_collection.deleteOne({
		name : 'Derp Bro',
		age : 108	
	}).then((result) => {
		print(result);
	}).catch((error) => {
		print(error);
	});

	client.close();

})

*/

/*Ex-22----------------------------------------------------------------------------*/

/*
const mongoose = require('./mongoose.js');
const {Student} = require('./app-model.js').student_model;
const Student_bad = require('./app-model.js').student_model;

//print(Student);
//print(Student_bad);

const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');


//express
const app = express();

app.use(bodyParser.json());

app.post('/students', (req, res) => {
	print(req.body);
		
	const student = new Student({
		name: req.body.name,
		year: req.body.year
	});

	student.save().then((result) => {
		res.send(result);
	}).catch((error) => {
		res.status(400).send(error);
	})

})

app.listen(port, () => {
	print(`Listening on port ${port}...`);
})

*/

/*Ex-23-Mongoose-------------------------------------------------------------------*/

/*
const mongoose = require('./mongoose.js');
const {User, Task} = require('./app-model.js').task_manager;


const me = new User({
	name : 'Sadam',
	email : 'mike@hotmail.com',
	age : 27,
	password : "sdasdads",
})

me.save().then((result) => {
	print(result);
}).catch((error) => {
	print(error);
});

const homework = new Task({
	description : 'CSC309 E4',
	completed : false,
})

homework.save().then((result) => {
	print(result);
}).catch((error) => {
	print(error);
});
*/

/*Ex-24-HTTP-Endpoints-------------------------------------------------------------*/

/*
//Mongoose
const mongoose = require('./mongoose.js');
const {User, Task} = require('./app-model.js').task_manager;
const {MongoClient, ObjectID} = require('mongodb');

//Webserver
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req,res) => {
	const user = new User(req.body)

	user.save().then((result)=>{
		res.status(200).send(result);
	}).catch((error)=> {
		res.status(404).send(error);
	})

})

app.get('/users', (req,res) => {
	User.find({}).then((users)=>{
		res.status(200).send(users);
	}).catch((error)=>{
		res.status(400).send(error.message);
	})

})

app.get('/users/:id', (req,res) => {
        const _id = req.params.id
	
	User.findById(_id).then((user)=>{
                if(!user){
			return res.status(400).send("Error : No user found.")
		}
		res.status(200).send(user);
        }).catch((error)=>{
                res.status(400).send(error.message);
        })

})

app.patch('/user/:id', (req,res) => {
        const _id = req.params.id

	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	})

	if(!isValidOperation){
		return res.status(400).send({error : "Invalid update keys"});
	}

	User.findByIdAndUpdate(	req.params.id, 
				req.body, 
				{new : true, runValidators: true}
	).then((user) => { 
		if(!user){
			return res.status(404).send({"error" : "User not found"});
		}
		res.send(user);
	}).catch((error) => {
		res.status(400).send({"error" : error.message});
	})

})

app.delete('/user/:id', (req,res) => {
        const _id = req.params.id


        User.findByIdAndDelete(req.params.id).then((user) => {
                if(!user){
                        return res.status(404).send({"error" : "no such user to delete"});
                }
                res.send(user);
        }).catch((error) => {
                res.status(400).send({"error" : error.message});
        })
})


app.post('/tasks', (req,res) => {
	const task = new Task(req.body);

	task.save().then((result) => {
		res.send(result);
	}).catch((error) =>{
		res.status(404).send(error);
	});
})

app.get('/tasks', (req,res) => {
	Task.find({}).then((tasks) => {
		res.status(200).send(tasks)
	}).catch((error) => {
		res.status(400).send(error.message);
	})
})

app.get('/tasks/:id', (req,res) => {
	const id = req.params.id;
	Task.findById(id).then((task) => {
		if(!task){
			return res.status(404).send("Error: `task` not found");
		}
		res.status(200).send(task);
	}).catch((error) => {
		res.status(400).send(error.message);
	})

})

app.patch('/task/:id', (req,res) => {
        const _id = req.params.id

        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update);
        })

        if(!isValidOperation){
                return res.status(400).send({error : "Invalid update keys"});
        }

        Task.findByIdAndUpdate( req.params.id,
                                req.body,
                                {new : true, runValidators: true}
        ).then((task) => {
                if(!task){
                        return res.status(404).send({"error" : "Task not found"});
                }
                res.send(task);
        }).catch((error) => {
                res.status(400).send({"error" : error.message});
        })

})

app.delete('/task/:id', (req,res) => {
        const _id = req.params.id


        Task.findByIdAndDelete(req.params.id).then((task) => {
                if(!task){
                        return res.status(404).send({"error" : "no such task to delete"});
                }
                res.send(task);
        }).catch((error) => {
                res.status(400).send({"error" : error.message});
        })
})

app.listen(port, ()=>{
	print(`Listening on port ${port}`);
})
*/

/*Ex-25-Promise-Chaining-----------------------------------------------------------*/
/*
//Mongoose
const mongoose = require('./mongoose.js');
const {User, Task} = require('./app-model.js').task_manager;
const {MongoClient, ObjectID} = require('mongodb');

const id = "5c9fb2f5a3f3401bd4b95b39";
Task.findByIdAndRemove(id).then((result) => {
	print(result);
	return Task.countDocuments({completed : false});
}).then((result) => {
	print(result);
}).catch((error) => {
	print(error.message);
})
*/
/*Ex-26-Refactoring Routers-(Same a Ex 24)----------------------------------------*/

/*
//Mongoose
const mongoose = require('./mongoose.js');
const {User, Task} = require('./app-model.js').task_manager;
const {MongoClient, ObjectID} = require('mongodb');

//Webserver
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Routers
const userRouter = require('./routers/app-user.js');
const taskRouter = require('./routers/app-task.js');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



app.listen(port, ()=>{
        print(`Listening on port ${port}`);
})
*/

/*Ex-27-Password-Authentication----------------------------------------------------*/

// //Mongoose
// const mongoose = require('./mongoose.js');
// const {User, Task} = require('./app-model.js').task_manager;
// const {MongoClient, ObjectID} = require('mongodb');

// //Webserver
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3001;

// //Routers
// const userRouter = require('./routers/app-user.js');
// const taskRouter = require('./routers/app-task.js');

// //Bcrypt
// const bcrypt = require('bcryptjs');

// app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

// /*
// const callback = () => {
// 	const password = 'Red12345!';
// 	//const hashedRassword = 
// 	bcrypt.hash(password, 9).then((result) => {
// 		console.log(result);
// 	}).catch((error) => {
// 		console.log(error);
// 	});

// 	const hashedPassword = '$2a$09$TwZRRoSU/2uYZeXONyk5Nu5frbpSQUIFpXGbRChc2gRqgZfAp3LV.';
// 	bcrypt.compare('Red12345!', hashedPassword).then((result) => {
// 		print(result);
// 	}).catch((error) => {
// 		print(error);
// 	});
// }
// */

// const callback = async () => {
//         const password = 'Red12345!';
//         //const hashedRassword = 
//         const hashedPassword = await bcrypt.hash(password, 9);

// 	print(password);
// 	print(hashedPassword);

//         const bool = await bcrypt.compare('Red12345!', hashedPassword);

// 	print(bool);
// }

// callback();


// app.listen(port, ()=>{
//         print(`Listening on port ${port}`);
// })


/*Ex-28-Async----------------------------------------------------------------------*/
// //Asyncs always returns promise
// const doWork = async () => {
// 	return "Curry";
// 	throw new Error('In a Hurry')
// }

// // print(doWork())

// doWork().then((result) => {
// 	print(result);
// }).catch((error) => {
// 	print(error);
// })

/*Ex-29-Await----------------------------------------------------------------------*/

// const add = (a, b) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(()=>{
// 			if(a < 0 || b < 0){
// 				return reject({'error' : 'Numbers but be positive'});
// 			}
// 			resolve(a+b);
// 		}, 1000);
// 	})
// }

// const doWork = async () => {
// 	const res1 = await add(1,99);
// 	const res2 = await add(2,res1);
// 	const res3 = await add(-3,res2);
// 	return res3;
// }

// doWork().then((result) => {
// 	print('result: ', result);
// }).catch((error) => {
// 	print(error.error);
// });


/*Ex-30-Promise Chaining (Ex 25)-Async/Await 2--------------------------------*/

// const mongoose = require('./mongoose.js');
// const {User, Task} = require('./app-model.js').task_manager;
// const {MongoClient, ObjectID} = require('mongodb');

// const findAndUpdateUser= async (id,fields) => {
// 	const user = await User.findByIdAndUpdate(id,fields);
// 	if(!user){
// 		throw new Error('User not found');
// 	}
// 	return user;
// }

// findAndUpdateUser('5cb0141f459e1d26fef2fd8b', {name : "Curry Monster"}).then((res) => {
// 	print(res);
// }).catch((err) => {
// 	print('Error: ', err);
// });


// const findAndRemoveTaskAndReturnCount = async (id) => {
// 	const result = await Task.findByIdAndRemove(id);
// 	print(result)
// 	const count = await Task.countDocuments({completed : false});
// 	return count;
// }

// findAndRemoveTaskAndReturnCount('5cb0140ccd45e926c6d3bae1').then((res) => {
// 	print(res);
// }).catch((err) => {
// 	print('Error: ', err);
// });

/*Ex-31-Async/Await Endpoints (Ex 24)----------------------------------------*/

// //Mongoose
// const mongoose = require('./mongoose.js');
// const {User, Task} = require('./app-model.js').task_manager;
// const {MongoClient, ObjectID} = require('mongodb');

// //Webserver
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.post('/users', async (req,res) => {
// 	const user = new User(req.body)

// 	try{
// 		await user.save();
// 		res.status(200).send(user);
// 	}catch(e){
// 		res.status(400).send(e);
// 	}

// })

// app.get('/users', async (req,res) => {
	
// 	try{
// 		const users = await User.find({});
// 		res.status(200).send(users);
// 	}catch(e){
// 		res.status(400).send(e.message);
// 	}

// })

// app.get('/users/:id', async (req,res) => {
//     const _id = req.params.id
	
// 	try {
// 		const user = await User.findById(_id);
// 		if(!user){
// 			return res.status(400).send("Error : No user found.")
// 		}
// 		res.status(200).send(user);
// 	}catch(e){
// 		res.status(400).send("Error ", e.message);
// 	}

// })

// app.patch('/user/:id', async (req,res) => {
//     const _id = req.params.id

// 	const updates = Object.keys(req.body);
// 	const allowedUpdates = ['name', 'email', 'password', 'age'];
// 	const isValidOperation = updates.every((update) => {
// 		return allowedUpdates.includes(update);
// 	})

// 	if(!isValidOperation){
// 		return res.status(400).send({error : "Invalid update keys"});
// 	}

// 	try{
// 		const updated = await User.findByIdAndUpdate(	req.params.id, 
// 					req.body, 
// 					{new : true, runValidators: true}
// 		);
// 		if(!updated){
// 			return res.status(404).send({"error" : "User not found"});
// 		}
// 		res.send(updated);
// 	}catch(e){
// 		res.status(400).send({"error" : e.message});
// 	}
	
// })

// app.delete('/user/:id', async (req,res) => {
// 	const _id = req.params.id

// 	try{
// 		const user = await User.findByIdAndDelete(req.params.id);
// 		if(!user){
// 			return res.status(404).send({"error" : "no such user to delete"});
// 		}
// 		res.send(user);
// 	}catch(e){
// 		res.status(400).send({"error" : e.message});
// 	}
// })

// app.listen(port, ()=>{
// 	print(`Listening on port ${port}`);
// })

/*Ex-32-Password Auth 2-----------------------------------------------------------*/

// //Mongoose
// const mongoose = require('./mongoose.js');
// const {User, Task} = require('./app-model.js').task_manager;
// const {MongoClient, ObjectID} = require('mongodb');

// //Webserver
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3001;

// //Routers
// const userRouter = require('./routers/app-user.js');
// const taskRouter = require('./routers/app-task.js');

// //Bcrypt
// const bcrypt = require('bcryptjs');

// app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

// const hashFunction = () =>{
// 	const password = 'Red123456@';
// 	const hashedProm = bcrypt.hash(password, 8);

// 	hashedProm.then((result) => {
// 		print('Hashed result : ', result);
// 	}).catch((error) => {
// 		print(error);
// 	})
// }

// const hashCompare = (password, hashstring) => {
// 	const compProm = bcrypt.compare(password, hashstring);

// 	compProm.then((result) => {
// 		print('Hash compare :', result);
// 	}).catch((error) => {
// 		print(error);
// 	})
// }

// hashFunction();
// hashCompare('red123456@', '$2a$08$ARcI.qODgxK/sUsMCZiDMegdI0W1TH4rQ3ncLH.q3JvZWD4BVMi.i');

// app.listen(port, ()=>{
//         print(`Listening on port ${port}`);
// })


/*Ex-33-Task Manager-User with Hash Password and User Login-----------*/

// //Mongoose
// const mongoose = require('./mongoose.js');
// const {User, Task} = require('./app-model.js').task_manager;
// const {MongoClient, ObjectID} = require('mongodb');

// //Webserver
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.post('/users', (req,res) => {
// 	const user = new User(req.body)

// 	user.save().then((result)=>{
// 		res.status(200).send(result);
// 	}).catch((error)=> {
// 		res.status(404).send(error);
// 	})

// })

// app.post('/user/login', (req,res) => {
	
// 	User.findByCredentials(req.body.email,req.body.password).then((result) => {
// 		res.status(200).send(result);
// 	}).catch((error) => {
// 		res.status(400).send(error);
// 	})

// })

// app.patch('/user/:id', (req,res) => {
//         const _id = req.params.id

// 	const updates = Object.keys(req.body);
// 	const allowedUpdates = ['name', 'email', 'password', 'age'];
// 	const isValidOperation = updates.every((update) => {
// 		return allowedUpdates.includes(update);
// 	})

// 	if(!isValidOperation){
// 		return res.status(400).send({error : "Invalid update keys"});
// 	}

// 	User.findById(req.params.id).then((user) => {
// 		if(!user){
// 			return res.status(404).send({"error" : "User not found"});
// 		}
// 		updates.forEach((update) => {
// 			user[update] = req.body[update];
// 		})
// 		return user.save();
// 	}).then((user) => { 
// 		res.send(user);
// 	}).catch((error) => {
// 		res.status(400).send({"error" : error.message});
// 	})
// })

// app.listen(port, ()=>{
//         print(`Listening on port ${port}`);
// })

/*Ex34---------------------------------------------------------------*/

// //Mongoose
// const mongoose = require('./mongoose.js');
// const {User, Task} = require('./app-model.js').task_manager;
// const {MongoClient, ObjectID} = require('mongodb');

// //Webserver
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.post('/users', (req,res) => {
// 	const user = new User(req.body)

// 	user.save().then((result)=>{
// 		res.status(200).send(result);
// 	}).catch((error)=> {
// 		res.status(404).send(error);
// 	})

// })

// app.post('/user/login', (req,res) => {
	
// 	User.findByCredentials(req.body.email,req.body.password).then((result) => {
// 		res.status(200).send(result);
// 	}).catch((error) => {
// 		res.status(400).send(error);
// 	})

// })

// app.patch('/user/:id', (req,res) => {
//         const _id = req.params.id

// 	const updates = Object.keys(req.body);
// 	const allowedUpdates = ['name', 'email', 'password', 'age'];
// 	const isValidOperation = updates.every((update) => {
// 		return allowedUpdates.includes(update);
// 	})

// 	if(!isValidOperation){
// 		return res.status(400).send({error : "Invalid update keys"});
// 	}

// 	User.findById(req.params.id).then((user) => {
// 		if(!user){
// 			return res.status(404).send({"error" : "User not found"});
// 		}
// 		updates.forEach((update) => {
// 			user[update] = req.body[update];
// 		})
// 		return user.save();
// 	}).then((user) => { 
// 		res.send(user);
// 	}).catch((error) => {
// 		res.status(400).send({"error" : error.message});
// 	})
// })

// app.listen(port, ()=>{
//         print(`Listening on port ${port}`);
// })

/*Ex35-JSON-Auth-Token----------------------------------------------------*/

// //Misc NPM
// const {promisify} = require("es6-promisify");

// //Tokens
// const jwt = require('jsonwebtoken');
// const jwtSign = promisify(jwt.sign);
// const jwtVerify = promisify(jwt.verify);
// const genToken = () => {
// 	//Create Token
// 	jwtSign({ _id : 'SOME_ID'}, 'SECRET_CODE_420', {expiresIn: '1 seconds'}).then((token) => {
// 		print(token);
// 		return jwtVerify(token, 'SECRET_CODE_420'); //Verify Token
// 	}).then((data) => {
// 		print(data);
// 	}).catch((err) => {
// 		print(err);
// 	})
// }
// genToken();
