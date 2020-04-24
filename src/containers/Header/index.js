import React, { Component } from 'react'
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Jumbotron,
    Breadcrumb,
    BreadcrumbItem,
  } from "reactstrap";
import './index.css'
import { Link} from 'react-router-dom'
import logo from '../../images/logo.png'

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen : false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    render () {
        const navStyle = {
            color : 'white'
        }
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <Container>
                        <NavbarBrand tag={Link} to="/">                            
                            <img className="logo" src={logo}></img>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="border-0" />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar style={{ fontSize: "0.9rem" }}>
                            <NavItem className="mx-md-2">
                                <NavLink tag={Link} to="/">
                                Home
                                </NavLink>
                            </NavItem>
                            <NavItem className="mx-md-2">
                                <NavLink tag={Link} to="/pneus">
                                    Stock
                                </NavLink>
                            </NavItem>
                            <NavItem className="mx-md-2">
                                <NavLink tag={Link} to="/formPneu">
                                    Ajout
                                </NavLink>
                            </NavItem>
                            <NavItem className="mx-md-2">
                                <NavLink tag={Link} to="/ventes">
                                    Vente
                                </NavLink>
                            </NavItem>
                            <NavItem className="mx-md-2">
                                <Button outline color="warning" tag={Link} to="/">
                                    Pneumatique AL-BARAKA
                                </Button>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                <Jumbotron fluid className="text-center bg-dark">
                    <Container className="text-white">
                        <h1 className="display-3 font-weight-bold py-4">{this.props.title}</h1>
                        <h4 className="font-weight-light">Pneumatique AL-BARAKA</h4>
                        <div className="py-3">
                            <Button tag={Link} to="/formPneu" className="mx-2" color="warning">
                                Commande
                            </Button>
                            <Button tag={Link} to="/ventes" className="mx-2" color="warning" outline>
                                Vente du jour
                            </Button>
                        </div>
                    </Container>
            </Jumbotron>
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem ><a href="/">Home</a></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.onglet}</BreadcrumbItem>
                </Breadcrumb>
            </Container>
          </div>
    );
    }
}

export default Header