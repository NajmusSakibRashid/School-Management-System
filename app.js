var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mysql = require('mysql');
var router = express.Router();
var morgan = require('morgan');
var url = require('url');
var cors = require('cors');
const { json } = require('express');
const { urlencoded } = require('body-parser');
app.use(express.static('public'));
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

require('dotenv').config();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

var sql = 'select id from section';

connection.query(sql, function (err, result) {
    if (err)
        throw err;
    for (let i = 0; i < result.length; i++) {
        app.get('/sectionid=' + result[i].id, function (req, res) {
            var sql = 'select * from student where section=' + result[i].id;
            connection.query(sql, function (err, result) {
                if (err)
                    throw err;
                res.status(200).json(result);
            })
            sql = 'call attendance_proc(' + result[i].id + ')';
            connection.query(sql, function (err, result) {
                if (err)
                    throw err;
            })
        });
    }
})

app.get('/Due', function (req, res) {
    params = url.parse(req.url,true).query;
    if (params.role != 'admin')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'Due.html');
})

app.get('/GetSectionId', function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'select id from section where class_teacher=' + params.id;
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    })
})

app.get('/Result', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'teacher')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'Result.html');
})

app.get('/Query', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'Query.html');
})

app.get('/Routine', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'RoutineMaker.html');
})

app.get('/ExamRegistration', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin' && params.role != 'teacher')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'ExamRegistration.html');
})

app.get('/LocationRegistration', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'LocationRegistrationForm.html');
})

app.get('/Attendance', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'teacher') 
        return res.send('unauthorized');
    var sql = 'select * from section where class_teacher=' + params.id;
    connection.query(sql, function (err, result) {
        if (result.length)
            res.sendFile(__dirname + '/' + 'Attendance.html');
        else
            res.send('you are not a class teacher');
    })
})

app.get('/AttendanceReport', function (req, res) {
    res.sendFile(__dirname + '/' + 'AttendanceReport.html');
})

app.get('/TeacherRegistration', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'TeacherRegistrationForm.html');
})

app.get('/HomePage', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin'&&params.role!='student'&&params.role!='teacher')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'Home.html');
})

app.get('/SeeAllParents', function (req, res) {
    res.sendFile(__dirname + '/' + 'AllParents.html');
})

app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + '/' + 'style.css');
})

app.get('/style1.css', function (req, res) {
    res.sendFile(__dirname + '/' + 'style1.css');
})

app.get('/StudentAdmission', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'StudentAdmitForm.html');
})

app.get('/ParentRegistrationFather', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'ParentRegistrationFormFather.html');
})

app.get('/ParentRegistrationMother', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        res.send('unauthorized');
    else
        res.sendFile(__dirname + '/' + 'ParentRegistrationFormMother.html');
})

app.get('/StudentRoutine', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        return res.send('unauthorized');
    var output = '<link href="style1.css" rel="stylesheet">';
    output += '<form style="text-align:center;margin-top:250px" action="/StudentRoutineResponse?role='+params.role+'&id='+params.id+'" method="post"><tag for="sectionid">Section Id:</tag><input placeholder="Enter Section Id" name="sectionid" type="number"><br><input type="submit"></form>';
    res.send(output);
})

app.get('/StudentAccessRoutine', function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'select * from student where id=' + params.id;
    connection.query(sql, function (err, result) {
        var sql = 'select * from routine r,teacher t where r.teacher_id=t.id and r.section_id=' + result[0].section;
        connection.query(sql, function (err, result) {
            if (err)
                throw err;
            var response = '<link href="style1.css" rel="stylesheet">';
            response += '<h1>Class Routine</h1>'
            response += '<table style="margin-left:auto;margin-right:auto;border-collapse:collapse;text-align:center;width:65%"><tr><th></th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th></tr>';
            var day = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
            for (let i = 0; i < 6; i++) {
                response += '<tr><td>' + day[i] + '</td>';
                for (let j = 0; j < 5; j++) {
                    response += '<td>' + result[5 * i + j].subject + '</td>';
                }
                response += '</tr>';
            }
            response += '</table>';
            response += '<form action="/HomePage" style="text-align:center">';
            response += '<input type="hidden" name="role" value="' + params.role + '">';
            response += '<input type="hidden" name="id" value="' + params.id + '">';
            response += '<input type="submit" value="Click to Continue"></form>';
            res.send(response);
        })
    })
})

