import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PageLoader } from "../components";
import { ProjectService } from "../services/ProjectService";
import { sizes } from "../styles/styles";

export default function Project() {
  const param = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [project, setProject] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      try {
        const project = await ProjectService.getInstance().getProject(param.id);
        setProject(project);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  console.log(project);
  return <ProjectPage></ProjectPage>;
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
