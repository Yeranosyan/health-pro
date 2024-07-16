import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new-appointment", patient.name);

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
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright mt-10 py-12">
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
        </div>
      </section>
    </div>
  );
}
