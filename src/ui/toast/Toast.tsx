import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <>
      <Toaster
        position="bottom-right"
        containerClassName="hidden lg:block"
        reverseOrder={false}
      />

      <Toaster
        position="top-center"
        containerClassName="lg:hidden"
        reverseOrder={false}
      />
    </>
  );
}
