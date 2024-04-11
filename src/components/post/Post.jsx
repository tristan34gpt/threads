"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { deletePost } from "@/actions/delete-post";

export default function Post({ post }) {
  //Variable
  const { data: session } = useSession();

  //state
  const [OptionsAreOpen, setOptionsAreOpen] = useState(false);

  //function
  const onDeletePost = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce thread ?")) return;

    try {
      await deletePost(post._id);
    } catch (e) {
      toast.error(e.message);
    }

    toast.success("Le thread a été supprimé");
  };

  return (
    <div className="post">
      {/* phot */}
      <div>
        <Image
          src={post.profile}
          alt="photo de profile"
          width={50}
          height={50}
          className="rounded-full object-cover"
          unoptimized
        />
      </div>
      {/* content */}
      <div className="text-white w-full">
        {/* Infos */}
        <div className="flex items-center justify-between">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>
          <div className="flex items-center gap-1 text-sm text-threads-gray-light relative">
            <div className="text-sm text-threads-gray-light">
              {moment
                .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
                .tz("Europe/paris")
                .fromNow()}
            </div>
            {session?.user && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="cursor-pointer"
                  onClick={() => setOptionsAreOpen((prev) => !prev)}
                >
                  <path
                    fill="currentColor"
                    d="M128 96a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 40a8 8 0 1 1 8-8a8 8 0 0 1-8 8m80-40a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 40a8 8 0 1 1 8-8a8 8 0 0 1-8 8M48 96a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 40a8 8 0 1 1 8-8a8 8 0 0 1-8 8"
                  ></path>
                </svg>
              </div>
            )}
            {/* options */}
            {OptionsAreOpen && session?.user && (
              <div className="options">
                {session?.user && session.user.pseudo != post.pseudo ? (
                  <div className="option">Signaler</div>
                ) : (
                  <>
                    <div className="option">Modifier</div>
                    <div className="option" onClick={onDeletePost}>
                      Suprimer
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Text */}
        <div className="mt-3 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
