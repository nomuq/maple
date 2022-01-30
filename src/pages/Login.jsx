import React from "react";
import styled from "styled-components";
import { Button, Form } from "../components";
import { font } from "../styles/styles";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import toast from "../utils/toast";

export const FormElement = styled(Form.Element)`
  padding: 25px 40px 35px;
`;

export const FormHeading = styled.div`
  padding-bottom: 15px;
  ${font.size(21)}
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 30px;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
`;

export const Center = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Card = styled.div``;

// export const Center = styled.div`
//   // display: inline-block;
//   // position: relative;
//   // width: 100%;
//   // background: #fff;
//   // max-width: 400px;
//   // vertical-align: middle;
//   // border-radius: 3px;
//   // box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
// `;

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Center>
      <Card>
        <Form>
          <FormElement>
            {/* <FormHeading>Login</FormHeading> */}
            <Button
              variant="primary"
              isWorking={isLoading}
              onClick={() => {
                setIsLoading(true);

                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                signInWithPopup(auth, provider)
                  .then((result) => {
                    // setIsLoading(false);
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                      GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // ...
                    console.log(user, token);
                  })
                  .catch((error) => {
                    toast.error(error.message);
                    setIsLoading(false);
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential =
                      GoogleAuthProvider.credentialFromError(error);
                  });
              }}
            >
              Login with Google
            </Button>
          </FormElement>
        </Form>
      </Card>
    </Center>
  );
}
