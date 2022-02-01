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
  ProjectCategory,
  ProjectService,
  ProjectType,
} from "../../services/ProjectService";
import { Avatar, Form, Icon, IssuePriorityIcon } from "../../components";
import { UserService } from "../../services/UserService";
import { getAuth } from "firebase/auth";
import toast from "../../utils/toast";

const propTypes = {
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectCreate = ({ onCreate, modalClose, users }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const auth = getAuth();

  // filter out the current user from the list of users
  users = users.filter((user) => user.uid !== auth.currentUser.uid);
  return (
    <Form
      enableReinitialize
      initialValues={{
        name: "",
        description: "",
        category: ProjectCategory.ENGINEERING,
        type: ProjectType.SOFTWARE,
        collaborators: [],
      }}
      validations={{
        description: Form.is.maxLength(1000),
        name: [Form.is.required(), Form.is.maxLength(200)],
        category: Form.is.required(),
        type: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        setIsLoading(true);
        try {
          await ProjectService.getInstance().createProject({
            ...values,
            createdBy: auth.currentUser.uid,
          });
          onCreate();
        } catch (error) {
          toast.error(error.message);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Project</FormHeading>
        <Form.Field.Input
          name="name"
          label="Project Name"
          tip="Project name must be unique."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the project."
        />
        <Form.Field.Select
          name="category"
          label="Category"
          tip="Select the category of the project."
          options={ProjectCategoryOptions}
        />
        <Form.Field.Select
          isMulti
          name="collaborators"
          label="Collaborators"
          tip="Select the users that will be collaborating on the project."
          options={userOptions(users)}
          renderOption={renderUser(users)}
          renderValue={renderUser(users)}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isLoading}>
            Save
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const ProjectCategoryOptions = Object.values(ProjectCategory).map((item) => ({
  value: item,
  label: item,
}));

const userOptions = (users) =>
  users.map((user) => ({ value: user.uid, label: user.displayName }));

const renderUser =
  (users) =>
  ({ value: userId, removeOptionValue }) => {
    const user = users.find(({ uid }) => uid === userId);
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

ProjectCreate.propTypes = propTypes;

export default ProjectCreate;
