import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

const NavbarElement = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/CyclicIndex">Show me the graph!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/CyclicIndex">순환변동치</Nav.Link>
            <Nav.Link href="/InterestRate">금리</Nav.Link>
            <Nav.Link href="/ExchangeRate">환율</Nav.Link>
            <Nav.Link href="/Bond">채권수익율</Nav.Link>
            <Nav.Link href="/GDP">GDP</Nav.Link>
            <Nav.Link href="/DayAvgExport">일평균수출금액</Nav.Link>
            <Nav.Link href="/UnemploymentRate">실업률</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarElement