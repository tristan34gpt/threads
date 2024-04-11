import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  // GET the pseudo form the request body
  const data = await request.json();
  const { pseudo } = data;
  let client;

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database

    const db = client.db(process.env.MONGODB_DATABASE);

    //FIRST: Get the user
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    if (!user) {
      throw new Error("L'utilisateur n'existe pas");
    }
    //Formatting

    user = user.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }))[0];

    // Second: Get the posts

    let posts = await db
      .collection("post")
      .find({ pseudo })
      .sort({ creation: -1 })
      .toArray();

    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));

    await client.close();

    return NextResponse.json(
      {
        user,
        posts,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    await client.close();
    throw new Error(e.message);
  }
}
