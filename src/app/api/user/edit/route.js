import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  const pseudo = data.pseudo;
  const profile = data.profile;
  let bio = data.bio;
  const url = data.url;

  if (!bio) {
    bio = "-";
  }
  let client;
  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database

    const db = client.db(process.env.MONGODB_DATABASE);

    // FIRST: verify if the user exist
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();
    if (user.length === 0) {
      await client.close();

      return NextResponse.json(
        {
          error: "Utilisateur non inexistant.",
        },
        {
          status: 404,
        }
      );
    }

    //Second : Updating
    await db.collection("users").updateOne(
      { pseudo },
      {
        $set: {
          profile,
          bio,
          url,
        },
      }
    ),
      await client.close();

    return NextResponse.json({ user }, { status: 200 });
  } catch (e) {
    await client.close();

    return NextResponse.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}
