"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../landingPage";
import store, { RootState } from "@/lib/store";
import Image from "next/image";
import { Album } from "@/lib/features/albums/albumTypes";
import { useSelector } from "react-redux";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 80%;
  background-color: ${(props) => props.theme.lightPrimaryColor};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.lightPrimaryColor};
  }
`;

const FileInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const FileName = styled.span`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.primaryTextColor};
  display: flex;
  gap: 0.5rem;
`;

export default function AlbumForm({
  id,
  handleModalClose,
}: {
  id?: number;
  handleModalClose: () => void;
}) {
  const [album, setAlbum] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState({} as Album | undefined);

  useEffect(() => {
    if (id) store.dispatch({ type: "album/fetchOneAlbum", payload: id });
    else{
      console.log("inside else");
       setSelectedAlbum(undefined)};
  }, []);

  useEffect(() => {
   return () => {
     setSelectedAlbum(undefined);
     setAlbum("");

   };
  }, []);

  const stateSelectedAlbum = useSelector(
    (state: RootState) => state.album.selectedAlbum
  );
  useEffect(() => {
    setSelectedAlbum(stateSelectedAlbum);
    setAlbum(selectedAlbum?.title ?? "");
    return ()=>{
      setSelectedAlbum(undefined);
    }
  }, [stateSelectedAlbum]);

  const handleAddAlbum = (event: any) => {
    event.preventDefault();
    if (album !== "") {
      store.dispatch({
        type: "album/addAlbum",
        album,
      });
      handleModalClose();
    }
  };

  const handleEditAlbum = (event: any) => {
    event.preventDefault();
    if (album !== "") {
      store.dispatch({
        type: "album/updateAlbum",
        payload: {
          id,
          album
        },
      });
      handleModalClose();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        {id ? <Title>Edit Album</Title> : <Title>Add Album</Title>}
        <InputField
          type="text"
          value={album}
          onChange={(event) => setAlbum(event.target.value)}
          placeholder="Album name"
        />
        {id ? (
          <Button onClick={(event) => handleEditAlbum(event)}>
            <FontAwesomeIcon icon={["fas", "pen-to-square"]} />
            Update Album
          </Button>
        ) : (
          <Button onClick={(event) => handleAddAlbum(event)}>
            <FontAwesomeIcon icon={["fas", "plus"]} />
            Add Album
          </Button>
        )}
      </FormContainer>
    </ThemeProvider>
  );
}
