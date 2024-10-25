import Main from "@/components/main";

type DepartmentPageProps = {
  params: {
    departmentId: string;
  };
};

export default function DepartmentPage({ params }: DepartmentPageProps) {
  return (
    <Main
      className="flex flex-col justify-center items-center gap-4"
      isMaxHeight
    >
      {params.departmentId}
    </Main>
  );
}
