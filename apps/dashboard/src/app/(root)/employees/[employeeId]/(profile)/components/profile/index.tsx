import { getUserById, getUserDepartment } from "@toolkit/supabase/queries";

import { Badge } from "@toolkit/ui/badge";
import { Card } from "@toolkit/ui/card";
import {
  Cake,
  Clock,
  KeyRound,
  LayoutGrid,
  Mail,
  Phone,
  Play,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import ProfilePic from "./profle-pic";

type ProfileProps = {
  userId: string;
};

export default async function Profile({ userId }: ProfileProps) {
  const [{ data: department, error: departmentError }, { data: user, error }] =
    await Promise.all([getUserDepartment(userId), getUserById(userId)]);

  if (departmentError || !department) {
    return <div>Error: {departmentError?.message}</div>;
  }
  if (error || !user) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <h3 className="font-bold text-lg">Personal Information</h3>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className=" flex flex-col items-center min-w-fit">
          <ProfilePic user={user} />
          <h3 className="text-lg font-bold mt-4 ">
            {user?.first_name} {user?.last_name}
          </h3>
          <p className="text-secondary-foreground">{user?.job_title}</p>
          <Badge
            variant={
              user?.employment_status === "active"
                ? "success"
                : user?.employment_status === "inactive"
                  ? "destructive"
                  : "warning"
            }
            className="capitalize mt-2"
          >
            {user?.employment_status.replace("_", " ")}
          </Badge>
        </div>
        <div className="px-4 text-accent-foreground grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          <Link
            href={`mailto:${user.email}`}
            className="flex flex-col items-start gap-2 lg:flex-row group"
          >
            <p className="font-bold text-secondary-foreground ">Email :</p>
            <p className="group-hover:underline">{user.email}</p>
          </Link>

          <div className="flex flex-col items-start gap-2 lg:flex-row">
            <p className="font-bold text-secondary-foreground">Phone :</p>
            <p>{user?.phone_number}</p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:flex-row">
            <p className="font-bold text-secondary-foreground">Birthday :</p>
            <p>{moment(user?.date_of_birth).format("DD MMM YYYY")}</p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:flex-row">
            <p className="font-bold text-secondary-foreground">Hire Date :</p>
            <p>{moment(user?.hire_date).format("DD MMM YYYY")}</p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:flex-row">
            <p className="font-bold text-secondary-foreground">Department :</p>
            <p>
              {department?.department.name} -{" "}
              {department?.department.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:flex-row">
            <p className="font-bold text-secondary-foreground">Role :</p>
            <p className="capitalize">{user?.role.replace("_", " ")}</p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:flex-row">
            <p className="font-bold text-secondary-foreground">Type :</p>
            <div className="capitalize flex items-center gap-2">
              {user?.employment_type.replace("_", " ")}
              <span className="text-secondary-foreground">|</span>
              {user?.work_hours_per_week} hours / week
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
