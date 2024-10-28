import LoginForm from "@forms/LoginForm";
import { loginInfo } from "@infos/authPage/login.info";
import { User } from "@nextui-org/react";

export default function Login() {
  return (
    <div className="flex w-[calc(100vw_-_20px)] min-h-[550px] h-[calc(100vh_-_100px)]">
      <LoginForm />

      <div className="relative flex-col-reverse hidden w-1/2 p-10 bg-center bg-cover shadow-small lg:flex bg-primary">
        <div className="flex flex-col items-end gap-4">
          <User
            avatarProps={{
              src: "Iso.png",
            }}
            classNames={{
              base: "flex flex-row-reverse",
              name: "w-full text-right text-black",
              description: "text-black/80",
            }}
            description={loginInfo.position}
            name={loginInfo.author}
          />
          <p className="w-full text-2xl text-right text-black/60">
            <span className="font-medium">“</span>
            <span className="italic font-normal">{loginInfo.quote}</span>
            <span className="font-medium">”</span>
          </p>
        </div>
      </div>
    </div>
  );
}
