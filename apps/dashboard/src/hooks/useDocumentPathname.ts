import { getSegmentAfterDocuments } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function useDocumentPathname() {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const folderPath = getSegmentAfterDocuments(decodeURI(pathname));
  const organizationId = paths[2];
  const employeeId = paths[3];

  return {
    organizationId,
    employeeId,
    folderPath,
    pathname,
  };
}
