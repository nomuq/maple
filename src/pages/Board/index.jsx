import { Fragment, useState } from "react";
import { Breadcrumbs } from "../../components";
import ProjectBoardHeader from "./Header";
import ProjectBoardLists from "./Lists";

const defaultFilters = {
  searchTerm: "",
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBoard = ({ project }) => {
  const [filters, setFilters] = useState(defaultFilters);

  if (!project.issues) {
    project.issues = [];
  }

  return (
    <Fragment>
      <Breadcrumbs items={["Projects", project.name, "Kanban Board"]} />
      <ProjectBoardHeader />
      <ProjectBoardLists
        project={project}
        filters={filters}
        updateLocalProjectIssues={() => {}}
      />
    </Fragment>
  );
};

export default ProjectBoard;
