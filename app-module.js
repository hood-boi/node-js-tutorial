'using strict'

const print = console.log;
const fs = require('fs');
const request = require('request');


/* BEGIN : Promise bike-location */

const stationInformationP = (stationId) => {
	return new Promise((resolve, reject) => {	
		request({
			url : 'https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information',
			json : true,
		}, (error, response, body) => {
			if(error){
				reject('Error : Cannot connect to server');
			}else if(response.statusCode !== 200){
				reject('Issue with fetching resource');
			}else{
				const stations = body.data.stations;
				const station = stations.find((station) => station.station_id == stationId);
				if(station){
					resolve({
						name : station.name,
						lat : station.lat,
						lon : station.lon,
					});
				}else{
					reject(('Error : No such station #'+stationId));
				}
			}
		});
	});
}

const getAddressP = (lat, lon) => {
	return new Promise((resolve,reject) => {
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBmlBarJN3RhKqwNnH4uVwcfydzNwUW-OQ`,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject("Can't connect to server")
			} else if (response.statusCode !== 200) {
				reject('issue with getting resource')
			} else {
				resolve({
					address: body.results[0].formatted_address
				});
			}
		});
	});
}

/* BEGIN : bike-location */

const stationInformation = (stationId, callBack) => {

	request({
		url : 'https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information', 
		json : true,
	}, (error, response, body) => {
		if(error){
			callBack('Error : Cannot connect to server',undefined);
		}else if(response.statusCode !== 200){
			callBack('Issue with fetching resource',undefined);
		}else{
			const stations = body.data.stations;
			const station = stations.find((station) => station.station_id == stationId);
			if(station){
				callBack(null, {
					name : station.name,
					lat : station.lat,
					lon : station.lon,
				});
			}else{
				callBack(('Error : No such station #'+stationId),undefined);
			}
		}
	});
}

const getAddress = (lat, lon, callback) => {
        request({
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBmlBarJN3RhKqwNnH4uVwcfydzNwUW-OQ`,
                json: true
        }, (error, response, body) => {
                if (error) {
			callback("Can't connect to server")
		} else if (response.statusCode !== 200) {
			callback('issue with getting resource')
		} else {
			callback(undefined, {
				address: body.results[0].formatted_address
			})
		}
	})
}

/* END : bike-location */


/* BEGIN : Students Library */
const addStudent = (name, year, courses) => {
	const students = getAllStudents();
	
	const newId = (students.length === 0)? 1 : students[students.length - 1].id + 1;
	
	const student = {
		id : newId,
		name : name,
		year : year,
		courses : courses,
	}

	students.push(student);
	saveStudents(students);	
}

const getStudent = (id) => {
	const students = getAllStudents();
	const student = students.find((student) => student.id == id);
	return student;
}

const removeStudent = (id) => {
	const students = getAllStudents();
	const studentFilter = students.filter((student) => student.id != id);
	saveStudents(studentFilter);
	return students.length != studentFilter.length;	
}

const addCourse = (id, course) => {
	try {
		const students = getAllStudents();
		const student = students.find((student) => student.id == id);
		student.courses.push(course);
		saveStudents(students);
	} catch (e){

	}
}

const saveStudents = (array) => {
	fs.writeFileSync('students.json', JSON.stringify(array));
}

const getAllStudents = () => {
	try {
		const studentsFromFile = fs.readFileSync('students.json');
		return JSON.parse(studentsFromFile);
	} catch (e){
		return [];
	}
}

/* END : Students Library */


module.exports = {
	course  : {
		courseList : ['csc309', 'csc301'],
		addCourse : function (course){
			this.courseList.push(course);
		},
		removeCourse : function (course){
			const i = this.courseList.indexOf(course);
			this.courseList.splice(i,1);
		},
	},
	students : {
		add : addStudent,
		read : getAllStudents,
		search : getStudent,
		remove : removeStudent,
		addCourse : addCourse,
	},
	bike_location : {
		stationInfo : stationInformation,
		getAddress : getAddress,
		stationInfoP : stationInformationP,
                getAddressP : getAddressP,
	},
}