app.get('/Transaction', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        return res.send('unauthorized');
    var output = '<link href="style1.css" rel="stylesheet">';
    output += '<form style="text-align:center;margin-top:250px" action="TransactionResponse">';
    output += '<input type="hidden" name="role" value="' + params.role + '">';
    output += '<input type="hidden" name="id" value="' + params.id + '">';
    output += '<tag for="year">Year:</tag><input name="year" type="number"><br><input type="submit">';
    output += '</form>';
    res.send(output);
})

app.get('/TransactionResponse', function (req, res) {
    console.log(req.url);
    res.sendFile(__dirname + '/' + 'Transaction.html');
})

app.post('/TransactionResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'insert into transaction values(' + req.body.student_id + ',' + params.amount + ',' + params.year + ')';
    connection.query(sql);
    var response = '<link href="/style1.css" rel="stylesheet">';
    response += '<form action="/HomePage" style="text-align:center;margin-top:250px">';
    response += '<input type="hidden" name="role" value="' + params.role + '">';
    response += '<input type="hidden" name="id" value="' + params.id + '">';
    response += '<input type="submit" value="Click to Continue"></form>';
    res.send(response);
})

app.get('/GetDues', function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'select * from due where year=' + params.year;
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    })
})

app.get('/TeacherAccessRoutine', function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'select * from routine where teacher_id=' + params.id;
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        var response = '<link href="style1.css" rel="stylesheet">';
        response += '<h1>Class Routine</h1>'
        response += '<table style="margin-left:auto;margin-right:auto;border-collapse:collapse;width:65%;text-align:center"><tr><th></th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th></tr>';
        var day = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
        for (let i = 0; i < 6; i++) {
            response += '<tr><td>' + day[i] + '</td>';
            for (let j = 1; j <= 5; j++) {
                var k = 0;
                for (; k < result.length; k++) {
                    if (result[k].slot_id == 5 * i + j) {
                        response += '<td>' + result[k].section_id + '</td>'
                        break;
                    }
                }
                if (k == result.length)
                    response += '<td></td>';
            }
            response += '</tr>';
        }
        response += '</table>';
        response += '<form action="/HomePage" style="text-align:center">';
        response += '<input type="hidden" name="role" value="' + params.role + '">';
        response += '<input type="hidden" name="id" value="' + params.id + '">';
        response += '<input type="submit" value="Click to Continue"></form>';
        res.send(response);
    })
})

app.get('/StudentAccessResult', function (req,res) {
    params = url.parse(req.url, true).query;
    var output = '<link href="style1.css" rel="stylesheet">';
    output += '<form style="margin-top:250px" action="/StudentResultResponse?role=' + params.role + '&id=' + params.id + '" method="post"><table style="margin-left:auto;margin-right:auto;width:30%"><tr><td><tag for="year">Year:</tag></td><td><input style="width:90%" name="year" type="number"></td></tr></table><input type="submit"></form>';
    res.send(output);
});

app.get('/StudentResult', function (req, res) {
    params = url.parse(req.url, true).query;
    var output = '<link href="style1.css" rel="stylesheet">';
    output += '<form style="margin-top:250px" action="/StudentResultResponse?role=' + params.role + '&id=' + params.id + '" method="post"><table style="margin-left:auto;margin-right:auto;width:30%"><tr><td><tag for="student_id">Student Id:</tag></td><td><input style="width:90%" name="student_id" type="number"></td></tr><tr><td><tag for="year">Year:</tag></td><td><input style="width:90%" name="year" type="number"></td></tr></table><input type="submit"></form>';
    res.send(output);
})

