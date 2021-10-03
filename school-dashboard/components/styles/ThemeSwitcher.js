import React from 'react';
import styled from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcherStyle = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;

  .theme-switcher-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .theme-switcher-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .theme-switcher-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      margin: 5px;
      color: yellow;
      border-radius: 50%;
      background: darkgray;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <ThemeSwitcherStyle>
      <div className="theme-switcher-list">
        {theme === 'dark' && (
          <div className="theme-switcher-item">
            <div
              className="theme-switcher-item-content"
              onClick={() => {
                console.log('click');
                setTheme('light');
              }}
            >
              <FaSun />
            </div>
          </div>
        )}
        {theme === 'light' && (
          <div className="theme-switcher-item">
            <div
              className="theme-switcher-item-content"
              onClick={() => {
                console.log('click');
                setTheme('dark');
              }}
            >
              <FaMoon />
            </div>
          </div>
        )}
      </div>
    </ThemeSwitcherStyle>
  );
}
