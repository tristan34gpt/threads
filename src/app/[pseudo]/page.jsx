"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Post from "@/components/post/Post";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { createPortal } from "react-dom";
import Button from "@/components/button/Button";

export default function profile() {
  // Variable
  const params = useParams();
  const pseudo = params.pseudo.slice(3);
  const { data: session } = useSession();
  const [openModale, setOpenModale] = useState(false);
  const [profileInput, setProfileInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  //states
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!pseudo) {
      router.push("/");
    }
    fetchUserDataPosts();
  }, []);

  //cycle
  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModale]);

  //Funcion
  const fetchUserDataPosts = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo }),
    });

    const data = await response.json();
    if (!response.ok) {
      toast.error("Une erreur est intervenue ");
    }

    if (!data.user) {
      router.push("/");
      return;
    }

    setUser(data.user);
    setPosts(data.posts);
  };

  const edit = () => {
    // Set inputs
    setProfileInput(user.profile);
    setBioInput(user.bio);
    setLinkInput(user.url);
    setOpenModale(true);
  };

  const editUser = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const response = await fetch("/api/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo,
        profile: profileInput,
        bio: bioInput,
        url: linkInput,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      toast.error("Une erreur est intervenue");
      return;
    }

    const newUser = {
      ...user,
      profil: profileInput,
      bio: bioInput,
      url: linkInput,
    };
    setUser(newUser);

    setOpenModale(false);
    setIsLoading(false);

    toast.success("profil mis à jour");
  };
  return (
    <ConnectedLayout>
      {openModale &&
        createPortal(
          <div
            className="modale-background"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpenModale(false);
              }
            }}
          >
            <div className="modale-user-foreground">
              {/* photo */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="label" htmlFor="picture">
                    photo de profile
                  </label>
                  <input
                    type="url"
                    name="picture"
                    id="picture"
                    className="input"
                    placeholder="https//www.johndoe.com"
                    value={profileInput}
                    onChange={(e) => setProfileInput(e.target.value)}
                  />
                </div>
                <div>
                  <Image
                    src={user.profile}
                    alt="User"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
              {/* bio */}
              <div className="mt-5">
                <label htmlFor="bio" className="label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="input"
                  placeholder="Bio"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                ></textarea>
              </div>
              {/* url */}
              <div className="mt-5">
                <label htmlFor="url" className="label">
                  Lien
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  className="input"
                  placeholder="https://belivemy.com"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                />
              </div>

              <div className="flex justify-end mt-1">
                <div>
                  <Button onclick={editUser} disabled={isLoading}>
                    Terminer
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      <div className="mt-10 md:w-[700px] mx-auto text-white">
        {/* Infos */}
        <div className="flex justify-between gap-4">
          {/* Data */}
          <div>
            <h1 className="text-3xl font-semibold">{user.username}</h1>
            <div className="text-threads-gray-light mt-2">@{pseudo}</div>
            <div className="mt-5 whitespace-pre-line">{user.bio}</div>
            {user && user.url && (
              <div
                className="mt-5 text-blue-500 hover:text-blue-400
             duration-150 "
              >
                <a href={user.url} target="_blank">
                  {user.url}
                </a>
              </div>
            )}
          </div>
          {/* photo */}
          <div>
            <Image
              src={user.profile}
              alt="User"
              width={100}
              height={100}
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Updating */}
        {session?.user?.pseudo === pseudo && (
          <div className="user-button" onClick={edit}>
            Modifier le profile
          </div>
        )}
        {/* Tabs */}
        <div className="flex mt-10">
          {/* Threads */}
          <div
            className="flex-1 border-b border-white pb-4 px-4 
          text-center hover:text-white hover:border-white duration-150 cursor-pointer"
          >
            Threads
          </div>

          {/* Reponses */}
          <div
            className="flex-1 border-b border-threads-gray-light text-threads-gray-light pb-4 px-4 
          text-center hover:text-white hover:border-white duration-150 cursor-pointer"
          >
            Réponses
          </div>

          {/* Reposts */}
          <div
            className="flex-1 border-b border-threads-gray-light text-threads-gray-light pb-4 px-4 
          text-center hover:text-white hover:border-white duration-150 cursor-pointer"
          >
            Republications
          </div>
        </div>
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
