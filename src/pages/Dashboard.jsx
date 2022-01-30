import { getAuth } from "firebase/auth";
import React from "react";
import { Button, PageLoader } from "../components";
import { ProjectService } from "../services/ProjectService";
import styled from "styled-components";
import { font, sizes } from "../styles/styles";

export const Projects = styled.div`
  padding: 25px;
`;

export const Header = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  ${font.size(24)}
  ${font.medium}
`;

export default function Dashboard() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  React.useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          const projectService = new ProjectService();
          const projects = await projectService.getProjects();
          console.log(projects);
        } catch (error) {
          toast.error(error.message);
        }
      })();
    }
  }, []);

  if (!currentUser) {
    return <PageLoader />;
  }

  return (
    <>
      <Projects>
        <Header>
          <Title>Projects</Title>
          <Button variant="primary">Create Project</Button>
        </Header>
      </Projects>
    </>
  );
}
