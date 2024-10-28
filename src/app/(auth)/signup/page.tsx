import SignupForm from "@forms/SignupForm";
import { signupInfo } from "@infos/authPage/signup.info";
import { User } from "@nextui-org/react";

export default function signUp() {
  return (
    <div className="flex w-[calc(100vw_-_20px)] min-h-[550px]v h-[calc(100vh_-_100px)] ">
      <div className="relative flex-col-reverse hidden w-1/2 p-10 bg-center bg-cover shadow-small lg:flex bg-primary">
        <div className="flex flex-col items-start gap-4">
          <User
            avatarProps={{
              src: "Iso.png",
            }}
            classNames={{
              base: "flex flex-row-reverse",
              name: "w-full text-left text-black",
              description: "text-black/80",
            }}
            description={signupInfo.position}
            name={signupInfo.author}
          />
          <p className="w-full text-2xl text-left text-black/60">
            <span className="font-medium">“</span>
            <span className="italic font-normal">{signupInfo.quote}</span>
            <span className="font-medium">”</span>
          </p>
        </div>
      </div>

      <SignupForm />
    </div>
  );
}
