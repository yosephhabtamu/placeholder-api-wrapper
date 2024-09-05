import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Loader from "../contentLoader";
import store, { RootState } from "@/lib/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Album } from "@/lib/features/albums/albumTypes";
import { ModalWindow } from "@/app/utils/modal";
import { useCurrentTabProvider } from "@/app/utils/tabContext";
import { Photo } from "@/lib/features/photos/photosTypes";
import Image from "next/image";
import PhotoForm from "./addPhoto";

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

const PhotoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin: 0 auto;
  padding: 8px 0;
  overflow-y: scroll;
`;

const PhotoItem = styled.div`
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

const PhotoName = styled.h4`
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
  float:right;
  margin:10px;
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
export default function PhotoList() {
  const [photos, setPhotos] = useState([] as Photo[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>(undefined);


  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false)
  };

  useEffect(() => {
    console.log("selectedAlbum", selectedAlbum?.id);
    store.dispatch({ type: "photo/fetchPhoto", payload: selectedAlbum?.id??1 });
  }, []);

  const statePhotos = useSelector((state: RootState) => state.photo.photoList);
  useEffect(() => {
    setPhotos(statePhotos);
  }, [statePhotos]);

  const handleDeletePhoto = (id: number) => {
    store.dispatch({ type: "photo/deletePhoto", payload: id });
  };

  return (
    <>
      <Section>
        <AppBar>
          <SearchField type="text" placeholder="search photos by Name" />
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
          Add Photo
        </AddButton>
      </Section>
      <Title>Popular Photos for {selectedAlbum?.title??""} album </Title>
      <PhotoListContainer>
        {photos.length === 0 ? (
          <>
            <Loader count={5} />
          </>
        ) : (
          photos.map((photo) => (
            <PhotoItem key={photo.id}>
              <Image src={photo.url} alt={photo.title} width={300} height={300}/>
              <PhotoName>{photo.title}</PhotoName>
              <ActionIcons onClick={() => handleDeletePhoto(photo.id)}>
                <FontAwesomeIcon icon={["fas", "trash"]} />
              </ActionIcons>
            </PhotoItem>
          ))
        )}
         {isModalOpen &&( <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
                <FormCloseContainer onClick={()=>closeModal()}>
                  <FontAwesomeIcon icon={["fas", "remove"]} />
                </FormCloseContainer>
                <PhotoForm id={selectedAlbum?.id} handleModalClose={closeModal} />
              </ModalWindow>)}
      </PhotoListContainer>
    </>
  );
}
