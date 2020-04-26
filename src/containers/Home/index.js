import React from "react";
import Header from '../Header';
import {Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Spinner} from 'reactstrap';
import CanvasJSReact from '../../canvasjs.react';
import {connect} from 'react-redux';
import {getTopCinqPneus, getVentePneu} from '../../actions/index'
import classnames from 'classnames';
import MaterialTable from 'material-table'
import './index.css'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Home extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      activeTab : "1"
    }

    this.toggle = this.toggle.bind(this)
  }

  componentDidMount(){
    this.props.getVentePneu();
  }

  toggle(tab){
    if(this.state.activeTab !== tab) {
      this.setState({activeTab : tab},()=>{
        if(this.state.activeTab === "2")
        this.props.getTopCinqPneus();
        else if(this.state.activeTab === "1")
        this.props.getVentePneu();
      })
    }
      
  }

  render(){
    const options = {
      title: {
        text: "TOP 5 MARQUES LES PLUS VENDUES"
      },
      data: [
      {
        type: "column",
        dataPoints: this.props.topCinqPneusVendu
      }
      ]
    }

    const columns = [
    {
        title: 'Numéro',
        field: 'numero'
    }, {
        title: 'Marque',
        field: 'marque.libelle'
    }, {
        title: 'Quantité',
        field: 'quantite',
    }, {
        title: 'Prix de vente',
        field: 'prixVente',
    }, {
        title: 'Gain',
        field: 'benifice',
        cellsStyle:{color:'black', fontSize:'15px', fontWeight:'bold'},
    }]
    
    const options2 = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title:{
        text: "QUANTITE MARQUE STOCK"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}%",		
        startAngle: -90,
        dataPoints: [
          { "y": 20, "label": "GoodYear" },
          { y: 24, label: "Michelin" },
          { y: 20, label: "Perrili" },
          { y: 14, label: "Dunlop" },
          { y: 12, label: "Bridgeston" }
        ]
      }]
    }

    return (
      <div>
        <Header title="Application de gestion" onglet="Statistiques"/>
          <Container >
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Vente Aujoud'hui
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Statistiques globales
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1" className="tab-pane">
              {
                this.props.historiqueVentePneuToday
                ?
                <MaterialTable
                    title="Pneus vendus aujourd'hui"
                    columns={columns}
                    data={this.props.historiqueVentePneuToday}
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
            </TabPane>
            <TabPane tabId="2" className="tab-pane">
                <Row>
                  <Col>
                    <CanvasJSChart options = {options}
                        /* onRef = {ref => this.chart = ref} */
                    />  
                  </Col>
                  <Col>
                    <CanvasJSChart options = {options2} 
                      /* onRef={ref => this.chart = ref} */
                    />
                  </Col>
                </Row>
            </TabPane>
          </TabContent>
            
          </Container>
      </div>
    );

  }
}

function mapStateToProps(state) {
  console.log("hani f mapState : ",state)
  return {
      topCinqPneusVendu : state.data.topCinqPneusVendu,
      historiqueVentePneuToday : state.data.historiqueVentePneuToday
  }
}

function mapDispatchToProps(dispatch){
  return {
    getTopCinqPneus: () => dispatch(getTopCinqPneus()),
    getVentePneu: () => dispatch(getVentePneu())
      
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);