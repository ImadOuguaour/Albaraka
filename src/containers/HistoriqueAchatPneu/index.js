import React, { Component } from 'react'
import Header from '../Header'
import MaterialTable from 'material-table'
import {getHistoriquePneu} from '../../actions/index'
import {connect} from 'react-redux';
import {Spinner, Container} from 'reactstrap';

class HistoriqueAchatPneu extends Component {

    componentDidMount(){
        this.props.getHistoriquePneu(); 
        console.log("hani : ",this.props.historiquePneu)
    }

    render() {
        const columns = [
            {
                title: 'Date d\'achat',
                field: 'dateAchat'
            }, {
                title: 'Marque',
                field: 'marque.libelle'
            }, {
                title: 'Numéro',
                field: 'numero',
            }, {
                title: 'Quantité',
                field: 'quantite',
            }, {
                title: 'Prix d\'achat',
                field: 'prixAchat',
            }, {
                title: 'Prix de vente',
                field: 'prixVente',
            }]
        return (
            <div>
                <Header title="Historiques des pneus" onglet="Historique / Achat / Pneus"/>
                <Container>
                {
                    this.props.historiquePneu
                    ?
                    <MaterialTable
                        title="Pneus disponibles"
                        columns={columns}
                        data={this.props.historiquePneu}
                        options={{
                            headerStyle:{color:'black', fontSize:'15px', fontWeight:'bold'},
                            paginationType: 'stepped', 
                        }}
                    />
                    :
                    <div  className="text-center">
                        <Spinner style={{ width: '10rem', height: '10rem' }} color="primary" />
                    </div>
                }
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("hani f mapState : ",state)
    return {
        historiquePneu : state.data.historiquePneu
    }
}

function mapDispatchToProps(dispatch){
    return {
        getHistoriquePneu: () => dispatch(getHistoriquePneu())
    }
}

/*
const mapDispatchToProps = dispatch =>
    bindActionCreators({getPneus}, dispatch);
*/


export default connect(mapStateToProps,mapDispatchToProps)(HistoriqueAchatPneu);
