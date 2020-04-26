import React, { Component } from 'react'
import Header from '../../Header'
import {connect} from 'react-redux'
import {getPneus, getMarques, addVentePneu} from '../../../actions/index'
import './index.css'
import {Container, Badge, Button, Alert, Form, Col, FormGroup, Label, Input} from 'reactstrap';

class Ventes extends Component {

    constructor(props){
        super(props);
        this.state = {
            marque : {},
            marqueValid : null,
            numero : null,
            numeroValid : null,
            quantite : null,
            quantiteValid : null,
            prixVente : null,
            prixVenteValid : null,
            listPneusFiltred : [],
            pneuSelected : null,
            quantiteMax : null,
            prixVenteMax : null,
            prixAchat : null,
            canSubmit : false
        }
        this.handleChangeMarque = this.handleChangeMarque.bind(this)
        this.handleChangeNumero = this.handleChangeNumero.bind(this)
        this.handleChangeQuantite = this.handleChangeQuantite.bind(this)
        this.handleChangePrixVente = this.handleChangePrixVente.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getPneuSelected = this.getPneuSelected.bind(this)
    }

    componentDidMount(){
        this.props.getMarques();
        this.props.getPneus();
    }

    handleChangeMarque(e){
        if(e.target.value !== ''){
            const marque = this.props.marques[e.target.value];
            this.setState({
                marque : marque,
                marqueValid : true
            },()=>{
                this.onValidStateAllowFormSubmission()
            })
            this.getFiltredPneus(marque)
        }else{
            this.setState({
                marque : {},
                listPneusFiltred : [],
                quantiteMax : null,
                prixVenteMax : null,
                prixAchat: null,
                marqueValid : null,
                quantite : null,
                prixVente : null,
                quantiteValid : null,
                prixVenteValid : null,
                numeroValid : null
            },()=>{
                this.onValidStateAllowFormSubmission()
            })
        }
    }

    handleChangeNumero(e){
        if(e.target.value !== ''){
            this.setState({
                numero : e.target.value,
                numeroValid : true
            },()=>this.onValidStateAllowFormSubmission());
            this.getPneuSelected(this.state.marque, e.target.value)
        }else{
            this.setState({
                quantiteMax : null,
                pneuSelected : null,
                prixVenteMax : null,
                prixAchat : null,
                numeroValid : null
            },()=>this.onValidStateAllowFormSubmission())
        }
    }

    handleChangeQuantite(e){
        if(e.target.value !== ''){
            console.log("max : ",this.state.quantiteMax)
            this.setState({
                quantite : e.target.value
            })
            if(e.target.value <= this.state.quantiteMax){
                this.setState({
                    quantiteValid : true
                },()=>this.onValidStateAllowFormSubmission())
            }else{
                this.setState({
                    quantiteValid : false
                },()=>this.onValidStateAllowFormSubmission())
            }
        }else{
            this.setState({
                quantite : null,
                quantiteValid : null
            },()=>this.onValidStateAllowFormSubmission())
        }
    }

    handleChangePrixVente(e){
        const value = e.target.value
        if(value !== ''){
            this.setState({
                prixVente : value,
                prixVenteValid : true
            },()=>this.onValidStateAllowFormSubmission())
        }else{
            this.setState({
                prixVente : null,
                prixVenteValid : null
            },()=>this.onValidStateAllowFormSubmission())
        }
    }

    getPneuSelected(marque , numero){
        var pneuSelected = this.props.pneus.filter((pneu)=>{
            return pneu.marque.id === marque.id && pneu.numero === numero
        })
        console.log("pneu : ",pneuSelected)
        this.setState({
            pneuSelected : pneuSelected[0],
            quantiteMax : pneuSelected[0].quantite,
            prixVenteMax : pneuSelected[0].prixVente,
            prixAchat : pneuSelected[0].prixAchat
        },(()=>console.log("hani : ",this.state.quantiteMax)))
    }

    getFiltredPneus(marque){
        var filtredPneus = this.props.pneus.filter((pneu)=>{
            return pneu.marque.id === marque.id && pneu.quantite > 0
        })
        this.setState({
            listPneusFiltred : filtredPneus
        })
    }

