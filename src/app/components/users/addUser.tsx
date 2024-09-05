"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../landingPage";
import store, { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { User } from "@/lib/features/users/usersTypes";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.primaryTextColor};
`;

const InputField = styled.input`
  padding: 0.5rem;
  color: ${(props) => props.theme.accentColor};
  width: 90%;
  border-radius: 25px;
  border: 0;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textIconColor};
  padding: 0.5rem;
  border-radius: 25px;
  border: 0;
  width: 60%;
  cursor: pointer;
`;

export default function UserForm({
  id,
  handleModalClose,
}: {
  id?: number;
  handleModalClose: () => void;
}) {
  const [userName, setUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState({} as User | undefined);

  useEffect(() => {
    if (id) store.dispatch({ type: "user/fetchOneUser", payload: id });
    else {
      setSelectedUser(undefined);
    }
  }, []);

  useEffect(() => {
    return () => {
      setSelectedUser(undefined);
      setUserName("");
    };
  }, []);

  const stateSelectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );
  useEffect(() => {
    setSelectedUser(stateSelectedUser);
    setUserName(selectedUser?.username ?? "");
    return () => {
      setSelectedUser(undefined);
    };
  }, [stateSelectedUser]);

  const handleAddUser = (event: any) => {
    event.preventDefault();
    if (userName !== "") {
      store.dispatch({
        type: "user/addUser",
        payload: userName,
      });
      handleModalClose();
    }
  };

  const handleEditUser = (event: any) => {
    event.preventDefault();
    if (userName !== "") {
      store.dispatch({
        type: "user/updateUser",
        payload: {
          id,
          payload: userName,
        },
      });
      handleModalClose();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        {id ? <Title>Edit User</Title> : <Title>Add User</Title>}
        <InputField
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="username"
        />
        {id ? (
          <Button onClick={(event) => handleEditUser(event)}>
            <FontAwesomeIcon icon={["fas", "pen-to-square"]} />
            Update User
          </Button>
        ) : (
          <Button onClick={(event) => handleAddUser(event)}>
            <FontAwesomeIcon icon={["fas", "plus"]} />
            Add User
          </Button>
        )}
      </FormContainer>
    </ThemeProvider>
  );
}
