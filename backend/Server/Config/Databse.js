import mysql from 'mysql2'

export const connectDB = async () => {
   const connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:"root",
    password:"root",
    database:'project'
   });
    connection.connect((err) => {
      if(err) {
        console.error('Error connecting to the database:', err);
        return;
      }
      console.log(`Database connected at ${connection.threadId}`)
    });
   console.log(`Database connected at ${connection}`)
};

export const connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:"root",
    password:"root",
    database:'project'
   });