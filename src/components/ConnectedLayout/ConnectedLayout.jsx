"use client";

import Link from "next/link";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../button/Button";
import { signOut, useSession } from "next-auth/react";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NewPostForm from "../NewPostForm/NewPostForm";

export default function ConnectedLayout({ children }) {
  //Variable
  const pathname = usePathname();
  const { data: session } = useSession();

  //state
  const [openModal, setOpenModal] = useState(false);

  //cycle
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);
  return (
    <section className="flex flex-col min-h-screen px-5">
      {openModal &&
        createPortal(
          <div
            className="modale-background"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpenModal(false);
              }
            }}
          >
            <div className="modale-foreground">
              <NewPostForm closeModale={() => setOpenModal(false)} />
            </div>
          </div>,
          document.body
        )}
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        {/* Nav */}
        <nav className="absolute left-0 top-0 right-0 flex justify-center py-7 gap-5 z-0">
          {/* Index */}
          <Link href={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10  hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
                pathname == "/" ? "text-white" : "text-threads-gray-dark "
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M224 115.55V208a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16v-40a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v40a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-92.45a16 16 0 0 1 5.17-11.78l80-75.48l.11-.11a16 16 0 0 1 21.53 0a1.14 1.14 0 0 0 .11.11l80 75.48a16 16 0 0 1 5.08 11.78"
              ></path>
            </svg>
          </Link>
          {/* Search */}
          <Link href={"/search"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10  hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
                pathname == "/search" ? "text-white" : "text-threads-gray-light"
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
              ></path>
            </svg>
          </Link>
          {/* create */}
          {session?.user?.email && (
            <svg
              onClick={() => setOpenModal(true)}
              className={`w-10 h-10  hover:bg-threads-gray-dark cursor-pointer duration-150 p-1 rounded-xl ${"text-threads-gray-light"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="m232.49 55.51l-32-32a12 12 0 0 0-17 0l-96 96A12 12 0 0 0 84 128v32a12 12 0 0 0 12 12h32a12 12 0 0 0 8.49-3.51l96-96a12 12 0 0 0 0-16.98M192 49l15 15l-11 11l-15-15Zm-69 99h-15v-15l56-56l15 15Zm105-7.43V208a20 20 0 0 1-20 
                20H48a20 20 0 0 1-20-20V48a20 20 0 0 1 20-20h67.43a12 12 0 0 1 0 
                24H52v152h152v-63.43a12 12 0 0 1 24 0"
              ></path>
            </svg>
          )}
          {/* user */}
          {session?.user?.email && (
            <Link href={`/@${session.user.pseudo}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-10 h-10  hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
                  pathname.includes("@")
                    ? "text-white"
                    : "text-threads-gray-light"
                }`}
                viewBox="0 0 256 256"
              >
                <g fill="currentColor">
                  <path
                    d="M192 96a64 64 0 1 1-64-64a64 64 0 0 1 64 64"
                    opacity=".2"
                  ></path>
                  <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"></path>
                </g>
              </svg>
            </Link>
          )}
        </nav>
        {/* logo */}
        <Image src={"/logo.png"} alt="treads" width={40} height={40}></Image>
        {/* Button */}
        <div className="z-10">
          {session?.user?.email ? (
            <Button withoutMarginTop onclick={() => signOut}>
              Se déconnecter
            </Button>
          ) : (
            <Link href={"/login"}>
              <Button withoutMarginTop>Se connecter</Button>
            </Link>
          )}
        </div>
      </header>
      {/* Content */}
      <div className="flex-1">{children}</div>
      {/*Footer  */}
      <Footer />
    </section>
  );
}
