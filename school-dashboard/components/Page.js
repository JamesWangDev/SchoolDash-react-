import styled, { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from './navagation/Header';
import ThemeSwitcher from './styles/ThemeSwitcher';

const GlobalLightStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    --red: #760D08;
    --redTrans: #760D0880;
    --black: #393939;
    --blue: #38B6FF;
    --blueTrans: #38B6FF80;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGray);
    --offWhite: #ededed;
    --maxWidth: 90%;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --backgroundColor: rgb(255, 255, 255);
    --textColor: rgb(10, 10, 10);
    --tableAccentColor: rgba(220,220,220,0.9);
    --navTextColor: rgb(255,255, 255);
    box-sizing: border-box;
    font-size: 10px;
    /* background-color: rgba(0,0,0,0.9); */
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a {
    text-decoration: none;
    color: var(--white);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
  }
  @media print {
  header, .hidePrint {
    display: none !important;
    @page { margin: 0; }
  }
  .gridCard {
    page-break-inside: avoid !important;
    background: red;
    width: 80%;
  }
  .hidePrint{
    display: none !important;
    @page {margin: 0;}
  }
  }

`;

const GlobalDarkStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    --red: #760D08;
    --redTrans: #760D0880;
    --black: #393939;
    --blue: #38B6FF;
    --blueTrans: #38B6FF80;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGray);
    --offWhite: #ededed;
    --maxWidth: 90%;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --backgroundColor: rgba(0,0,0,0.9);
    --textColor: rgb(220,220,220);
    --tableAccentColor: rgba(60,60,60,0.9);
    --navTextColor: rgb(230,230, 230);
    box-sizing: border-box;
    font-size: 10px;
    color: var(--textColor);
    background-color: var(--backgroundColor);
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a {
    text-decoration: none;
    color: var(--white);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
  }
  @media print {
  header, .hidePrint {
    display: none !important;
    @page { margin: 0; }
  }
  .gridCard {
    page-break-inside: avoid !important;
    background: red;
    width: 80%;
  }
  .hidePrint{
    display: none !important;
    @page {margin: 0;}
  }
  }

`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export default function Page({ children }) {
  // get theme from local storage
  const [theme, setTheme] = useState('light');
  // set theme to local storage
  const setLocalTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  // get theme from local storage if it exists and on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localTheme = localStorage.getItem('theme');
      if (localTheme) {
        setTheme(localTheme);
      }
    }
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NCUJHS Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {theme === 'light' && <GlobalLightStyles />}
      {theme === 'dark' && <GlobalDarkStyles />}
      <Header />
      <ThemeSwitcher theme={theme} setTheme={setLocalTheme} />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
