/* student.js Student model */

const print = console.log;
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/*Task Manager Start*/

const userSchema = new mongoose.Schema({
        name : {
                type : String,
                required : true,
        },
        email : {
                type : String,
                unique : true,
                required : true,
                trim : true,
                lowercase : true,
                validate : (value) => { //Custom Validation
                        if(!validator.isEmail(value)){
                                throw new Error('Email is invalid');
                        }
                }
        },
        password : {
                type : String,
                required : true,
                trim : true,
                minlength : [7 , 'Password has to be greater than 6 characters.'],
                validate : (password) => {
                        if(password.includes("password")){
                                throw new Error('Password cannot have "password" in it.');
                        }
                }
        },
        age : {
                type : Number,
                default : 0,
                validate(value){
                        if(value < 0){
                                throw new Error('Age must be a positive number');
                        }
                }
        }
})

userSchema.statics.findByCredentials = (email, password) => {
        // return new Promise((resolve, reject) => {
        //         User.findOne({email : email}).then((user) => {
        //                 if(!user){
        //                         return reject({error : 'no user found'})
        //                 }
        //                 return bcrypt.compare(password, user.password);
        //         }).then((result) => {
        //                 if(result){
        //                         return resolve({status : 'Logged in!'})
        //                 }else{
        //                         return reject({error : 'Invalid Password!'})
        //                 }
        //         }).catch((error) => {
        //                 return reject({error : 'server side error'})
        //         });
        // })

        return new Promise((resolve, reject) => {
                User.findOne({email : email}).then((user) => {
                        if(!user){
                                return reject({error : 'no such user found'})
                        }
                        
                        bcrypt.compare(password, user.password).then((result) => {
                                if(result){
                                        return resolve(user)
                                }else{
                                        return reject({error : 'Invalid Password!'})
                                }
                        }).catch((error) => {
                                return reject({error: 'bcrypt compare error'})
                        });
                }).catch((error) => {
                        return reject({error : 'server side error'})
                });
        })
      
}

//Hash plain text password before any saves
userSchema.pre('save', function(next){
        const user = this;

        if(user.isModified('password')){ //True when update and creating it
                
                bcrypt.hash(user.password, 9).then((hashed) => {
                        user.password = hashed;
                        next();
                }).catch((error) => {
                        next();
                })
        }else{
                next();
        }
        
})

const User = mongoose.model('User', userSchema)



const Task = mongoose.model('Task', {
	description : {
		type : String,
		required : true,
	},
	completed : {
		type : Boolean,
		default : false,
	},
})


/*Task Manager End*/

/* Student Model Start */
const Student = mongoose.model('Student', {
        name: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
        },
        year: {
                type: Number,
                required: true,
                default: 1
        }
})
/* Student Model End */

module.exports = { 
	student_model : {
		Student 
	},
	task_manager : {
		User : User,
		Task : Task,
	}
}
