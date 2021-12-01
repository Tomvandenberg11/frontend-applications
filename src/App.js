import React from "react"
import styled from "styled-components"
import Barchart from "../src/components/Barchart"
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

const App = () => {
  return (
    <Container>
      <Title>Barchart</Title>
      <Barchart width={600} height={400} data={topPopulation} />
    </Container>
  )
}

export default App
