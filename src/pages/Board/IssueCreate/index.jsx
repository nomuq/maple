import React from "react";
import PropTypes from "prop-types";

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from "./Styles";
import {
  Avatar,
  Form,
  Icon,
  IssuePriorityIcon,
  IssueTypeIcon,
} from "../../../components";
import {
  IssuePriority,
  IssuePriorityCopy,
  IssueType,
  IssueTypeCopy,
} from "../../../constants/issues";
import { getAuth } from "firebase/auth";
import { ProjectService } from "../../../services/ProjectService";
import toast from "../../../utils/toast";

const propTypes = {
  project: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectIssueCreate = ({ project, onCreate, modalClose }) => {
  const auth = getAuth();
  const [isCreating, setIsCreating] = React.useState(false);

  return (
    <Form
      enableReinitialize
      initialValues={{
        type: IssueType.TASK,
        title: "",
        description: "",
        reporterId: auth.currentUser.uid,
        assignees: [],
        priority: IssuePriority.MEDIUM,
      }}
      validations={{
        type: Form.is.required(),
        title: [Form.is.required(), Form.is.maxLength(200)],
        reporterId: Form.is.required(),
        priority: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        setIsCreating(true);
        try {
          await ProjectService.getInstance().createIssue(project, {
            ...values,
          });
          onCreate();
        } catch (error) {
          toast.error(error.message);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create issue</FormHeading>
        <Form.Field.Select
          name="type"
          label="Issue Type"
          tip="Start typing to get a list of possible matches."
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />
        <Form.Field.Input
          name="title"
          label="Short Summary"
          tip="Concisely summarize the issue in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Select
          name="reporterId"
          label="Reporter"
          options={userOptions(project)}
          renderOption={renderUser(project)}
          renderValue={renderUser(project)}
        />
        <Form.Field.Select
          isMulti
          name="assignees"
          label="Assignees"
          tio="People who are responsible for dealing with this issue."
          options={userOptions(project)}
          renderOption={renderUser(project)}
          renderValue={renderUser(project)}
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          tip="Priority in relation to other issues."
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Issue
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const typeOptions = Object.values(IssueType).map((type) => ({
  value: type,
  label: IssueTypeCopy[type],
}));

const priorityOptions = Object.values(IssuePriority).map((priority) => ({
  value: priority,
  label: IssuePriorityCopy[priority],
}));

const userOptions = (project) =>
  project.users.map((user) => ({ value: user.uid, label: user.displayName }));

const renderType = ({ value: type }) => (
  <SelectItem>
    <IssueTypeIcon type={type} top={1} />
    <SelectItemLabel>{IssueTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

const renderPriority = ({ value: priority }) => (
  <SelectItem>
    <IssuePriorityIcon priority={priority} top={1} />
    <SelectItemLabel>{IssuePriorityCopy[priority]}</SelectItemLabel>
  </SelectItem>
);

const renderUser =
  (project) =>
  ({ value: userId, removeOptionValue }) => {
    const user = project.users.find(({ uid }) => uid === userId);

    return (
      <SelectItem
        key={user.uid}
        withBottomMargin={!!removeOptionValue}
        onClick={() => removeOptionValue && removeOptionValue()}
      >
        <Avatar size={20} avatarUrl={user.photoURL} name={user.displayName} />
        <SelectItemLabel>{user.displayName}</SelectItemLabel>
        {removeOptionValue && <Icon type="close" top={2} />}
      </SelectItem>
    );
  };

ProjectIssueCreate.propTypes = propTypes;

export default ProjectIssueCreate;
