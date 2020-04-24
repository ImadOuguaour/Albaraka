import React, { Component } from 'react'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Alert, 
    Row
  } from 'reactstrap';
import './index.css';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {getMarques, addPneu} from '../../actions/index'
import Header from '../Header'

class FormPneu extends Component {

    constructor(props){
        super(props);
        this.state={
            numero: "",
            quantite: null,
            prixAchat: null,
            prixVente: null,
            marque: {},
            numeroValid: null,
            quantiteValid: null,
            prixAchatValid: null,
            prixVenteValid: null,
            marqueValid: null,
            canSubmit : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getMarques();
    }

    handleChange = validInput => e => {
        const name = e.target.name;
        let value = e.target.value;
        if(value != ''){
            if(name == "marque"){
                value = this.props.marques[value];
            }
            this.setState({[validInput]: true});
            this.setState({ [name]: value },() =>
            this.onValidStateAllowFormSubmission())
        }else{
            this.setState({[validInput]: null});
            this.setState({ [name]: value },() =>
            this.onValidStateAllowFormSubmission())
        }
    }

    onValidStateAllowFormSubmission() {
        if (
          this.state.numeroValid &&
          this.state.quantiteValid &&
          this.state.prixAchatValid &&
          this.state.prixVenteValid &&
          this.state.marqueValid
        ) {
          this.setState({ canSubmit: true });
        } else this.setState({ canSubmit: false });
    }

    handleSubmit() {
        const formData = {
            numero: this.state.numero,
            quantite: this.state.quantite,
            prixAchat: this.state.prixAchat,
            prixVente: this.state.prixVente,
            marque: this.state.marque
        };
        console.log("form data : ",formData)
        this.props.addPneu(formData);
    }

    render () {
        return (
            <div>
                <Header title="Nouvelle Commande" onglet="Ajout"/>                
                <Container className="container-pneu-ajout">
                    <div hidden={this.props.responseAddPneu}>
                        <Alert color="primary">
                            Afin d'ajouter un nouveau pneu vous devez remplir le formulaire ci-dessous.
                        </Alert>
                    </div>
                    <div>
                        <Alert hidden={this.props.responseAddPneu == null} color="success">
                            {this.props.responseAddPneu}
                        </Alert>
                    </div>
                    <Form className="form-pneu">
                    <Col>
                        <FormGroup>
                        <Label for="numPneu">Numéro pneu</Label>
                        <Input
                            type="text"
                            name="numero"
                            id="numPneu"
                            placeholder="275.13.210.15"
                            onChange={this.handleChange("numeroValid")}
                            valid = {this.state.numeroValid == true}
                            invalid={this.state.numeroValid == false}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="marquePneu">Marque</Label>
                        <Input type="select" name="marque" id="marquePneu" 
                            onChange={this.handleChange("marqueValid")}
                            valid = {this.state.marqueValid == true}
                            invalid={this.state.marqueValid == false}
                        >
                            <option></option>
                        {
                            this.props.marques 
                            ?
                            this.props.marques.map((marque, index)=>{
                                return <option key={marque.id} value={index} >{marque.libelle}</option>
                            })
                            :
                            <option></option>
                        }
                            
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="quantite">Quantité</Label>
                        <Input
                            type="number"
                            name="quantite"
                            id="quantite"
                            onChange={this.handleChange("quantiteValid")}
                            valid = {this.state.quantiteValid == true}
                            invalid={this.state.numeroValid == false}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="prixAchat">Prix d'achat</Label>
                        <Input
                            type="number"
                            name="prixAchat"
                            id="prixAchat"
                            onChange={this.handleChange("prixAchatValid")}
                            valid = {this.state.prixAchatValid == true}
                            invalid={this.state.prixAchatValid == false}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="prixVente">Prix de vente</Label>
                        <Input
                            type="number"
                            name="prixVente"
                            id="prixVente"
                            onChange={this.handleChange("prixVenteValid")}
                            valid = {this.state.prixVenteValid == true}
                            invalid={this.state.prixVenteValid == false}
                        />
                        </FormGroup>
                    </Col>
                    <Row>
                        <Col className="text-right">
                            <Button 
                            outline
                                disabled={!this.state.canSubmit}
                                onClick={this.handleSubmit}
                                color = "success">
                                    Ajouter
                            </Button>
                        </Col>
                        <Col className="text-left">
                            <Button outline 
                                onClick={()=>{this.props.history.push("/pneus")}}
                                color="primary">
                                    Accueil
                            </Button>
                        </Col>
                    </Row>
                    </Form>
                </Container>
                </div>
        )
    }
}

FormPneu.protoTypes ={
    getMarques: PropTypes.func
}

function mapStateToProps(state) {
    console.log("hani f mapState : ",state)
    return {
        marques : state.data.marques,
        responseAddPneu : state.data.responseAddPneu
    }
}

function mapDispatchToProps(dispatch){
        return {
            getMarques: () => dispatch(getMarques()),
            addPneu : formData => dispatch(addPneu(formData))
        }
}

    

export default connect(mapStateToProps,mapDispatchToProps)(FormPneu)