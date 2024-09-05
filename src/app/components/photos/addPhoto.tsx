"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../landingPage";
import store, { RootState } from "@/lib/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Album } from "@/lib/features/albums/albumTypes";
import { Photo } from "@/lib/features/photos/photosTypes";

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


export default function PhotoForm({
  id,
  handleModalClose,
}: {
  id?: number;
  handleModalClose: () => void;
}) {
  const [photo, setPhoto] = useState<Partial<Photo>| null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState({} as Album | undefined);
  // TODO: implement Edit photo


  useEffect(() => {
    return () => {
      setPhoto(null);
    };
  }, []);

  const stateSelectedAlbum = useSelector(
    (state: RootState) => state.album.selectedAlbum
  );
  useEffect(() => {
    setSelectedAlbum(stateSelectedAlbum);
    return () => {
      setSelectedAlbum(undefined);
    };
  }, [stateSelectedAlbum]);

  const handleAddPhoto = (event: any) => {
    event.preventDefault();
    if (photo !== null) {
      store.dispatch({
        type: "Photo/addPhoto",
        album: {...photo, albumId: selectedAlbum?.id},
      });
      handleModalClose();
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <Title>Add Album</Title>
        <InputField
          type="text"
          value={photo?.title}
          onChange={(event) => setPhoto(
            {...photo,
              title: event.target.value})}
          placeholder="Photo name"
        />
        <InputField
          type="text"
          value={photo?.url}
          onChange={(event) => setPhoto(
            {...photo, url: event.target.value})}
          placeholder="Photo Url"
        /> 
          <Button onClick={(event) => handleAddPhoto(event)}>
            <FontAwesomeIcon icon={["fas", "plus"]} />
            Add Photo
          </Button>
      </FormContainer>
    </ThemeProvider>
  );
}
