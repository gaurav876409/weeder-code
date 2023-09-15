// libraries consts
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// file consts
const connect = require("./database/mongoDb.js");

const fs = require("fs");
// const express = require("express");
// const server = express();

// Importing products from userDetails.json file
const userDetails = JSON.parse(
  fs.readFileSync(`${__dirname}/database/mongoDb.json`)
);

//Middlewares
server.use(express.json());

//Write DELETE endpoint for deleting the details of user
server.delete("/auth", (req, res) => {
  const deleteId = parseInt(req.params.id, 10); // Parse the deleteId to an integer
  console.log("Delete ID:", deleteId);

  // Check if the userDetails array is properly populated with user details
  console.log("userDetails:", userDetails);

  const deleteIndex = userDetails.findIndex((user) => user.id === deleteId);
  console.log("Delete Index:", deleteIndex);

  if (deleteIndex === -1) {
    res.status(404).json({
      status: "failed",
      message: "User not found!",
    });
  } else {
    // Get the user details before deleting
    const deletedUser = userDetails[deleteIndex];
    // Remove the user with the specified ID from the userDetails array
    userDetails.splice(deleteIndex, 1);
    res.status(200).json({
      status: "success",
      message: "User details deleted successfully",
      data: {
        details: deletedUser,
      },
    });
  }
});

    server.patch("/auth", (req, res) => {
      const id = req.params.id * 1;
      const updatedDetails = userDetails.find(
        (updatedDetails) => updatedDetails.id === id
      );
      const index = userDetails.indexOf(updatedDetails);
      if (!updatedDetails) {
        return res.status(404).send({
          status: "failed",
          message: "User not found!",
        });
      }

      Object.assign(updatedDetails, req.body);

      fs.writeFile(
        `${__dirname}/database/mongoDb.json`,
        JSON.stringify(userDetails),
        (err) => {
          res.status(200).json({
            status: "success",
            message: `User details updated successfully for id: ${updatedDetails.id}`,
            data: {
              updatedDetails,
            },
          });
        }
      );
    });

    // POST endpoint for registering new user
    server.post("/auth", (req, res) => {
      const newId = userDetails[userDetails.length - 1].id + 1;
      const { name, mail, number } = req.body;
      const newUser = { id: newId, name, mail, number };
      userDetails.push(newUser);
      fs.writeFile(
        `${__dirname}/database/mongoDb.json`,
        JSON.stringify(userDetails),
        (err) => {
          res.status(201).json({
            status: "Success",
            message: "User registered successfully",
            data: {
              userDetails: newUser,
            },
          });
        }
      );
    });

    // GET endpoint for sending the details of users
    server.get("/auth", (req, res) => {
      res.status(200).json({
        status: "Success",
        message: "Detail of users fetched successfully",
        data: {
          userDetails,
        },
      });
    });

    // GET endpoint for sending the details of users by id
    server.get("/auth", (req, res) => {
      let { id } = req.params;
      id *= 1;
      const details = userDetails.find((details) => details.id === id);
      if (!details) {
        return res.status(404).send({
          status: "failed",
          message: "User not found!",
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "Details of users fetched successfully",
          data: {
            details,
          },
        });
      }
    });

    module.exports = server;


// router consts
const userRouter = require("./routes/userRoutes.js");

// server
const server = express();
const port = 5000;

server.use(bodyParser.json());
server.use(cors());
server.use("/auth", userRouter);

connect(); //you will have to edit this in ./databse/mongoDb.js

server.listen(port, () => console.log(`server started on port ${port}`));