app.get('/StatisticsResult', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        return res.send('unauthorized');
    var output = '<link href="style1.css" rel="stylesheet">';
    output += '<form style="margin-top:200px" action="/StatisticsResultResponse?role='+params.role+'&id='+params.id+'" method="post"><table style="margin-left:auto;margin-right:auto;width:30%"><tr><td><tag for="class">Class:</tag></td><td><input style="width:80%" name="class" type="number"></td></tr><tr><td><tag for="subject">Subject:</tag></td><td><input style="width:80%" name="subject" type="text"></td></tr><tr><td><tag for="year">Year:</tag></td><td><input style="width:80%" name="year" type="number"></td></tr></table><input type="submit"></form>';
    res.send(output);
})

app.get('/TeacherRoutine', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        return res.send('unauthorized');
    var output = '<link href="style1.css" rel="stylesheet">';
    output += '<form style="text-align:center;margin-top:250px" action="TeacherRoutineResponse?role='+params.role+'&id='+params.id+'" method="post"><tag for="teacherid">Teacher Id:</tag><input name="teacherid" type="number"><br><input type="submit"></form>';
    res.send(output);
})

app.get('/AllParents', function (req, res) {
    var sql = 'select * from parents';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    })
})

app.get('/AllSlots', function (req, res) {
    var sql = 'select * from slot';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    })
})

app.get('/AllSection', function (req, res) {
    var sql = 'select * from section';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    })
})

app.get('/AllRoutine', function (req, res) {
    var sql = 'select * from routine';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    })
})

app.get('/LastInsertedId', function (req, res) {
    var sql = 'select max(id) as x from student';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
        console.log(result);
    })
})

app.post('/StatisticsResultResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'select grade,count(*) as number_of_students from (select s.id, grade(sum(r.marks*weight(e.type))) grade from examination e,result r,student s,section ss where r.student_id=s.id and r.exam_id=e.id and s.section=ss.id and ss.class=' + req.body.class + ' and year(e.date)="' + req.body.year + '" and subject="' + req.body.subject + '" group by s.id) a group by grade';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        var response = '<link href="style1.css" rel="stylesheet">';
        response += '<h1>Statistics</h2>';
        response += '<table style="margin-left:auto;margin-right:auto;border-collapse:collapse"><tr>';
        for (item in result[0])
            response += '<th>' + item + '</th>';
        response += '</tr>';
        for (let i = 0; i < result.length; i++) {
            response += '<tr>';
            for (item in result[i])
                response += '<td>' + result[i][item] + '</td>';
            response += '</tr>';
        }
        response += '</table>';
        response += '<form action="/HomePage" style="text-align:center">';
        response += '<input type="hidden" name="role" value="' + params.role + '">';
        response += '<input type="hidden" name="id" value="' + params.id + '">';
        response += '<input type="submit" value="Click to Continue"></form>';
        res.send(response);
    })
})

app.post('/StudentResultResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    if(params.role=='student')
        var sql = 'select subject,sum(r.marks*weight(e.type)) marks,grade(sum(r.marks*weight(e.type))) grade from examination e,result r,student s where r.student_id=s.id and r.exam_id=e.id and s.id=' + params.id + ' and year(e.date)=' + req.body.year + ' group by subject';
    else
        var sql = 'select subject,sum(r.marks*weight(e.type)) marks,grade(sum(r.marks*weight(e.type))) grade from examination e,result r,student s where r.student_id=s.id and r.exam_id=e.id and s.id=' + req.body.student_id + ' and year(e.date)=' + req.body.year + ' group by subject';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        var response = '<link href="style1.css" rel="stylesheet">';
        response += '<h1>Mark Sheet</h1>';
        response += '<table style="margin-left:auto;margin-right:auto;border-collapse:collapse"><tr>';
        for (item in result[0])
            response += '<th>' + item + '</th>';
        response += '</tr>';
        for (let i = 0; i < result.length;i++) {
            response += '<tr>';
            for (item in result[i])
                response += '<td>' + result[i][item] + '</td>';
            response += '</tr>';
        }
        response += '</table>';
        response += '<form action="/HomePage" style="text-align:center">';
        response += '<input type="hidden" name="role" value="' + params.role + '">';
        response += '<input type="hidden" name="id" value="' + params.id + '">';
        response += '<input type="submit" value="Click to Continue"></form>';
        res.send(response);
    })
})

