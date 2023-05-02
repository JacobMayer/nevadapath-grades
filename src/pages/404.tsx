import { Button } from "@mantine/core";
import NotFoundSvgComponent from "../components/NotFoundSvg";
import Link from "next/link";

function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-2">
      <div className="flex flex-wrap-reverse">
        <div className="flex-auto">
          <h1 className="text-4xl font-bold">404</h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="mb-8 mt-4 text-xl font-light leading-relaxed">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
          <Link href="/" passHref>
            <Button variant="light">Go Home</Button>
          </Link>
        </div>

        <div className="w-64 flex-auto">
          <NotFoundSvgComponent />
        </div>
      </div>
    </div>
  );
}
export default PageNotFound;
