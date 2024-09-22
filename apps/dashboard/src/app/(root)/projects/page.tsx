import Main from "@/components/main";
import { Badge } from "@v1/ui/badge";

export default function ProjectsPage() {
  return (
    <Main>
      <div>
        <h1>Projects</h1>
      </div>
      <div className="flex gap-2">
        <Badge size="lg">Default</Badge>
        <Badge variant="outline" size="lg">
          Draft
        </Badge>
        <Badge variant="secondary" size="lg">
          Pending
        </Badge>
        <Badge variant="destructive">Failed</Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="success">success</Badge>
      </div>
    </Main>
  );
}
