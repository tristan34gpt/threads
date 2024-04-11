"use server";

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-emailsyntax";

export const createUser = async (username, pseudo, email, password) => {
  // If
  //If a field is empty
  if (!username || !pseudo || !email || !password) {
    //Notification
    throw new Error("Aucun champ ne doit être vide !");
  }

  // Chek if the email is valid
  if (!checkEmail(email)) {
    throw new Error("veuillez entrer un email valide ! ");
  }

  //Connect to the MongoDB cluster

  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    //First : Verify if this email is already used
    // Select the "users" collection
    let user = await db.collection("users").find({ email }).limit(1).toArray();
    // If the email is already used
    if (user.length !== 0) {
      await client.close();
      throw new Error("cet email est déja utilisé");
    }

    // SECOND: Verify if this pseudo is already used
    // Select the "users" collection
    user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    //If the pseudo is already used
    if (user.length !== 0) {
      await client.close();

      throw new Error("Ce pseudo est déja utilisé");
    }

    // THIRD: Encrypt the password

    const encryptedPassword = await bcrypt.hash(password, 10);

    // FOURTH: Create the user
    await db.collection("users").insertOne({
      username,
      pseudo,
      email,
      password: encryptedPassword,
      profile: "/picture.png",
      bio: "-",
      url: "",
      creation: new Date(),
    });
  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();
};
