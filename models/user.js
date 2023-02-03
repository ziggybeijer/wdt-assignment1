const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

class User {    
    static viewUsers() {
        // User the connection
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE status = "active" OR status = "none"', (err, rows) => {
                // When done with the connection, release it
                console.log('The data from user table: \n', rows);
                if (!err) {
                    resolve(rows);
                } else {
                    console.log(err);
                    throw err;
                }
            });
        })
    }

    static findUser(searchTerm) {
        // User the connection
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
                console.log('The data from user table: \n', rows);
                if (!err) {
                    resolve(rows);
                } else {
                    console.log(err);
                    throw err;
                }
            });
        })
    }

    static createUser(body) {
        const { first_name, last_name, email, phone, comments } = body;

        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
                console.log('The data from user table: \n', rows);
                if (!err) {
                    resolve();
                } else {
                    console.log(err);
                    throw err;
                }
            });
        })
    }

    static editUser(id) {
        // User the connection
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
                console.log('The data from user table: \n', rows);
                if (!err) {
                    resolve(rows);
                } else {
                    console.log(err);
                    throw err;
                }
            });
        })
    }   

    static updateUser(body, id) {
        const { first_name, last_name, email, phone, comments } = body;
        // User the connection
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, id], (err, rows) => {
                if (!err) {
                    // User the connection
                    connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
                        console.log('The data from user table: \n', rows);
                        // When done with the connection, release it
                        if (!err) {
                            resolve(rows)
                        } else {
                            console.log(err);
                            throw err;
                        }
                        
                    });
                } else {
                    console.log(err);
                    throw err;
                }
            });
        })
    }

    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', id], (err, rows) => {
                console.log('The data from beer table are: \n', rows);
                if (!err) {
                    resolve();
                } else {
                  console.log(err);
                  throw err;
                }
              });
        })
    }

    static activateUser(id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET status = ? WHERE id = ?', ['active', id], (err, rows) => {
                console.log('The data from beer table are: \n', rows);
                if (!err) {
                    resolve();
                } else {
                  console.log(err);
                  throw err;
                }
            })
        })
    }

    static deactivateUser(id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET status = ? WHERE id = ?', ['none', id], (err, rows) => {
                console.log('The data from beer table are: \n', rows);
                if (!err) {
                    resolve();
                } else {
                  console.log(err);
                  throw err;
                }
            })
        })
    }

    static viewAllUsers(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
                console.log('The data from user table: \n', rows);
                if (!err) {
                  resolve(rows);
                } else {
                  console.log(err);
                  throw err;
                }
            })
        })
    }
}

module.exports = User;