import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import styled from "styled-components"
import Barchart from "./components/Barchart"
import Home from "./components/Home"
import { topPopulation } from "./data"

const Container = styled.div`
  margin-top: 20px;
  width: 60%;
  display: bloxk;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 46px;
  text-align: center;
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  align-items: center;
  margin: -20px auto 0;
`

const LinkText = styled.p`
  text-decoration: none;
  font-size: 24px;
  color: black;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.1);
  }
`

const App = () => {
  return (
    <Container>
      <Title>Frontend Applications</Title>

      <NavWrapper>
        <Link style={{ textDecoration: "none" }} to="/">
          <LinkText>Home</LinkText>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/barchart">
          <LinkText>Barchart</LinkText>
        </Link>
      </NavWrapper>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/barchart"
          element={<Barchart width={600} height={400} data={topPopulation} />}
        />
      </Routes>
    </Container>
  )
}

export default App
