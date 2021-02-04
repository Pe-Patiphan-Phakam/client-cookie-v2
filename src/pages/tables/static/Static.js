import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
  FormGroup,
  Form,Card, CardBody
} from "reactstrap";
import { MDBDataTable } from 'mdbreact';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Sparklines, SparklinesBars } from "react-sparklines";

import Widget from "../../../components/Widget";
import s from "./Static.module.scss";
import "./Static.css"

class Static extends React.Component {
  constructor(props) {
    super(props);
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    console.log(localISOTime)
    this.state = {
      tableStyles: [
        {
          id: 1,
          picture: require("../../../images/tables/1.png"), // eslint-disable-line global-require
          description: "Palo Alto",
          info: {
            type: "JPEG",
            dimensions: "200x150",
          },
          date: new Date("September 14, 2012"),
          size: "45.6 KB",
          progress: {
            percent: 29,
            colorClass: "success",
          },
        },
        {
          id: 2,
          picture: require("../../../images/tables/2.png"), // eslint-disable-line global-require
          description: "The Sky",
          info: {
            type: "PSD",
            dimensions: "2400x1455",
          },
          date: new Date("November 14, 2012"),
          size: "15.3 MB",
          progress: {
            percent: 33,
            colorClass: "warning",
          },
        },
        {
          id: 3,
          picture: require("../../../images/tables/3.png"), // eslint-disable-line global-require
          description: "Down the road",
          label: {
            colorClass: "primary",
            text: "INFO!",
          },
          info: {
            type: "JPEG",
            dimensions: "200x150",
          },
          date: new Date("September 14, 2012"),
          size: "49.0 KB",
          progress: {
            percent: 38,
            colorClass: "inverse",
          },
        },
        {
          id: 4,
          picture: require("../../../images/tables/4.png"), // eslint-disable-line global-require
          description: "The Edge",
          info: {
            type: "PNG",
            dimensions: "210x160",
          },
          date: new Date("September 15, 2012"),
          size: "69.1 KB",
          progress: {
            percent: 17,
            colorClass: "danger",
          },
        },
        {
          id: 5,
          picture: require("../../../images/tables/5.png"), // eslint-disable-line global-require
          description: "Fortress",
          info: {
            type: "JPEG",
            dimensions: "1452x1320",
          },
          date: new Date("October 1, 2012"),
          size: "2.3 MB",
          progress: {
            percent: 41,
            colorClass: "primary",
          },
        },
      ],
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
      dataTable: {},
      cookie: [],
      modal: false,
      txtcookieId: '',
      txtBrowser: '',
      txtIp: '',
      txtType: '',
      txtstdate: localISOTime,
      txtendate: localISOTime,
    };
    this.checkAll = this.checkAll.bind(this);
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    const _ = require("lodash");
    axios.get("http://127.0.0.1:5000/cookies/api/data")
    .then((response) => {
      console.log(response.data)
      var test = [];
      for (var i=0; i<response.data.length; i++) {
        var cookieId = response.data[i].cookieId
        var datetime = new Date(response.data[i].createdAt).toLocaleString();
        var access =  response.data[i].access
        var _id =  response.data[i]._id
        var ip = response.data[i].data[0].ipAdress
        var type = response.data[i].data[1].diviceType
        var path = response.data[i].data[6].pathname.split("/")[1]
        var browser = response.data[i].data[9].browser
        var typeId = response.data[i].typeId
        
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
        var chkVal = response.data[i].data[2].latitude
        test.push({cookieId,datetime,access,_id,ip,type,path,browser,typeId,latlng,chkVal})
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
                'text-align': 'center'
                
              },
            },
            {
              label: 'cookies-id',
              field: 'id',
              width: 270,
            },
            {
              label: 'ip',
              field: 'ip',
              width: 200,
            },
            {
              label: 'type',
              field: 'type',
              width: 200,
            },
            {
              label: 'browser',
              field: 'browser',
              width: 200,
            },
            {
              label: <div className="text-center">details</div>,
              field: 'detail',
              width: 500,
            },
          ],
          rows: [...test.map((item, index) => (
            {
              dt: item.datetime,
              id: item.cookieId,
              ip: item.ip,
              type: item.type,
              browser: item.browser,
              detail: <div className="text-center">
                <i className={item.access==='1'?"fi flaticon-view text-primary check":"fi flaticon-view check"} onClick={this.modalClick}
                  id={'{"cookieId":"'+item.cookieId+'", "datetime":"'+item.datetime+'", "access":"'+item.access+'", "_id":"'+item._id+'", "ip":"'+item.ip+'", "type":"'+item.type+'", "path":"'+item.path+'", "browser":"'+item.browser+'", "typeId":"'+item.typeId+'", "latlng":"'+item.latlng+'", "chkVal":"'+item.chkVal+'"}'}
                ></i>
              </div>
            }
          ))]
        },
      })
    })
  }

  changeStatus=(e)=>{
    const Item = JSON.parse(e.target.id)
    if (Item.access === '1') { Item.access = '0'}
    else {Item.access = '1'}
    var value = {
        _id: Item._id,
        access: Item.access,
    }
    axios.post("http://127.0.0.1:5000/cookies/api/update", value)
    .then((response) => {
        this.getData();
        this.setState({
          access: Item.access
        })
    }).catch((error) => {});
  }
  modalClick = (e) => {
    const Item = JSON.parse(e.target.id)
    if (Item.path==='') { Item.path = "index" }
    axios.get("http://127.0.0.1:5000/cookies/api/agree/"+Item.cookieId+"")
    .then((response) => {
      var rowVal = [];
      for (var i=0; i<response.data.length; i++) {
        var absolute1 = Math.abs(response.data[i].data[1].latitude);
        var degrees1 = Math.floor(absolute1);
        var minutesNotTruncated1 = (absolute1 - degrees1) * 60;
        var minutes1 = Math.floor(minutesNotTruncated1);
        var seconds1 = ((minutesNotTruncated1 - minutes1) * 60).toFixed(2);
        var absolute2 = Math.abs(response.data[i].data[2].longitude);
        var degrees2 = Math.floor(absolute2);
        var minutesNotTruncated2 = (absolute2 - degrees2) * 60;
        var minutes2 = Math.floor(minutesNotTruncated2);
        var seconds2 = ((minutesNotTruncated2 - minutes2) * 60).toFixed(2);

        var ip = response.data[i].data[0].ipAdress
        var path = response.data[i].data[5].pathname.split("/")[1]

        var latitudeCardinal = degrees1 >= 0 ? "N" : "S";
        var longitudeCardinal = degrees2 >= 0 ? "E" : "W";
        var latlng = degrees1+"°"+minutes1+"'"+seconds1+"''"+latitudeCardinal+"+"+degrees2+"°"+minutes2+"'"+seconds2+"''"+longitudeCardinal;
        var datetime = new Date(response.data[i].createdAt).toLocaleString();
        var chkVal = response.data[i].data[1].latitude
        rowVal.push({datetime,ip,path,latlng,chkVal})
      }
      this.setState({
        modalTable: {
          columns: [
            {
              label: 'date (MM/DD/YYYY)',
              field: 'dt',
            },
            {
              label: 'ip',
              field: 'ip',
              width: 270,
            },
            {
              label: 'path',
              field: 'path',
              width: 200,
            },
            {
              label: <div className="text-center">address</div>,
              field: 'address',
              width: 500,
            },
          ],
          rows: [...rowVal.map((rowVal, index) => (
            {
              dt: rowVal.datetime,
              ip: rowVal.ip,
              path: <div>{rowVal.path?rowVal.path:'index'}</div>,
              address: <div className="text-center">{rowVal.chkVal
                ?<a href={"https://www.google.com/maps/place/"+rowVal.latlng} target="_blank">
                  <i className="tim-icons icon-square-pin text-primary"/>
                </a>
                :'disallow'}
              
            </div>,
            }
          ))]
        },
        access: Item.access,
        browser: Item.browser,
        cookieId: Item.cookieId,
        datetime: Item.datetime,
        ip: Item.ip,
        path: Item.path,
        type: Item.type,
        _id: Item._id,
        typeId: Item.typeId,
        latlng: Item.latlng,
        chkVal: Item.chkVal,
        show: true,
      })
    })
  };
  handleChanage = (e) => {
    this.setState({[e.target.id] : e.target.value})
  }
  handleSearch= (e) => {
    e.preventDefault();
    var value = {
      cookieid: this.state.txtcookieId,
      stdate: this.state.txtstdate,
      endate: this.state.txtendate,
      ip: this.state.txtIp,
      type: this.state.txtType,
      browser: this.state.txtBrowser,
    }
    axios.post("http://127.0.0.1:5000/cookies/api/data/search", value)
    .then((response) => {
      var test = [];
      for (var i=0; i<response.data.length; i++) {
        var cookieId = response.data[i].cookieId
        var datetime = new Date(response.data[i].createdAt).toLocaleString();
        var access =  response.data[i].access
        var _id =  response.data[i]._id
        var ip = response.data[i].data[0].ipAdress
        var type = response.data[i].data[1].diviceType
        var path = response.data[i].data[6].pathname.split("/")[1]
        var browser = response.data[i].data[9].browser
        var typeId = response.data[i].typeId
        
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
        var chkVal = response.data[i].data[2].latitude
        test.push({cookieId,datetime,access,_id,ip,type,path,browser,typeId,latlng,chkVal})
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
                'text-align': 'center'
                
              },
            },
            {
              label: 'cookies-id',
              field: 'id',
              width: 270,
            },
            {
              label: 'ip',
              field: 'ip',
              width: 200,
            },
            {
              label: 'type',
              field: 'type',
              width: 200,
            },
            {
              label: 'browser',
              field: 'browser',
              width: 200,
            },
            {
              label: <div className="text-center">details</div>,
              field: 'detail',
              width: 500,
            },
          ],
          rows: [...test.map((item, index) => (
            {
              dt: item.datetime,
              id: item.cookieId,
              ip: item.ip,
              type: item.type,
              browser: item.browser,
            //   status: <div className="text-center">{item.access==='1'
            //   ?<i className="fas fa-check-circle check" id={'{"_id":"'+item._id+'", "access":"'+item.access+'"}'} onClick={this.changeStatus}></i>
            //   :<i className="fas fa-times-circle noncheck" id={'{"_id":"'+item._id+'", "access":"'+item.access+'"}'} onClick={this.changeStatus}></i>}
            // </div>,
              detail: <div className="text-center">
                <i className={item.access==='1'?"far fa-eye text-primary check":"far fa-eye check"} onClick={this.modalClick}
                  id={'{"cookieId":"'+item.cookieId+'", "datetime":"'+item.datetime+'", "access":"'+item.access+'", "_id":"'+item._id+'", "ip":"'+item.ip+'", "type":"'+item.type+'", "path":"'+item.path+'", "browser":"'+item.browser+'", "typeId":"'+item.typeId+'", "latlng":"'+item.latlng+'", "chkVal":"'+item.chkVal+'"}'}
                ></i>
              </div>
            }
          ))]
        },
      })
    })
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  checkAll(ev, checkbox) {
    const checkboxArr = new Array(this.state[checkbox].length).fill(
      ev.target.checked
    );
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          <span className="fw-semi-bold">Manage</span>
        </h2>
        <Row>
          <Col lg="12">
            <Widget
              bodyClass={s.mainTableWidget}
            >
            <Form>
            <Row>
              <Col className="px-md-3" md="3">
                <FormGroup>
                  <label>Date</label>
                  <Input className="txt1rem"
                    id="txtstdate"
                    defaultValue={this.state.txtstdate}
                    onChange={this.handleChanage}
                    type="date"
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-3" md="3">
                <FormGroup>
                  <label>Date</label>
                  <Input className="txt1rem"
                    id="txtendate"
                    defaultValue={this.state.txtendate}
                    onChange={this.handleChanage}
                    type="date"
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-3" md="3">
                <FormGroup>
                  <label>Cookie-ID</label>
                  <Input className="txt1rem"
                    id="txtcookieId"
                    defaultValue={this.state.txtcookieId}
                    onChange={this.handleChanage}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-3" md="3">
                <FormGroup>
                  <label>IP</label>
                  <Input className="txt1rem"
                    id="txtIp"
                    defaultValue={this.state.txtIp}
                    onChange={this.handleChanage}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-3" md="3">
                <FormGroup>
                  <label>Type</label>
                  <Input className="txt1rem"
                    id="txtType"
                    defaultValue={this.state.txtType}
                    onChange={this.handleChanage}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-3" md="3">
                <FormGroup>
                  <label>Browser</label>
                  <Input className="txt1rem"
                    id="txtBrowser"
                    defaultValue={this.state.txtBrowser}
                    onChange={this.handleChanage}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col className="pl-md-3" md="2">
                <FormGroup className="txt1rem">
                  <label></label>
                  <Input className="" type="submit" value="Search" onClick={this.handleSearch}></Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
              </Widget>
          </Col>

          <Col lg="12">
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

        <Row>
          <Col lg={6}>
            <Widget
              title={
                <h5>
                  Table <span className="fw-semi-bold">Styles</span>
                </h5>
              }
              settings
              close
            >
              <h3>
                Stripped <span className="fw-semi-bold">Table</span>
              </h3>

              <p>
                Each row is highlighted. You will never lost there. Just{" "}
                <code>.table-striped</code> it.
              </p>
              <Table className="table-striped">
                <thead>
                  <tr>
                    <th>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox1"
                          type="checkbox"
                          checked={this.state.checkboxes1[0]}
                          onChange={(event) =>
                            this.checkAll(event, "checkboxes1")
                          }
                        />
                        <Label for="checkbox1" />
                      </div>
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox2"
                          type="checkbox"
                          checked={this.state.checkboxes1[1]}
                          onChange={(event) =>
                            this.changeCheck(event, "checkboxes1", 1)
                          }
                        />
                        <Label for="checkbox2" />
                      </div>
                    </td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>
                      <Badge color="danger">Online</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox3"
                          type="checkbox"
                          checked={this.state.checkboxes1[2]}
                          onChange={(event) =>
                            this.changeCheck(event, "checkboxes1", 2)
                          }
                        />
                        <Label for="checkbox3" />
                      </div>
                    </td>
                    <td>
                      Jacob{" "}
                      <Badge color="warning" className="ml-2">
                        ALERT!
                      </Badge>
                    </td>
                    <td>Thornton</td>
                    <td>
                      <span className="text-secondary badge badge-gray">
                        Away
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox4"
                          type="checkbox"
                          checked={this.state.checkboxes1[3]}
                          onChange={(event) =>
                            this.changeCheck(event, "checkboxes1", 3)
                          }
                        />
                        <Label for="checkbox4" />
                      </div>
                    </td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>
                      <Badge color="danger">Construct</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <br />
              <br />
              <h3>
                Hover <span className="fw-semi-bold">Table</span>
              </h3>
              <p>
                {"Trace only what's really important. "}
                <code>.table-hover</code> is made for it.
              </p>
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {/* eslint-disable */}
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>
                        <a href="#">ottoto@example.com</a>
                      </td>
                      <td>
                        <Badge color="gray" className="text-secondary" pill>
                          Pending
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>
                        <a href="#">fat.thor@example.com</a>
                      </td>
                      <td>
                        <Badge color="gray" className="text-secondary" pill>
                          Unconfirmed
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>
                        <a href="#">larry@example.com</a>
                      </td>
                      <td>
                        <Badge color="primary" className="text-secondary" pill>
                          New
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Peter</td>
                      <td>Horadnia</td>
                      <td>
                        <a href="#">peter@example.com</a>
                      </td>
                      <td>
                        <Badge color="success" className="text-secondary" pill>
                          Active
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                  {/* eslint-enable */}
                </Table>
              </div>
            </Widget>
          </Col>
          <Col lg={6}>
            <Widget
              title={
                <h5>
                  Table <span className="fw-semi-bold">Styles</span>
                </h5>
              }
              settings
              close
            >
              <h3>
                Bordered <span className="fw-semi-bold">Table</span>
              </h3>
              <p>
                Each row is highlighted. You will never lost there. That&apos;s
                how all of us learned in school the table should look like. Just
                add
                <code>.table-bordered</code> to it.
              </p>
              <Table className="table-bordered table-lg mt-lg mb-0">
                <thead className="text-uppercase">
                  <tr>
                    <th>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox10"
                          type="checkbox"
                          checked={this.state.checkboxes2[0]}
                          onChange={(event) =>
                            this.checkAll(event, "checkboxes2")
                          }
                        />
                        <Label for="checkbox10" />
                      </div>
                    </th>
                    <th>Product</th>
                    <th className="text-right">Price</th>
                    <th className="text-center">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox11"
                          type="checkbox"
                          checked={this.state.checkboxes2[1]}
                          onChange={(event) =>
                            this.changeCheck(event, "checkboxes2", 1)
                          }
                        />
                        <Label for="checkbox11" />
                      </div>
                    </td>
                    <td>On the Road</td>
                    <td className="text-right">$25 224.2</td>
                    <td className="text-center">
                      <Sparklines
                        data={[13, 14, 16, 15, 4, 14, 20]}
                        style={{ width: "35px", height: "20px" }}
                      >
                        <SparklinesBars style={{ fill: "#1870DC" }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox12"
                          type="checkbox"
                          checked={this.state.checkboxes2[2]}
                          onChange={(event) =>
                            this.changeCheck(event, "checkboxes2", 2)
                          }
                        />
                        <Label for="checkbox12" />
                      </div>
                    </td>
                    <td>HP Core i7</td>
                    <td className="text-right">$87 346.1</td>
                    <td className="text-center">
                      <Sparklines
                        data={[14, 12, 16, 11, 17, 19, 16]}
                        style={{ width: "35px", height: "20px" }}
                      >
                        <SparklinesBars style={{ fill: "#58D777" }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox13"
                          type="checkbox"
                          checked={this.state.checkboxes2[3]}
                          onChange={(event) =>
                            this.changeCheck(event, "checkboxes2", 3)
                          }
                        />
                        <Label for="checkbox13" />
                      </div>
                    </td>
                    <td>Let&apos;s Dance</td>
                    <td className="text-right">$57 944.6</td>
                    <td className="text-center">
                      <Sparklines
                        data={[11, 17, 19, 16, 14, 12, 16]}
                        style={{ width: "35px", height: "20px" }}
                      >
                        <SparklinesBars style={{ fill: "#f0af03" }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox14"
                          type="checkbox"
                          checked={this.state.checkboxes2[4]}
                          onChange={(event) =>
                            this.changeCheck(event, "checkboxes2", 4)
                          }
                        />
                        <Label for="checkbox14" />
                      </div>
                    </td>
                    <td>Air Pro</td>
                    <td className="text-right">$118 533.1</td>
                    <td className="text-center">
                      <Sparklines
                        data={[13, 14, 20, 16, 15, 4, 14]}
                        style={{ width: "35px", height: "20px" }}
                      >
                        <SparklinesBars style={{ fill: "#F45722" }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox15"
                          type="checkbox"
                          checked={this.state.checkboxes2[5]}
                          onChange={(event) =>
                            this.changeCheck(event, "checkboxes2", 5)
                          }
                        />
                        <Label for="checkbox15" />
                      </div>
                    </td>
                    <td>Version Control</td>
                    <td className="text-right">$72 854.5</td>
                    <td className="text-center">
                      <Sparklines
                        data={[16, 15, 4, 14, 13, 14, 20]}
                        style={{ width: "35px", height: "20px" }}
                      >
                        <SparklinesBars style={{ fill: "#4ebfbb" }} />
                      </Sparklines>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
            <Widget
              title={
                <h5>
                  Table <span className="fw-semi-bold">Styles</span>
                </h5>
              }
              settings
              close
            >
              <h3>
                Overflow <span className="fw-semi-bold">Table</span>
              </h3>
              <p>
                Add any non-bordered .table within a widget for a seamless
                design. Awesome look for no cost. Just wrap the table with
                simple css class <code>.widget-table-overflow</code> inside of
                widget
              </p>
              <div className="widget-table-overflow">
                <Table className="table-striped table-lg mt-lg mb-0">
                  <thead>
                    <tr>
                      <th>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox20"
                            type="checkbox"
                            checked={this.state.checkboxes3[0]}
                            onChange={(event) =>
                              this.checkAll(event, "checkboxes3")
                            }
                          />
                          <Label for="checkbox20" />
                        </div>
                      </th>
                      <th>Product</th>
                      <th className="text-right">Price</th>
                      <th className="text-center">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox21"
                            type="checkbox"
                            checked={this.state.checkboxes3[1]}
                            onChange={(event) =>
                              this.changeCheck(event, "checkboxes3", 1)
                            }
                          />
                          <Label for="checkbox21" />
                        </div>
                      </td>
                      <td>On the Road</td>
                      <td className="text-right">$25 224.2</td>
                      <td className="text-center">
                        <Sparklines
                          data={[13, 14, 16, 15, 4, 14, 20]}
                          style={{ width: "35px", height: "20px" }}
                        >
                          <SparklinesBars style={{ fill: "#1870DC" }} />
                        </Sparklines>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox22"
                            type="checkbox"
                            checked={this.state.checkboxes3[2]}
                            onChange={(event) =>
                              this.changeCheck(event, "checkboxes3", 2)
                            }
                          />
                          <Label for="checkbox22" />
                        </div>
                      </td>
                      <td>HP Core i7</td>
                      <td className="text-right">$87 346.1</td>
                      <td className="text-center">
                        <Sparklines
                          data={[14, 12, 16, 11, 17, 19, 16]}
                          style={{ width: "35px", height: "20px" }}
                        >
                          <SparklinesBars style={{ fill: "#F45722" }} />
                        </Sparklines>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox23"
                            type="checkbox"
                            checked={this.state.checkboxes3[3]}
                            onChange={(event) =>
                              this.changeCheck(event, "checkboxes3", 3)
                            }
                          />
                          <Label for="checkbox23" />
                        </div>
                      </td>
                      <td>Let&apos;s Dance</td>
                      <td className="text-right">$57 944.6</td>
                      <td className="text-center">
                        <Sparklines
                          data={[11, 17, 19, 16, 14, 12, 16]}
                          style={{ width: "35px", height: "20px" }}
                        >
                          <SparklinesBars style={{ fill: "#f0af03" }} />
                        </Sparklines>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox24"
                            type="checkbox"
                            checked={this.state.checkboxes3[4]}
                            onChange={(event) =>
                              this.changeCheck(event, "checkboxes3", 4)
                            }
                          />
                          <Label for="checkbox24" />
                        </div>
                      </td>
                      <td>Air Pro</td>
                      <td className="text-right">$118 533.1</td>
                      <td className="text-center">
                        <Sparklines
                          data={[13, 14, 20, 16, 15, 4, 14]}
                          style={{ width: "35px", height: "20px" }}
                        >
                          <SparklinesBars style={{ fill: "#58D777" }} />
                        </Sparklines>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox25"
                            type="checkbox"
                            checked={this.state.checkboxes3[5]}
                            onChange={(event) =>
                              this.changeCheck(event, "checkboxes3", 5)
                            }
                          />
                          <Label for="checkbox25" />
                        </div>
                      </td>
                      <td>Version Control</td>
                      <td className="text-right">$72 854.5</td>
                      <td className="text-center">
                        <Sparklines
                          data={[16, 15, 4, 14, 13, 14, 20]}
                          style={{ width: "35px", height: "20px" }}
                        >
                          <SparklinesBars style={{ fill: "#4ebfbb" }} />
                        </Sparklines>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Widget>
          </Col>
        </Row>

        <Modal 
          class="modal-dialog modal-90w" 
          show={this.state.show}
          onHide={() => this.setState({show: false})}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Col>
          <Widget
              bodyClass={s.mainTableWidget}
            >
                <Form>
                  <Row>
                    <Col className="px-md-3" md="4">
                      <FormGroup>
                        <label>Date (MM/DD/YYYY)</label>
                        <Input className="txt1rem"
                          defaultValue={this.state.datetime}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-3" md="4">
                      <FormGroup>
                        <label>Cookie-ID</label>
                        <Input className="txt1rem"
                          defaultValue={this.state.cookieId}
                          type="text" disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          IP
                        </label>
                        <Input className="txt1rem" type="text" disabled defaultValue={this.state.ip}/>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="4">
                      <FormGroup>
                        <label>Type</label>
                        <Input className="txt1rem" defaultValue={this.state.type} type="text" disabled />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="4">
                      <FormGroup>
                        <label>Path</label>
                        <Input className="txt1rem" defaultValue={this.state.path} type="text" disabled />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="4">
                      <FormGroup>
                        <label>Browser</label>
                        <Input className="txt1rem" defaultValue={this.state.browser} type="text" disabled />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="1">
                      <FormGroup>
                        <label className="txt1rem">TypeID</label>
                        {/* <Input className="txt1rem" defaultValue={this.state.typeId} type="text" disabled/> */}
                        <Input className="" type="button" value={this.state.typeId} onClick={()=>this.setState({inshow: true})}></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="1" >
                      <FormGroup>
                        <label className="txt1rem">Address</label>
                        <div className="my-address">
                          <a href={"https://www.google.com/maps/place/"+this.state.latlng} target="_blank" 
                          className={this.state.chkVal?"":"disabled"}>
                            <i className="fi flaticon-map-location"></i>
                          </a>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-3" md="1">
                      <FormGroup>
                        <label className="txt1rem">Status</label>
                        <Switch
                          checked={this.state.access==='1'?true:false}
                          onChange={this.changeStatus}
                          color="primary"
                          name="checkedB"
                          id={'{"_id":"'+this.state._id+'", "access":"'+this.state.access+'"}'}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                </Form>
                </Widget>
          </Col>
          <Col>
          <Widget
              bodyClass={s.mainTableWidget}
            >
              <MDBDataTable
                striped
                small
                data={this.state.modalTable}
              />
              </Widget>
          </Col>
        </Modal.Body>
        </Modal>

        <Modal
          className="testmodal"
          show={this.state.inshow}
          onHide={() => this.setState({inshow: false})}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            {/* <Modal.Title id="example-custom-modal-styling-title-sm">
              Type-ID
            </Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
          <Col>
            <Widget
              bodyClass={s.mainTableWidget}
            >
              <Form>
              <p class="fw-bold">THIS WEBSITE USES COOKIES</p>
              <p>OSD CO.,LTD collects cookies to enble the proper functioning and security of our website, and help us offer you the best possible</p>
              <p>user experience.By clicking on Agree, you consent to the use of please read the OSD CO.,LTD <a href="#"><ins>Cookie management policy.</ins></a></p>
              </Form>
            </Widget>
          </Col>
          <Col>
            <Widget
              bodyClass={s.mainTableWidget}
            >
            <Form>
              <p class="fw-bold">SELECT YOUR CHOICE OF COOKIES ON OUR WEBSITE</p>
              <p>
                <div class="form-check">
                <Row>
                  <Col className="px-md-5" md="3">
                    <FormGroup>
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="all" value="option1" 
                      checked={this.state.typeId==="1"?true:false} disabled={this.state.typeId==="1"?false:true}/>
                      <label class="form-check-label" for="all">
                        ALL COOKIES
                      </label>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-5" md="3">
                    <FormGroup>
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="analytical" value="option2"
                      checked={this.state.typeId==="2"?true:false} disabled={this.state.typeId==="2"?false:true}/>
                      <label class="form-check-label" for="analytical">
                        ANALYTICAL COOKIES
                      </label>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-5" md="3">
                    <FormGroup>
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="function" value="option3" 
                      checked={this.state.typeId==="3"?true:false} disabled={this.state.typeId==="3"?false:true}/>
                      <label class="form-check-label" for="function">
                        FUNCTIONAL COOKIES
                      </label>
                    </FormGroup>
                  </Col>
                </Row>
                </div>
              </p>
              <p><i className="fa fa-check"></i> Functional Cookies</p>
                <Row className="px-md-5">
                  <FormGroup>
                  <p>● Are necessary for the proper functioning of the websites</p>
                  <p>● Enable you to book a flight and access your account securely</p>
                  <p>● do not collect any personal information</p>
                  {this.state.typeId===3
                  ?<div className="yel"> Please note: Disabling these cookies may impact your browsing experience onour website.</div>
                  :''}
                  </FormGroup>
                </Row>
                
              <p>
                {this.state.typeId!=="3"
                ?<i className="fa fa-check"></i>
                :<i className="fa fa-times"/>}
                {" "}Analytical Cookies
              </p>
                <Row className="px-md-5">
                  <FormGroup>
                    <p>● Help us detect any bugs and improve our websites</p>
                    <p>● Collect anonymous information about your visits to our websites</p>
                    <p>● Are never used for marketing purposes</p>
                    {this.state.typeId===2
                    ?<div className="yel"> Please note: Disabling these cookies may impact your browsing experience onour website.</div>
                    :''}
                    
                  </FormGroup>
                </Row>
                
              <p>
                {this.state.typeId==="1" 
                ?<i className="fa fa-check"></i>
                :<i className="fa fa-times"/>}
                {" "}Marketing Cookies and Other Cookies
              </p>
                <Row className="px-md-5">
                  <FormGroup>
                    <p>&nbsp;&nbsp;&nbsp;● Store your preferences based on previous visits to our websites</p>
                    <p>&nbsp;&nbsp;&nbsp;● Help us identify relevant e-mails, social media and banner ads for you</p>
                    <p>&nbsp;&nbsp;&nbsp;● Allow our partners display offers and advertisements that suit your interests</p>
                  </FormGroup>
                </Row>
                
            </Form>
            </Widget>
          </Col>
        </Modal.Body>
        </Modal>
        </div>
    );
  }
}

export default Static;
