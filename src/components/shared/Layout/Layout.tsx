import React from "react";
import { Outlet } from 'react-router-dom';
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

interface LayoutProps {
    onThemeChanged: (checked: boolean) => void;
    theme: string;
  }

export const Layout = ({ onThemeChanged, theme }: LayoutProps): JSX.Element => {
  return (
    <>
    <Header onThemeChanged={onThemeChanged} theme={theme}/>
    <Outlet />
    <Footer />
    </>
  );
};
