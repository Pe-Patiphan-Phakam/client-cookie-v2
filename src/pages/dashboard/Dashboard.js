import React from "react";
import { Row, Col, Progress, Table, Label, Input, Badge } from "reactstrap";
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

import Widget from "../../components/Widget";

// import Calendar from "./components/calendar/Calendar";
import Map from "./am4chartMap/am4chartMap";
// import Rickshaw from "./components/rickshaw/Rickshaw";
// import Pie from "./am4chartMap/am4pieMap"

// import AnimateNumber from "./am4chartMap/node_modules/react-animated-number";

import s from "./Dashboard.module.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SERVER_PATH: localStorage.getItem('path'),
      graph: null,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get(""+this.state.SERVER_PATH+"/api/data")
    .then((response) => {
      var rowVal = [];
      for (var i=0; i<response.data.length; i++) {
        var absolute1 = Math.abs(response.data[i].data[2].latitude);
        var degrees1 = Math.floor(absolute1);
        var minutesNotTruncated1 = (absolute1 - degrees1) * 60;
        var minutes1 = Math.floor(minutesNotTruncated1);
        var seconds1 = ((minutesNotTruncated1 - minutes1) * 60).toFixed(2);
        var absolute2 = Math.abs(response.data[i].data[3].longitude);
        var degrees2 = Math.floor(absolute2);
        var minutesNotTruncated2 = (absolute2 - degrees2) * 60;
        var minutes2 = Math.floor(minutesNotTruncated2);
        var seconds2 = ((minutesNotTruncated2 - minutes2) * 60).toFixed(2);

        var latitudeCardinal = degrees1 >= 0 ? "N" : "S";
        var longitudeCardinal = degrees2 >= 0 ? "E" : "W";
        var latlng = degrees1+"°"+minutes1+"'"+seconds1+"''"+latitudeCardinal+"+"+degrees2+"°"+minutes2+"'"+seconds2+"''"+longitudeCardinal;
        var cookieId = response.data[i].cookieId
        var timezone = new Date(response.data[i].createdAt).toLocaleString();
        var chkVal = response.data[i].data[2].latitude
        rowVal.push({cookieId,timezone,latlng,chkVal})
      }
      this.setState({
        dataTable: {
          columns: [
            {
              label: 'date (MM/DD/YYYY)',
              field: 'dt',
              width: 150,
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'cookie-id',
              },
            },
            {
              label: 'cookie-id',
              field: 'id',
              width: 270,
            },
            {
              label: <div className="text-center">address</div>,
              field: 'address',
              width: 500,
            },
          ],
          rows: [...rowVal.map((item, index) => (
            {
              dt: item.timezone,
              id: item.cookieId,
              address: <div className="text-center">{item.chkVal
                ?<a href={"https://www.google.com/maps/place/"+item.latlng} target="_blank">
                {/*<span className="glyphicon glyphicon-map-marker" />*/}
                <Badge color="primary"><i class="fas fa-map-marker-alt"></i> allow</Badge>
                </a>
                :<Badge color="danger">disallow</Badge>}
              </div>,
            }
          ))]
        }
      })
    })
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Map &nbsp;
          {/* <small>
            <small>The Lucky One</small>
          </small> */}
        </h1>

        <Row>
          <Col lg={12}>
            <Widget className="bg-transparent">
              <Map />
            </Widget>
          </Col>
        </Row>

        <Row>

          <Col lg={12}>
          <Widget
              title={
                <h5>
                  Table <span className="fw-semi-bold">Data</span>
                </h5>
              }
              bodyClass={s.mainTableWidget}
            >
              <MDBDataTable
                striped
                small
                data={this.state.dataTable}
              />
              </Widget>
          </Col>
          
          </Row>
          {/*<Col lg={4}>
            <Widget
              className="bg-transparent"
              title={
                <h5>
                  {" "}
                  Map
                  <span className="fw-semi-bold">&nbsp;Statistics</span>
                </h5>
              }
            >
              <p>
                Status: <strong>Live</strong>
              </p>
              <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-map-marker" />
                </span>{" "}
                &nbsp; Top : {"Bangkok"}
              </p>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Bangkok</h6>
                  <p className="description deemphasize mb-xs text-white">
                    : 1
                  </p>
                  <Progress
                    color="primary"
                    value="50"
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Nonthaburi</h6>
                  <p className="description deemphasize mb-xs text-white">
                    : 2
                  </p>
                  <Progress
                    color="success"
                    value="30"
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Pathum Thani</h6>
                  <p className="description deemphasize mb-xs text-white">
                    : 3
                  </p>
                  <Progress
                    color="danger"
                    value="20"
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                
              </div>
              <p>
                Tracking: <strong>Active</strong>
              </p>
            </Widget>
          </Col>
          
          <Col lg={8}>
            <Widget className="bg-transparent">
              <Pie />
            </Widget>
            </Col> */}
        {/* <Row>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> USERBASE GROWTH </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Overall Growth</h6>
                  <p className="value">76.38%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Montly</h6>
                  <p className="value">10.38%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">3.38%</p>
                </div>
              </div>
              <Progress
                color="success"
                value="60"
                className="bg-custom-dark progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-up" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;17% higher</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> TRAFFIC VALUES </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Overall Values</h6>
                  <p className="value">17 567 318</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Montly</h6>
                  <p className="value">55 120</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">9 695</p>
                </div>
              </div>
              <Progress
                color="danger"
                value="60"
                className="bg-custom-dark progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-down" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;8% lower</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> RANDOM VALUES </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name fs-sm">Overcome T.</h6>
                  <p className="value">104.85%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name fs-sm">Takeoff Angle</h6>
                  <p className="value">14.29&deg;</p>
                </div>
                <div className="stat-item">
                  <h6 className="name fs-sm">World Pop.</h6>
                  <p className="value">7,211M</p>
                </div>
              </div>
              <Progress
                color="bg-primary"
                value="60"
                className="bg-custom-dark progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-plus" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;8 734 higher</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
        </Row> */}

        {/* <Row>
          <Col lg={4} xs={12}>
            <Widget
              title={
                <h6>
                  <span className="badge badge-success mr-2">New</span> Messages
                </h6>
              }
              refresh
              close
            >
              <div className="widget-body undo_padding">
                <div className="list-group list-group-lg">
                  <button className="list-group-item text-left">
                    <span className="thumb-sm float-left mr">
                      <img
                        className="rounded-circle"
                        src={peopleA2}
                        alt="..."
                      />
                      <i className="status status-bottom bg-success" />
                    </span>
                    <div>
                      <h6 className="m-0">Chris Gray</h6>
                      <p className="help-block text-ellipsis m-0">
                        Hey! What&apos;s up? So many times since we
                      </p>
                    </div>
                  </button>
                  <button className="list-group-item text-left">
                    <span className="thumb-sm float-left mr">
                      <img
                        className="rounded-circle"
                        src={peopleA4}
                        alt="..."
                      />
                      <i className="status status-bottom bg-success" />
                    </span>
                    <div>
                      <h6 className="m-0">Jamey Brownlow</h6>
                      <p className="help-block text-ellipsis m-0">
                        Good news coming tonight. Seems they agreed to proceed
                      </p>
                    </div>
                  </button>
                  <button className="list-group-item text-left">
                    <span className="thumb-sm float-left mr">
                      <img
                        className="rounded-circle"
                        src={peopleA1}
                        alt="..."
                      />
                      <i className="status status-bottom bg-default" />
                    </span>
                    <div>
                      <h6 className="m-0">Livia Walsh</h6>
                      <p className="help-block text-ellipsis m-0">
                        Check my latest email plz!
                      </p>
                    </div>
                  </button>
                  <button className="list-group-item text-left">
                    <span className="thumb-sm float-left mr">
                      <img
                        className="rounded-circle"
                        src={peopleA5}
                        alt="..."
                      />
                      <i className="status status-bottom bg-danger" />
                    </span>
                    <div>
                      <h6 className="m-0">Jaron Fitzroy</h6>
                      <p className="help-block text-ellipsis m-0">
                        What about summer break?
                      </p>
                    </div>
                  </button>
                </div>
              </div>
              <footer className="bg-widget-transparent mt">
                <input
                  type="search"
                  className="form-control form-control-sm bg-custom-dark border-0"
                  placeholder="Search"
                />
              </footer>
            </Widget>
          </Col>

          <Col lg={4} xs={12}>
            <Widget
              title={
                <h6>
                  {" "}
                  Market <span className="fw-semi-bold">Stats</span>
                </h6>
              }
              close
            >
              <div className="widget-body">
                <h3>$720 Earned</h3>
                <p className="fs-mini text-muted mb mt-sm">
                  Target <span className="fw-semi-bold">$820</span> day earnings
                  is <span className="fw-semi-bold">96%</span> reached.
                </p>
              </div>
              <div className={`widget-table-overflow ${s.table}`}>
                <Table striped size="sm">
                  <thead className="no-bd">
                    <tr>
                      <th>
                        <div className="checkbox abc-checkbox">
                          <Input
                            className="mt-0"
                            id="checkbox210"
                            type="checkbox"
                            onClick={() => this.checkTable(0)}
                            checked={this.state.checkedArr[0]}
                            readOnly
                          />{" "}
                          <Label for="checkbox210" />
                        </div>
                      </th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="checkbox abc-checkbox">
                          <Input
                            className="mt-0"
                            id="checkbox212"
                            type="checkbox"
                            onClick={() => this.checkTable(1)}
                            checked={this.state.checkedArr[1]}
                            readOnly
                          />{" "}
                          <Label for="checkbox212" />
                        </div>
                      </td>
                      <td>HP Core i7</td>
                      <td className="text-align-right fw-semi-bold">$346.1</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="checkbox abc-checkbox">
                          <Input
                            className="mt-0"
                            id="checkbox214"
                            onClick={() => this.checkTable(2)}
                            type="checkbox"
                            checked={this.state.checkedArr[2]}
                            readOnly
                          />{" "}
                          <Label for="checkbox214" />
                        </div>
                      </td>
                      <td>Air Pro</td>
                      <td className="text-align-right fw-semi-bold">$533.1</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div
                className="widget-body mt-xlg chart-overflow-bottom"
                style={{ height: "100px" }}
              >
                <Rickshaw height={100} />
              </div>
            </Widget>
          </Col>

          <Col lg={4} xs={12}>
            <Widget
              title={<h6>Calendar</h6>}
              settings
              close
              bodyClass={"pt-2 px-0 py-0"}
            >
              <Calendar />
              <div className="list-group fs-mini">
                <button className="list-group-item text-ellipsis">
                  <span className="badge badge-pill badge-primary float-right">
                    6:45
                  </span>
                  Weed out the flower bed
                </button>
                <button className="list-group-item text-ellipsis">
                  <span className="badge badge-pill badge-success float-right">
                    9:41
                  </span>
                  Stop world water pollution
                </button>
              </div>
            </Widget>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default Dashboard;
