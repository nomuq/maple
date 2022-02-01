import { Fragment, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Modal } from "../../components";
import ProjectBoardIssueDetails from "../IssueDetails";
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
  const params = useParams();

  console.log(params);
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
                <ProjectBoardIssueDetails
                  project={project}
                  issueId={params["*"]}
                  projectUsers={project.users}
                  fetchProject={() => {}}
                  updateLocalProjectIssues={() => {}}
                  modalClose={modal.close}
                />
              )}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export default ProjectBoard;
