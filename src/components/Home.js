import styled from "styled-components"

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`

const Title = styled.h2`
  text-align: center;
`

const Text = styled.p`
  text-align: center;
`

const Home = () => {
  return (
    <Wrapper>
      <Title>Welkom</Title>
      <Text>
        Welkom bij mijn Frontend Applications project. Klik op Barchart in het
        menu om de datavisualisatie te zien!
      </Text>

      <img
        alt="gif"
        src="https://media.giphy.com/media/xT9C25UNTwfZuk85WP/giphy-downsized-large.gif"
        style={{
          display: "block",
          marginTop: 50,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </Wrapper>
  )
}

export default Home
