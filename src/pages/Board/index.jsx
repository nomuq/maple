import { Fragment } from "react";
import { Breadcrumbs } from "../../components";
import ProjectBoardHeader from "./Header";

const ProjectBoard = ({ project }) => {
  return (
    <Fragment>
      <Breadcrumbs items={["Projects", project.name, "Kanban Board"]} />
      <ProjectBoardHeader />
    </Fragment>
  );
};

export default ProjectBoard;
