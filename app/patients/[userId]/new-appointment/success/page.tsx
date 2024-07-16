import Image from "next/image";
import Link from "next/link";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_appointment-success", user.name);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/assets/logo.png"
              alt="logo HealthPro"
              width={200}
              height={200}
              className="h-12 w-fit"
            />
            <h2 className="ml-3 text-2xl">HealthPro</h2>
          </div>
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={80}
            height={80}
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your
            <span className="text-green-500"> appointment request </span>
            has been successfully submitted!
          </h2>
          <p className=" text-center text-dark-700 xl:text-left">
            We&apos;ll be in touch shortly to confirm.
          </p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar icon"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
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
  );
};

export default Success;