app.post('/StudentAdmissionResponse', urlencodedParser, function (req, res) {
    var sql = 'insert into student(name,gender,date_of_birth) values("' + req.body.name + '","' + req.body.gender + '","' + req.body.dob + '")';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row inserted successfully');
    })
    res.sendFile(__dirname + '/' + 'Buffer.html');
})

app.post('/RegisteredParentResponseFather', urlencodedParser, function (req, res) {
    var sql = 'update student set father=' + req.body.parentid + ' where id=last_insert_id()';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row updated successfully');
    })
    res.sendFile(__dirname + '/' + 'Buffer1.html');
})

app.post('/ExamRegistrationResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'insert into examination(date,time,type,full_marks,subject,class) values("' + req.body.date + '","' + req.body.time + '","' + req.body.type + '",' + req.body.full_marks + ',"' + req.body.subject + '",' + req.body.class + ')';
    var last_id;
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row inserted successfully');
        var sql = 'select max(id) mx from examination';
        connection.query(sql, function (err, result) {
            if (err)
                throw err;
            console.log(result);
            last_id = result[0].mx;
            console.log(last_id);
            var response = '<link href="/style1.css" rel="stylesheet">';
            response += '<form action="/HomePage" style="text-align:center;margin-top:250px">';
            response += '<center>Exam id is:' + last_id + '</center>';
            response += '<input type="hidden" name="role" value="' + params.role + '">';
            response += '<input type="hidden" name="id" value="' + params.id + '">';
            response += '<input type="submit" value="Click to Continue"></form>';
            res.send(response);
        })
    })
})

app.post('/RegisteredParentResponseMother', urlencodedParser, function (req, res) {
    var sql = 'update student set mother=' + req.body.parentid + ' where id=last_insert_id()';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row updated successfully');
    })
    res.sendFile(__dirname + '/' + 'Buffer2.html');
})

app.post('/LocationRegistrationResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'admin')
        return res.send('unauthorized');
    var sql = 'insert into location(description,distance) values("' + req.body.description + '",' + req.body.distance + ')';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row inserted successfully');
    })
    var response = '<link href="/style1.css" rel="stylesheet">';
    response += '<form action="/HomePage" style="text-align:center">';
    response += '<input type="hidden" name="role" value="' + params.role + '">';
    response += '<input type="hidden" name="id" value="' + params.id + '">';
    response += '<input type="submit" value="Click to Continue"></form>';
    res.send(response);
})

app.post('/TeacherRegistrationResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'insert into teacher(name,gender,date_of_birth,subject) values("' + req.body.name + '","' + req.body.gender + '","' + req.body.dob + '","' + req.body.subject + '")';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row inserted successfully');
    })
    var response = '<link href="/style1.css" rel="stylesheet">';
    response += '<form action="/HomePage" style="text-align:center;margin-top:250px">';
    response += '<input type="hidden" name="role" value="' + params.role + '">';
    response += '<input type="hidden" name="id" value="' + params.id + '">';
    response += '<input type="submit" value="Click to Continue"></form>';
    res.send(response);
})

app.post('/ParentRegistrationResponseFather', urlencodedParser, function (req, res) {
    var sql = 'insert into parents(name,gender,date_of_birth) values("' + req.body.name + '","' + req.body.gender + '","' + req.body.dob + '")';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row inserted successfully');
        sql = 'update student set father=(select max(id) from parents) where id=(select max(id) from (select * from student) s)';
        connection.query(sql, function (err, result) {
            if (err)
                throw err;
            console.log('1 row updated successfully');
        })
    })
    res.sendFile(__dirname + '/' + 'Buffer1.html');
})

