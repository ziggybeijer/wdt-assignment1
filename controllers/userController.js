const mysql = require('mysql');
const User = require('../models/user');

// View Users
exports.view = (req, res) => {
  User.viewUsers()
    .then(rows => {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  User.findUser(searchTerm).then(rows => res.render('home', { rows }));
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  User.createUser(req.body).then(() => res.render('add-user', { alert: 'User added successfully.' }));
}


// Edit user
exports.edit = (req, res) => {
  User.editUser(req.params.id).then(rows => res.render('edit-user', { rows }));
}


// Update User
exports.update = (req, res) => {
  User.updateUser(req.body, req.params.id).then(rows => res.render('edit-user', { rows, alert: `${req.body.first_name} has been updated.` }));
  
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  User.deleteUser(req.params.id).then(() => {
    let removedUser = encodeURIComponent('User successeflly removed.');
    res.redirect('/?removed=' + removedUser);
  })
}

// View Users
exports.viewall = (req, res) => {
  User.viewAllUsers(req.params.id).then(rows => res.render('view-user', { rows }));
}