import { getAuth } from "firebase/auth";
import React from "react";
import { Avatar, Button, Modal, PageLoader } from "../components";
import { ProjectService } from "../services/ProjectService";
import styled from "styled-components";
import { color, font, mixin, sizes } from "../styles/styles";
import ProjectCreate from "./ProjectCreate";
import { UserService } from "../services/UserService";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [isCreateProjectModelOpen, setIsCreateProjectModelOpen] =
    React.useState(false);

  const [users, setUsers] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          const users = await UserService.getInstance().getUsers();
          setUsers(users);
        } catch (error) {
          toast.error(error.message);
        }
      })();
    }
  }, []);

  React.useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          const projects = await ProjectService.getInstance().getProjects();
          setProjects(projects);
        } catch (error) {
          toast.error(error.message);
        }
        setIsLoading(false);
      })();
    }
  }, [isCreateProjectModelOpen]);

  if (!currentUser || isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Modal
        isOpen={isCreateProjectModelOpen}
        onClose={() => setIsCreateProjectModelOpen(false)}
        width={800}
        withCloseIcon={false}
        renderContent={(modal) => (
          <ProjectCreate
            onCreate={() => {
              setIsCreateProjectModelOpen(false);
            }}
            modalClose={() => setIsCreateProjectModelOpen(false)}
            users={users}
          />
        )}
      />
      <Projects>
        <Header>
          <Title>Projects</Title>
          <Button
            variant="primary"
            onClick={() => {
              setIsCreateProjectModelOpen(true);
            }}
          >
            Create Project
          </Button>
        </Header>

        <ProjectsList>
          {projects &&
            projects.map((project) => (
              <ProjectLink
                to={`/projects/${project.id}`}
                key={`/projects/${project.id}`}
              >
                <Project key={project.id}>
                  <ProjectTitle>{project.name}</ProjectTitle>
                  <Bottom>
                    <div>
                      <ProjectCategory>{project.category}</ProjectCategory>
                    </div>
                    <Assignees>
                      {[...project.collaborators, project.createdBy].map(
                        (collaboratorID) => {
                          const collaborator = users.find(
                            (user) => user.uid === collaboratorID
                          );
                          return (
                            <AssigneeAvatar
                              key={collaborator.uid}
                              size={24}
                              avatarUrl={collaborator.photoURL}
                              name={collaborator.displayName}
                            />
                          );
                        }
                      )}
                    </Assignees>
                  </Bottom>
                </Project>
              </ProjectLink>
            ))}
        </ProjectsList>
      </Projects>
    </>
  );
}

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

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const ProjectTitle = styled.p`
  padding-bottom: 11px;
  ${font.size(18)}
  @media (max-width: 1100px) {
    ${font.size(17.5)}
  }
`;

export const ProjectLink = styled(Link)`
  display: block;
  margin-bottom: 5px;
`;

export const Project = styled.div`
  padding: 10px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;
  ${mixin.clickable}
  @media (max-width: 1100px) {
    padding: 10px 8px;
  }
  &:hover {
    background: ${color.backgroundLight};
  }
  ${(props) =>
    props.isBeingDragged &&
    css`
      transform: rotate(3deg);
      box-shadow: 5px 10px 30px 0px rgba(9, 30, 66, 0.15);
    `}
`;

const ProjectCategory = styled.p`
  ${font.size(12)}
  ${font.medium}
  color: ${color.textLight};
  margin-bottom: 0;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Assignees = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-left: 2px;
`;

export const AssigneeAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;
