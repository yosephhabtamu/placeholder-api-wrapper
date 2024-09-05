"use client";
import Image from "next/image";
import styles from "./page.module.css";
import store from "@/lib/store";
import { Provider } from "react-redux";
import LandingPage from "./components/landingPage";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { CurrentTabProvider } from "./utils/tabContext";

library.add(fas, fab);

const Main = styled.main({
  margin:"0px",
  height:"100%"
})

export default function Home() {
  return (
    <Provider store={store}>
      <Main>
        <CurrentTabProvider>
        <LandingPage />
        </CurrentTabProvider>
      </Main>
    </Provider>
  );
}
