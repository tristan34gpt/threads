"use client";

import Button from "@/components/button/Button";
import { checkEmail } from "@/utils/check-emailsyntax";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function Signin() {
  // Variable
  const router = useRouter();

  // Function
  const prepareLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // If a field is empty
    if (!email || !password) {
      return toast.error("Veuillez remplir tous les champs");
    }

    // Check if the email is valid
    if (!checkEmail(email)) {
      return toast.error("Veuillez entrer un email valide");
    }

    // Signin the user
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        return toast.error(response.error);
      }
    } catch (error) {
      return toast.error(error.message);
    }

    // Success
    toast.success("Vous êtes connecté");

    // Redirect
    router.replace("/");
  };

  return (
    <div className="w-[440px] mx-auto">
      {/* Title */}
      <h1 className="title flex items-center  gap-1 ">
        <Link href={"/login"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M222 128a6 6 0 0 1-6 6H54.49l61.75 61.76a6 6 0 1 1-8.48 8.48l-72-72a6 6 0 0 1 0-8.48l72-72a6 6 0 0 1 8.48 8.48L54.49 122H216a6 6 0 0 1 6 6"
            ></path>
          </svg>
        </Link>
        Connectez-vous
      </h1>
      {/* Form */}
      <form action={prepareLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="input"
          required
        />

        <Button>Se connecter</Button>
      </form>
      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-thread-gray-light w-1/4"></div>
        <div className="text-threads-gray-light mx-4">ou</div>
        <div className="border-t border-thread-gray-light w-1/4"></div>
      </div>
      <Link href={"/login/signup"}>
        <Button formButton>S'incrire</Button>
      </Link>
    </div>
  );
}
