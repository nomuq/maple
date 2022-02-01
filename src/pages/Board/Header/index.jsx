import React from "react";
import { Button } from "../../../components";

import { Header, BoardName } from "./Styles";

const ProjectBoardHeader = () => (
  <Header>
    <BoardName>Kanban board</BoardName>
    <a
      href="https://github.com/oldboyxx/jira_clone"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Button variant="primary">Create Issue</Button>
    </a>
  </Header>
);

export default ProjectBoardHeader;
