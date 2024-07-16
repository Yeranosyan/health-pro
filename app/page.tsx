import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex items-center mb-12">
            <Image
              src="/assets/logo.png"
              alt="logo HealthPro"
              width={200}
              height={200}
              priority
              className="h-12 w-fit"
            />
            <h2 className="ml-3 text-2xl">HealthPro</h2>
          </div>
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="copyright">
              &copy; 2024 HealthPro® | Powered by{" "}
              <a
                href="https://twitter.com/gago_yerevan"
                rel="noopener noreferrer"
                target="_blank"
                className="hover:text-green-500"
              >
                Gagik Yeranosyan
              </a>
              .
            </p>
            <p className="text-dark-700 text-xs"></p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
