import { Fragment, useState } from "react";
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
              onCreate={() => {
                console.log("create issue");
              }}
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
    </Fragment>
  );
};

export default ProjectBoard;
