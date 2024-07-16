import Image from "next/image";
import { getUser } from "@/lib/actions/patient.actions";
import RegisterForm from "@/components/forms/RegisterForm";
import * as Sentry from "@sentry/nextjs";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px]">
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
          <RegisterForm user={user} />
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
