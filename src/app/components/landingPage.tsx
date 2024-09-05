"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Loader from "./contentLoader";
import AddMusicForm from "./todos/addTodo";
import { CurrentTabProvider, useCurrentTabProvider } from "../utils/tabContext";
import AlbumsList from "./albums/albumsList";
import UsersList from "./users/usersList";

export const theme = {
  darkPrimaryColor: "#5D4037",
  lightPrimaryColor: "#D7CCC8",
  primaryColor: "#795548",
  textIconColor: "#FFFFFF",
  accentColor: "#9E9E9E",
  primaryTextColor: "#212121",
  secondaryTextColor: "#757575",
  dividerColor: "#BDBDBD",
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPrimaryColor};
  padding: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const SongList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 1rem;
  background-color: ${(props) => props.theme.darkPrimaryColor};
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.14), 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  height: 94%;
  width: 70%;
  margin: 0;

  @media (max-width: 600px) {
    height: 100vh;
    width: 100vw;
    border-radius: 0; /* Optional: Remove border-radius if needed */
    padding: 0.4rem; /* Optional: Adjust padding if needed */
  }
`;

const AppName = styled.h4`
  color: ${(props) => props.theme.lightPrimaryColor};
`;

const AppBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap:wrap;
  gap: 0.5rem;
`;

const NavBar = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.darkPrimaryColor};
  color: ${(props) => props.theme.lightPrimaryColor};
  padding: 1rem;
  margin: 0;
`;
const NavBarItem = styled.button`
  color: ${(props) => props.theme.lightPrimaryColor};
  border: 0;
  background-color: ${(props) => props.theme.darkPrimaryColor};
  cursor: pointer;
  &:hover {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

export default function LandingPage() {
  const { currentTabState, setCurrentTabState} = useCurrentTabProvider();

  const changeCurrentTab = (tab: "Todo" | "Album") => {
    setCurrentTabState(tab);
  };

  return (
    <ThemeProvider theme={theme}>
      
        <Wrapper>
          <SongList>
            <AppBar>
              <Image
                src={"/note dark logo.png"}
                alt={"JSONPlaceholder logo"}
                width={40}
                height={40}
              />
              <AppName>{currentTabState.toUpperCase()} CRUD </AppName>
              <NavBar>
                <NavBarItem onClick={(event) => setCurrentTabState("Todo")}>
                  Todo
                </NavBarItem>
                <NavBarItem onClick={(event) => setCurrentTabState("Post")}>
                  Posts
                </NavBarItem>
                <NavBarItem onClick={(event) => setCurrentTabState("User")}>
                  Users
                </NavBarItem>
                <NavBarItem onClick={(event) => setCurrentTabState("Photo")}>
                  Photos
                </NavBarItem>
                <NavBarItem onClick={(event) => changeCurrentTab("Album")}>
                  Albums
                </NavBarItem>
              </NavBar>
            </AppBar>
            {
              {
                "Todo": <Loader />,
                "Post": <Loader />,
                "User": <UsersList />,
                "Photo": <Loader />,
                "Album": <AlbumsList />,
              }[currentTabState]
            }
          </SongList>
        </Wrapper>
    </ThemeProvider>
  );
}
