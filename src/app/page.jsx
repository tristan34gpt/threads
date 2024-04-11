import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/post/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import { MongoClient } from "mongodb";

export default async function Index() {
  //Variable
  const session = await getServerSession(authOptions);

  let posts, client;
  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    //Select the "post" collection
    posts = await db.collection("post").find().sort({ creation: -1 }).toArray();

    //Format posts
    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
  } catch (e) {
    throw new Error(e.message);
  } finally {
    if (client) {
      await client.close();
    }
  }
  return (
    <ConnectedLayout>
      <div className="mb:w-[700px] w-full mx-auto mt-10">
        {/* New post */}
        {session?.user && (
          <div className="border-b border-threads-gray-dark py-4">
            <NewPostForm />
          </div>
        )}
        {/* Posts */}
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </ConnectedLayout>
  );
}
