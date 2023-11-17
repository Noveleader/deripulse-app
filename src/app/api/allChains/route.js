import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

let mongoClient;
async function fetchDataFromDatabase() {
  const database = mongoClient.db("deripulse");
  const collection = database.collection("wholeData");
  const cursor = await collection.find({});
  const cachedData = await cursor.map((doc) => doc.chainwise).toArray();
  return cachedData;
}

export async function GET(req, res) {
  console.log("here");
  if (req.method !== "GET") {
    return new NextResponse(405); 
  }
  try {
    mongoClient = await clientPromise;
    const responseData = await fetchDataFromDatabase();
    return NextResponse.json(responseData[0]);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error });
  }
}
