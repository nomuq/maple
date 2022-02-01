import { Fragment, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Breadcrumbs, Modal } from "../../components";
import ProjectBoardHeader from "./Header";
import ProjectIssueCreate from "./IssueCreate";
import ProjectBoardLists from "./Lists";

const defaultFilters = {
  searchTerm: "",
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBoard = ({ project }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [showCreateIssueModal, setShowCreateIssueModal] = useState(false);

  const navigate = useNavigate();

  if (!project.issues) {
    project.issues = [];
  }

  return (
    <Fragment>
      {showCreateIssueModal && (
        <Modal
          isOpen
          testid="modal:issue-create"
          width={800}
          withCloseIcon={false}
          onClose={() => setShowCreateIssueModal(false)}
          renderContent={(modal) => (
            <ProjectIssueCreate
              project={project}
              onCreate={() => setShowCreateIssueModal(false)}
              modalClose={() => setShowCreateIssueModal(false)}
            />
          )}
        />
      )}

      <Breadcrumbs items={["Projects", project.name, "Kanban Board"]} />
      <ProjectBoardHeader
        setShowCreateIssueModal={() => setShowCreateIssueModal(true)}
      />
      <ProjectBoardLists
        project={project}
        filters={filters}
        updateLocalProjectIssues={() => {}}
      />

      <Routes>
        <Route
          path={`/:id`}
          element={
            <Modal
              isOpen
              testid="modal:issue-details"
              width={1040}
              withCloseIcon={false}
              onClose={() => {
                navigate("/project/" + project.id + "/board");
              }}
              renderContent={(modal) => (
                <div>Fuck This</div>
                // <IssueDetails
                //   issueId={routeProps.match.params.issueId}
                //   projectUsers={project.users}
                //   fetchProject={fetchProject}
                //   updateLocalProjectIssues={updateLocalProjectIssues}
                //   modalClose={modal.close}
                // />
              )}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export default ProjectBoard;
