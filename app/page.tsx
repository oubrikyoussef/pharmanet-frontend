"use client";
import { LoginForm } from "@/components/ui/users/LoginForm";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    
    if (currentUser) {
      if (currentUser.role === "pharmacist") {
        router.push("/pharmacist");
      } else if (currentUser.role === "admin") {
        router.push("/admin");
      }
    } else {
      setShouldShowLogin(true);
    }
    setAuthChecked(true);
  }, [router]);

  if (!authChecked || !shouldShowLogin) {
    return null;
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto flex justify-between">
        <div className="sub-container max-w-[496px]">
          <div className="flex gap-3 items-center justify-center mb-10">
            <Image
              src="/assets/icons/logo.png"
              height={90}
              width={90}
              alt="patient"
            />
            <p className="font-bold text-xl">PharmaNet</p>
          </div>
          <LoginForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © {new Date().getUTCFullYear().toString()} PharmaNet.
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/pharmacist_online_order.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;