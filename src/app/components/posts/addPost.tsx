"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../landingPage";
import store from "@/lib/store";
import Image from "next/image";

const Wrapper = styled.div`
  width: 50%;
  margin: 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPrimaryColor};
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.14), 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  height: 100%;
  width: 50%;
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

const FormCloseContainer = styled.div`
  align-self: flex-end;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textIconColor};
  padding: 0.5rem;
  border-radius: 25px;
  border: 0;
  width: 90%;
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

const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.accentColor};
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  text-align: center;
  transition: background-color 0.2s, border-color 0.2s;
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

export default function AddMusicForm() {
  const [title, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append("title", title);
    payload.append("artist", artist);
    payload.append("album", album);
    payload.append("genre", genre);
    payload.append("file", file as Blob);
    store.dispatch({
      type: "music/addMusic",
      payload,
    });
  };
  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <FormContainer>
          <FormCloseContainer>
            <FontAwesomeIcon icon={["fas", "times"]} />
          </FormCloseContainer>
          <Title>Add Music to playList</Title>
          <InputField
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Music title"
          />
          <InputField
            type="text"
            onChange={(event) => setArtist(event.target.value)}
            placeholder="Singer's name"
          />
          <InputField
            type="text"
            onChange={(event) => setGenre(event.target.value)}
            placeholder="Song's genre"
          />
          <InputField
            type="text"
            onChange={(event) => setAlbum(event.target.value)}
            placeholder="Album name"
          />
          <Container>
            <UploadLabel>
              <Image
                src={"/note dark logo.png"}
                alt={"Musix match"}
                width={50}
                height={50}
              />
              Add music file
              <FileInput onChange={handleChange} />
            </UploadLabel>
            {file?.name && (
              <FileName>
                {file.name}
                <FontAwesomeIcon
                  onClick={(event) => handleFileRemove()}
                  icon={["fas", "plus"]}
                />
              </FileName>
            )}
          </Container>
          <Button onClick={(event) => handleFormSubmit(event)}>
            <FontAwesomeIcon icon={["fas", "plus"]} />
            Add Music
          </Button>
        </FormContainer>
      </Wrapper>
    </ThemeProvider>
  );
}
