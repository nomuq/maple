import React from "react";
import { Button } from "../../../components";

import { Header, BoardName } from "./Styles";

const ProjectBoardHeader = ({ setShowCreateIssueModal }) => (
  <Header>
    <BoardName>Kanban board</BoardName>

    <Button variant="primary" onClick={() => setShowCreateIssueModal()}>
      Create Issue
    </Button>
  </Header>
);

export default ProjectBoardHeader;