app.post('/ParentRegistrationResponseMother', urlencodedParser, function (req, res) {
    var sql = 'insert into parents(name,gender,date_of_birth) values("' + req.body.name + '","' + req.body.gender + '","' + req.body.dob + '")';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row inserted successfully');
        sql = 'update student set mother=(select max(id) from parents) where id=(select max(id) from (select * from student) s)';
        connection.query(sql, function (err, result) {
            if (err)
                throw err;
            console.log('1 row updated successfully');
        })
    })
    res.sendFile(__dirname + '/' + 'Buffer2.html');
})

app.post('/AttendanceResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    for (let i = 0; i < req.body.studentid.length; i++) {
        var sql = 'update attendance set presence = "Present" where studentid = ' + req.body.studentid[i] + ' and timestamp = (select max(timestamp) from(select * from attendance) a where studentid = ' + req.body.studentid[i] + ')';
        connection.query(sql, function (err, result) {
            if (err)
                throw err;
        })
    }
    var response = '<link href="style1.css" rel="stylesheet" />';
    response += '<form action="/HomePage" style="text-align: center; margin-top: 250px">';
    response += '<input type="hidden" name="role" value="' + params.role + '">';
    response += '<input type="hidden" name="id" value="' + params.id + '">';
    response += '<input style = "padding: 20px; color:white" type = "submit" value = "Click to Continue"></form > ';
    res.send(response);
})

app.post('/AttendanceReportResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    if(params.role=='student')
        var sql = 'select * from attendance where timestamp>="' + req.body.from + '" and timestamp<="' + req.body.to + '" and studentid=' + params.id;
    else
        var sql = 'select * from attendance where timestamp>="' + req.body.from + '" and timestamp<="' + req.body.to + '" and studentid=' + req.body.studentid;
    connection.query(sql, function (err, result) {
        var output = '<link href="style1.css" rel="stylesheet" />';
        output += '<h1>Attendance Report</h1>';
        output += '<table style="margin-left:auto;margin-right:auto"><tr><th>Time Stamp</th><th>Presence</th></tr>';
        for (let i = 0; i < result.length; i++) {
            output += '<tr><td>' + result[i].timestamp + '</td><td>' + result[i].presence + '</td></tr>';
        }
        output += '</table>';
        output += '<form action="/HomePage" style="text-align:center">';
        output += '<input type="hidden" name="role" value="' + params.role + '">';
        output += '<input type="hidden" name="id" value="' + params.id + '">';
        output += '<input type="submit" value="Click to Continue"></form>';
        res.send(output);
    })
})

app.post('/RoutineMakerResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'delete from routine'
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        var sql = 'select count(*) x from section';
        connection.query(sql, function (err, result) {
            if (err)
                throw err;
            var x = result[0].x;
            for (let i = 1; i <= 30; i++) {
                for (let j = 1; j <= x; j++) {
                    var sql = 'insert into routine values(' + i + ',' + j + ',' + req.body.routine[(i - 1) * x + j - 1] + ')';
                    connection.query(sql, function (err, result) {
                        if (err)
                            throw err;
                    })
                }
            }
            var response = '<link href="style1.css" rel="stylesheet" />';
            response += '<form action="/HomePage" style="text-align: center; margin-top: 250px">';
            response += '<input type="hidden" name="role" value="' + params.role + '">';
            response += '<input type="hidden" name="id" value="' + params.id + '">';
            response += '<input style = "padding: 20px; color:white" type = "submit" value = "Click to Continue"></form > ';
            res.send(response);
        })
    })
})

