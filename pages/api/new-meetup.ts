/**
  api folder is a reserved folder name in Next.js which is used to create API endpoints to use inside of Next.js app

  Can be used to create API's to communicate and pull data from a database
  API routes will only run on the server and are never served on the Client

  Filename used in api folder is auto defined as the API route: api/new-meetup
*/

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

interface DataReq {
  title: string;
  image: string;
  address: string;
  description: string;
}

// api function defined in file in api folder will auto get access to req and res objects like in Node.js
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // by checking the request type to a POST request can limit API endpoint to only POST request types
  if (req.method === "POST") {
    const data: DataReq = req.body;

    // const { title, image, address, description } = data;

    // store in database
    // Use MongoClient and use connect() method to connect to a MongoDB database from function - as this functions runs on the server can safely pass in username and password, will never get exposed on the client side.
    const client = await MongoClient.connect(
      "mongodb+srv://liamgroves46_db_user:GudfgyfAb1OBlRkg@cluster0.jvfhbfw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );

    // After awaiting connection to DB can use db() method to store database reference to variable
    const db = client.db();

    // MongoDB is built up of collections - where all data is stored to in a database
    // use collection() method and pass in name to either return an existing set up collection otherwise MongoDB will create a new collection.
    const meetupsCollection = db.collection("meetups");

    // insertOne from collection allows to add data to database - pass in JS object of data wanting to store.
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    // end connection with database after collection data added
    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
