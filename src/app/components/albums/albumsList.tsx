import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Loader from "../contentLoader";
import store, { RootState } from "@/lib/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Album } from "@/lib/features/albums/albumTypes";
import { ModalWindow } from "@/app/utils/modal";
import AlbumForm from "./albumForm";
import { useCurrentTabProvider } from "@/app/utils/tabContext";
import PhotoList from "../photos/photosList";

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

const AlbumListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin: 0 auto;
  padding: 8px 0;
  overflow-y: scroll;
`;

const AlbumItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  margin: 0 auto;
  width: 80%;
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

const AlbumTitle = styled.h4`
  flex: 1;
  text-wrap: wrap;
  color: whitesmoke;
  margin: 0;
  padding: 0.3rem;
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
export default function AlbumsList() {
  const [albums, setAlbums] = useState([] as Album[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | undefined>(
    undefined
  );
  const { currentTabState, setCurrentTabState } = useCurrentTabProvider();
  const openPictures = (id: number) => {
    store.dispatch({ type: "photo/fetchPhoto", payload: id });
    setCurrentTabState("Photo");
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedAlbumId(undefined);
  };
  const closeModal = () => {
    setSelectedAlbumId(undefined);
    setIsModalOpen(false);
  };

  useEffect(() => {
    store.dispatch({ type: "album/fetchAlbum" });
  }, []);

  const stateAlbums = useSelector((state: RootState) => state.album.albumsList);
  useEffect(() => {
    setAlbums(stateAlbums);
  }, [stateAlbums]);

  const handleDeleteAlbum = (id: number) => {
    store.dispatch({ type: "album/deleteAlbum", payload: id });
  };

  const handleEditAlbum = (id: number) => {
    setSelectedAlbumId(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <Section>
        <AppBar>
          <SearchField type="text" placeholder="search albums" />
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
          Add Album
        </AddButton>
      </Section>
      <Title>Popular Albums</Title>
      <AlbumListContainer>
        {albums.length === 0 ? (
          <>
            <Loader count={5} />
          </>
        ) : (
          albums.map((album) => (
            <AlbumItem onClick={() => openPictures(album.id)} key={album.id}>
              <AlbumTitle>{album.title}</AlbumTitle>
              <ActionIcons onClick={() => handleEditAlbum(album.id)}>
                <FontAwesomeIcon icon={["fas", "edit"]} />
              </ActionIcons>
              <ActionIcons onClick={() => handleDeleteAlbum(album.id)}>
                <FontAwesomeIcon icon={["fas", "trash"]} />
              </ActionIcons>
            </AlbumItem>
          ))
        )}
        {isModalOpen && (
          <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
            <FormCloseContainer onClick={() => closeModal()}>
              <FontAwesomeIcon icon={["fas", "remove"]} />
            </FormCloseContainer>
            <AlbumForm id={selectedAlbumId} handleModalClose={closeModal} />
          </ModalWindow>
        )}
      </AlbumListContainer>
      {currentTabState === "Photo" ? (
        <>
          <PhotoList />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
