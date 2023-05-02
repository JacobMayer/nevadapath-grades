import { Button } from "@mantine/core";
import NotFoundSvgComponent from "../components/NotFoundSvg";
import Link from "next/link";

function PageNotFound() {
  return (
    <div className="container mx-auto px-12 sm:px-36">
      <div className="flex min-h-screen flex-col justify-center py-6">
        <div className="flex flex-wrap-reverse">
          <div className="flex-auto">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <p className="mb-8 mt-4 text-xl font-light leading-relaxed">
              Oops! The page you are looking for does not exist.
              <br /> It might have been moved or deleted.
            </p>
            <Link href="/" passHref>
              <Button variant="light">Go Home</Button>
            </Link>
          </div>

          <div className="w-3/4 shrink lg:max-w-md">
            <NotFoundSvgComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PageNotFound;
