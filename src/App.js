import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import styled from "styled-components"
import Barchart from "./components/Barchart"
import Home from "./components/Home"
import { topPopulation } from "./data"

const Container = styled.div`
  margin-top: 50px;
  width: 90%;
  display: block;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 46px;
  text-align: center;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  margin: 0 auto;
`

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LinkText = styled.p`
  text-decoration: none;
  font-size: 24px;
  color: black;
  transition: all 0.5s;
  margin-left: 30px;

  &:hover {
    transform: scale(1.1);
  }
`

const App = () => {
  return (
    <Container>
      <Header>
        <Title>Frontend Applications</Title>
        <NavWrapper>
          <Link style={{ textDecoration: "none" }} to="/">
            <LinkText>Home</LinkText>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/barchart">
            <LinkText>Barchart</LinkText>
          </Link>
        </NavWrapper>
      </Header>

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