    onValidStateAllowFormSubmission() {
        if (
          this.state.numeroValid &&
          this.state.quantiteValid &&
          this.state.prixVenteValid &&
          this.state.marqueValid
        ) {
          this.setState({ canSubmit: true });
        } else this.setState({ canSubmit: false });
    }

    handleSubmit(){
        const formData = {
            quantiteVendu: this.state.quantite,
            pneu: this.state.pneuSelected,
            prixVenteReel: this.state.prixVente,
        };
        this.props.addVentePneu(formData)
        document.getElementById("formVentePneuId").reset();
        this.setState({
            listPneusFiltred : [],
            marqueValid : null,
            numeroValid:null,
            quantiteValid:null,
            prixVenteValid:null,
            quantiteMax:null,
            prixVenteMax:null,
            canSubmit:null
        },()=>{
            this.onValidStateAllowFormSubmission()
        })
    }

    render () {
        return (
            <div>
                <Header title="Vente Pneu" onglet="Vente / Pneu"/>
                <Container className="container-pneu-vente">
                    <div>
                        <Alert hidden={this.props.responseAddVentePneu} color="primary">
                            Afin d'ajouter une nouvelle vente du pneu vous devez remplir le formulaire ci-dessous.
                        </Alert>
                    </div>
                    <div>
                        <Alert hidden={this.props.responseAddVentePneu == null} color="success">
                            {this.props.responseAddVentePneu}
                        </Alert>
                    </div>
                    <Form className="form-pneu-vente" id="formVentePneuId">
                        <Col>
                            <FormGroup>
                            <Label for="marquePneu">Marque</Label>
                            <Input type="select" name="marque" id="marquePneu" required
                                valid = {this.state.marqueValid === true}
                                onChange={this.handleChangeMarque}
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
                            <Label for="numeroPneu">Numéro</Label>
                            <Input type="select" name="numero" id="numeroPneu" required
                                valid = {this.state.numeroValid === true}
                                onChange={this.handleChangeNumero}
                            >
                                <option></option>
                            {
                                this.state.listPneusFiltred 
                                ?
                                this.state.listPneusFiltred.map((pneuFiltred, index)=>{
                                    return <option key={pneuFiltred.id} value={pneuFiltred.numero} >{pneuFiltred.numero}</option>
                                })
                                :
                                ''
                            }
                                
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col >
                            <FormGroup>
                            <Label for="quantite">Quantité</Label>
                            <Input
                                type="number"
                                name="quantite"
                                id="quantite"
                                onChange={this.handleChangeQuantite}
                                valid = {this.state.quantiteValid === true} 
                                invalid = {this.state.quantiteValid === false}
                            />
                            {this.state.quantiteMax && <Badge color="warning">Vous avez encore {this.state.quantiteMax} exemplaires</Badge>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <Label for="prixVente">Prix de vente</Label>
                            <Input
                                valid={this.state.prixVenteValid === true}
                                onChange={this.handleChangePrixVente}
                                required
                                type="number"
                                name="prixVente"
                                id="prixVente"
                            />
                            {this.state.prixVenteMax && <Badge color="info">Le prix de vente moyen est {this.state.prixVenteMax} DHs<br></br></Badge>}
                            {(this.state.prixAchat>this.state.prixVente) && (this.state.prixVente !== null) 
                            && 
                            <Badge color="danger">Le prix d'achat moyen est {this.state.prixAchat} DHs</Badge>}
                            </FormGroup>
                        </Col>
                        <Col className="text-center">
                            <Button 
                                outline
                                disabled={!this.state.canSubmit}
                                onClick={this.handleSubmit}
                                color = "success">
                                    Ajouter
                            </Button>
                        </Col>
                    </Form>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("hani f mapState : ",state)
    return {
        pneus : state.data.pneus,
        marques : state.data.marques,
        responseAddVentePneu : state.data.responseAddVentePneu
    }
}

function mapDispatchToProps(dispatch){
    return {
        getPneus: () => dispatch(getPneus()),
        getMarques: () => dispatch(getMarques()),
        addVentePneu: (formData) => dispatch(addVentePneu(formData))
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Ventes)