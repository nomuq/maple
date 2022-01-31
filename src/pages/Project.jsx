import React from "react";
import { Route, Routes, useParams, useRoutes } from "react-router-dom";
import styled from "styled-components";
import { PageLoader } from "../components";
import { ProjectService } from "../services/ProjectService";
import { sizes } from "../styles/styles";
import toast from "../utils/toast";
import ProjectNavbarLeft from "./NavbarLeft";
import ProjectSettings from "./ProjectSettings";
import ProjectSidebar from "./Sidebar";

export default function Project() {
  const param = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [project, setProject] = React.useState(null);

  //  is issue search modal open
  const [isIssueSearchModalOpen, setIsIssueSearchModalOpen] =
    React.useState(false);

  // is issue create modal open
  const [isIssueCreateModalOpen, setIsIssueCreateModalOpen] =
    React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const project = await ProjectService.getInstance().getProject(param.id);
        setProject(project);
      } catch (error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <ProjectPage>
      <ProjectNavbarLeft
        issueSearchModalOpen={() => setIsIssueSearchModalOpen(true)}
        issueCreateModalOpen={() => setIsIssueCreateModalOpen(true)}
      />

      <ProjectSidebar project={project} />

      <Routes>
        <Route
          path={`/settings`}
          element={<ProjectSettings project={project} />}
        />
      </Routes>
    </ProjectPage>
  );
}

const paddingLeft = sizes.appNavBarLeftWidth + sizes.secondarySideBarWidth + 40;

export const ProjectPage = styled.div`
  padding: 25px 32px 50px ${paddingLeft}px;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${paddingLeft - 20 - sizes.secondarySideBarWidth}px;
  }
`;
