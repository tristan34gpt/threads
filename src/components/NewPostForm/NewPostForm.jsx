"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { createPost } from "@/actions/create-post";

export default function NewPostForm({ closeModale = () => {} }) {
  //Variable
  const { data: session } = useSession();

  //state
  const [textarea, setTextarea] = useState("");

  //function
  const onprepare = async (formData) => {
    try {
      await createPost(formData);
      setTextarea("");
    } catch (e) {
      return toast.error(e.message);
    }
    closeModale();
  };
  return (
    <form action={onprepare}>
      <div className="flex gap-3 w-full">
        {/* photo */}
        <div>
          <Image
            src={session?.user.profile}
            alt="user"
            width={50}
            height={50}
            className="rounded-full mt-5"
            unoptimized
          />
        </div>
        {/* Content */}
        <div className="flex-1">
          <textarea
            placeholder="Commencer un thread..."
            className="input"
            name="content"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <Button formButton disabled={textarea.length < 1}>
            Publier
          </Button>
        </div>
      </div>
    </form>
  );
}