app.post('/StudentRoutineResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'select * from routine r,teacher t where r.teacher_id=t.id and r.section_id=' + req.body.sectionid;
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        var response = '<link href="style1.css" rel="stylesheet">';
        response+='<h1>Class Routine</h1>'
        response += '<table style="margin-left:auto;margin-right:auto;border-collapse:collapse;text-align:center;width:65%"><tr><th></th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th></tr>';
        var day = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
        for (let i = 0; i < 6; i++) {
            response += '<tr><td>' + day[i] + '</td>';
            for (let j = 0; j < 5; j++) {
                response += '<td>' + result[5 * i + j].subject + '</td>';
            }
            response += '</tr>';
        }
        response += '</table>';
        response += '<form action="/HomePage" style="text-align:center">';
        response += '<input type="hidden" name="role" value="' + params.role + '">';
        response += '<input type="hidden" name="id" value="' + params.id + '">';
        response += '<input type="submit" value="Click to Continue"></form>';
        res.send(response);
    })
})

app.post('/TeacherRoutineResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'select * from routine where teacher_id=' + req.body.teacherid;
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        var response = '<link href="style1.css" rel="stylesheet">';
        response+='<h1>Class Routine</h1>'
        response += '<table style="margin-left:auto;margin-right:auto;border-collapse:collapse;width:65%;text-align:center"><tr><th></th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th></tr>';
        var day = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
        for (let i = 0; i < 6; i++) {
            response += '<tr><td>' + day[i] + '</td>';
            for (let j = 1; j <= 5; j++) {
                var k = 0;
                for (; k < result.length; k++) {
                    if (result[k].slot_id == 5 * i + j) {
                        response += '<td>' + result[k].section_id + '</td>'
                        break;
                    }
                }
                if (k == result.length)
                    response += '<td></td>';
            }
            response += '</tr>';
        }
        response += '</table>';
        response += '<form action="/HomePage" style="text-align:center">';
        response += '<input type="hidden" name="role" value="' + params.role + '">';
        response += '<input type="hidden" name="id" value="' + params.id + '">';
        response += '<input type="submit" value="Click to Continue"></form>';
        res.send(response);
    })
})

app.post('/DueResponse', urlencodedParser, function (req, res) {
    var response = '<link href="style1.css" rel="stylesheet" />';
    response += '<form action="/HomePage" style="text-align:center">';
    response += '<input type="hidden" name="role" value="' + params.role + '">';
    response += '<input type="hidden" name="id" value="' + params.id + '">';
    response += '<input type="submit" style="margin-top:250px" value="Click to Continue"></form>';
    res.send(response);
    for (item in req.body) {
        if (item == 'year')
            continue;
        var sql = 'insert into due(name,amount,year) values("' + item + '",' + req.body[item] + ',' + req.body.year + ')';
        connection.query(sql);
    }
})

app.post('/ResultResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    var sql = 'insert into result values(' + req.body.student_id + ',' + req.body.exam_id + ',' + req.body.marks + ')';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log('1 row inserted successfully');
    })
    var response ='<link href="style1.css" rel="stylesheet" />'
    response += '<form action="/HomePage" style="text-align:center">';
    response += '<input type="hidden" name="role" value="' + params.role + '">';
    response += '<input type="hidden" name="id" value="' + params.id + '">';
    response += '<input type="submit" value="Click to Continue"></form>';
    res.send(response);
})

var globalsql;

app.get('/QueryResult', function (req, res) {
    connection.query(globalsql, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    })
})

app.post('/QueryResponse', urlencodedParser,async function (req, res) {
    globalsql = req.body.sql;
    res.sendFile(__dirname + '/' + 'QueryResult.html');
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'OuterHome.html');
})

app.get('/Login', function (req, res) {
    res.sendFile(__dirname + '/' + 'Login.html');
})

app.post('/LoginResponse', urlencodedParser, function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role == 'admin') {
        if (req.body.password == 'admin')
            return res.sendFile(__dirname + '/' + 'Home.html');
        else
            return res.send('unauthorized');
    }
    var sql = 'select password from ' + params.role + ' where id=' + params.id;
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        if (result[0].password == req.body.password)
            return res.sendFile(__dirname + '/' + 'Home.html');
        else
            return res.send('unauthorized');
    })
})

app.listen(8000, function () {
    console.log("We are at port 8000");
})