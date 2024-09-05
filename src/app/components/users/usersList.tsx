import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Loader from "../contentLoader";
import store, { RootState } from "@/lib/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ModalWindow } from "@/app/utils/modal";
import { User } from "@/lib/features/users/usersTypes";
import UserForm from "./addUser";

const AppBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 426px) {
    align-self: center;
    margin: 0 auto;
    width: 100%;
  }
`;

const Title = styled.h3`
  color: ${(props) => props.theme.textIconColor};
`;

const SearchField = styled.input`
  padding: 0.5rem;
  color: ${(props) => props.theme.accentColor};
  flex: 1;
  min-width: 250px;
  border-radius: 25px;
  border: 0;
  &:focus {
    outline: none;
  }
`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin: 0 auto;
  padding: 8px 0;
  overflow-y: scroll;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  margin: 0 auto;
  width: 80%;
  border-radius: 25px;
  padding: 0.1rem 0.5rem;
  @media (max-width: 768px) {
    width: 96%;
  }
  &:hover {
    text-decoration: underline;
    font-weight: 900;
    cursor: pointer;
  }
`;

const ActionIcons = styled.i`
  flex: 0 0 auto;
  padding: 0.5rem;
`;

const UserName = styled.h4`
  flex: 1;
  text-wrap: wrap;
  color: whitesmoke;
  margin: 0;
`;
const UserProfileDetail = styled.pre`
  color: whitesmoke;
  margin: 0 auto;
`;

const AddButton = styled.button`
  background-color: ${(props) => props.theme.lightPrimaryColor};
  color: ${(props) => props.theme.primaryTextColor};
  padding: 0.5rem 1rem;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  border-radius: 200px;
  cursor: pointer;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.14), 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    margin: 0 auto;
    font-size: 12px;
    margin-top: 5px;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.lightPrimaryColor};
  color: ${(props) => props.theme.primaryTextColor};
  padding: 0.5rem;
  border-radius: 25px;
  cursor: pointer;
  border: 0;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;
const FormCloseContainer = styled.div`
  float: right;
  margin: 10px;
`;

const Section = styled.div`
  padding: 2rem;
  width: 90%;
  margin: 0;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export default function UsersList() {
  const [users, setUsers] = useState([] as User[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined
  );
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedUserId(undefined);
  };
  const closeModal = () => {
    setSelectedUserId(undefined);
    setIsModalOpen(false);
  };

  useEffect(() => {
    store.dispatch({ type: "user/fetchUsers" });
  }, []);

  const stateUsers = useSelector((state: RootState) => state.user.userList);
  useEffect(() => {
    setUsers(stateUsers);
  }, [stateUsers]);

  const selectedUserState = useSelector(
    (state: RootState) => state.user.selectedUser
  );
  useEffect(() => {
    setSelectedUser(selectedUserState);
  }, [selectedUserState]);

  const handleDeleteUser = (id: number) => {
    store.dispatch({ type: "user/deleteUser", payload: id });
  };

  const handleEditUser = (id: number) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const openProfileDetail = (id: number) => {
    store.dispatch({ type: "user/fetchOneUser", payload: id });
  };
  const closeProfileDetail = () => {
    setSelectedUser(undefined);
  };

  return (
    <>
      <Section>
        <AppBar>
          <SearchField type="text" placeholder="search users" />
          <Button>
            <FontAwesomeIcon icon={["fas", "search"]} />
          </Button>
        </AppBar>
        <AddButton onClick={() => openModal()}>
          <FontAwesomeIcon
            style={{ marginRight: "16px" }}
            fontSize={16}
            icon={["fas", "plus"]}
          />
          Add User
        </AddButton>
      </Section>
      <Title>List of Users</Title>
      <UserListContainer>
        {users.length === 0 ? (
          <>
            <Loader count={5} />
          </>
        ) : (
          users.map((user) => (
            <>
              <UserItem
                onClick={() => openProfileDetail(user.id)}
                key={user.id}
              >
                <UserName>{user.name}</UserName>
                <ActionIcons onClick={() => handleEditUser(user.id)}>
                  <FontAwesomeIcon icon={["fas", "edit"]} />
                </ActionIcons>
                <ActionIcons onClick={() => handleDeleteUser(user.id)}>
                  <FontAwesomeIcon icon={["fas", "trash"]} />
                </ActionIcons>
              </UserItem>
              {user.id === selectedUser?.id && (
                <>
                  <UserProfileDetail>
                    <FontAwesomeIcon
                      onClick={() => closeProfileDetail()}
                      style={{ float: "right", cursor: "pointer" }}
                      icon={["fas", "times"]}
                    />
                    Profile Detail:
                    {JSON.stringify(selectedUser, null, 2)}
                  </UserProfileDetail>
                </>
              )}
            </>
          ))
        )}
        {isModalOpen && (
          <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
            <FormCloseContainer onClick={() => closeModal()}>
              <FontAwesomeIcon icon={["fas", "times"]} />
            </FormCloseContainer>
            <UserForm id={selectedUserId} handleModalClose={closeModal} />
          </ModalWindow>
        )}
      </UserListContainer>
    </>
  );
}
