import Image from "next/image";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { getRecentAppointments } from "@/lib/actions/appointment.actions";

const Admin = async () => {
  const appointments = await getRecentAppointments();

  return (
    <div className="mx-auto flex max-w-6xl flex-col space-y-14">
      <header className="admin-header mt-3">
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center">
            <Image
              src="/assets/logo.png"
              alt="logo HealthPro"
              width={200}
              height={200}
              priority
              className="h-9 w-fit"
            />
            <h2 className="ml-1 text-xl">HealthPro</h2>
          </div>
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-1">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments.
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />

          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />

          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
