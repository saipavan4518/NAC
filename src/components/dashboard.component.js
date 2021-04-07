import React from 'react';
import '../assets/css/dashboard.css';
import Axios from 'axios';
import {
    Accordion,
    AccordionContextProvider
} from '@cisco/react-cui';



//import all components here
import AE from '../components/AllException.component';
import Navbar from '../components/Navbar.component';
import Details from './Details.component';
import Loader from './Loading.component';
import ExceptionList from './ExceptionList.component';
import SB from './Fccaps.component';
import Fcaps from './FCCAPSbreakdown.component';


export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cpykey : this.props.location.state.cpykey,
            audit_1_id: this.props.location.state.audit_1_id,
            audit_2_id: this.props.location.state.audit_2_id,
            cname: this.props.location.state.cname,
            audit_info: [],
            alert_info: [],
            isDetailLoad: true,
            renderRight:"ov",
            isActive:"ov",
            isTBactive: false
        }
        this.topref = React.createRef();
        this.clickHandler = this.clickHandler.bind(this);
        this.accordHandler = this.accordHandler.bind(this);
        this.topHandler = this.topHandler.bind(this);
        this.onScrollHandler = this.onScrollHandler.bind(this);
    }
    componentDidMount(){
        const url1 = "http://10.127.248.59:5000/api/audit/info"
        const url2 = "http://10.127.248.59:5000/api/audit/ae"
        const one = Axios.get(url1, {params:{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,  "audit_2_id":this.state.audit_2_id}})
        const two = Axios.get(url2, {params:{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,  "audit_2_id":this.state.audit_2_id}}) 

        Axios.all([one,two]).then(Axios.spread((...responses)=>{
            const ainfo = responses[0];
            const alinfo = responses[1];
            this.setState({
                isDetailLoad:false,
                audit_info: ainfo["data"]["result"].map(f => f),
                alert_info: alinfo["data"]["result"].map(f => f),
            })
        }))
        .catch((error)=>{
            console.log(error)
        })
    }
    clickHandler(e){
        this.setState({
            isActive:e,
            renderRight: e
       })
    }
    accordHandler(e){
        console.log(e)
    }
    topHandler(e){
        this.topref.current.scrollIntoView({behavior:"smooth"})
    }
    onScrollHandler(e){
    }
    render(){
        var right_render;
        if( this.state.renderRight === "ov"){
            right_render =  this.state.isDetailLoad ? <div className="details-c"><h4>Details of the Audit</h4>
            <Loader /></div> 
            : <div className="details-c"><h3>Details of the Audits</h3><Details data={{"info":this.state.audit_info,"alert": this.state.alert_info}} /></div>
        }else if(this.state.renderRight === "ac"){
            right_render = <AE state={{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,"audit_2_id":this.state.audit_2_id}}/>
        }else if(this.state.renderRight === "be"){
            right_render = <ExceptionList state={{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,"audit_2_id":this.state.audit_2_id}}/>
        }else if(this.state.renderRight === "sb"){
            right_render = <SB state={{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,"audit_2_id":this.state.audit_2_id}}/>
        }else if(this.state.renderRight === "fb"){
            right_render = <Fcaps state={{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,"audit_2_id":this.state.audit_2_id}}/>
        }
        return(
            <div className="dashboard-container">
                <div className="d-navbar">
                    <div>
                        <Navbar data={{"cpykey":this.state.cpykey, "cname": this.state.cname}}/>
                    </div>
                </div>
                <div ref={this.topref} id="top"></div>
                <div className="d-content">
                    <div className="d-left-side">
                        <div className="v-bar">
                            <div className={`v-bar-entry ${this.state.isActive==="ov"?"v-active":""}`} name="ov" onClick={()=>this.clickHandler("ov")}>
                            <p>Home</p>
                            </div>
                            <div className="v-bar-entry1">
                                <AccordionContextProvider >
                                    <Accordion >
                                        <Accordion.Item itemName="ac" title="Audit Compare" className="acc-item">
                                                <p className={`v-bar-entry ${this.state.isActive==="ac"?"v-active":""}`} onClick={()=>this.clickHandler("ac")}>Exceptions</p>
                                                <p className={`v-bar-entry ${this.state.isActive==="sb"?"v-active":""}`} onClick={()=>this.clickHandler("sb")}>Severity Breakdown</p>
                                                <p className={`v-bar-entry ${this.state.isActive==="fb"?"v-active":""}`} onClick={()=>this.clickHandler("fb")}>FCCAPS Breakdown</p>
                                        </Accordion.Item>
                                    </Accordion>
                                </AccordionContextProvider>
                            </div>
                            <div className={`v-bar-entry ${this.state.isActive==="ft"?"v-active":""}`} name="ft" onClick={()=>this.clickHandler("ft")}>
                                <p>Future MenuItems</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-right-side">
                        {right_render}
                    </div>
                </div>
                <div className="d-topbutton" onClick={this.topHandler}>
                    <span class="icon-arrow-up-tail icon-size-24"></span>
                </div>
            </div>
        )
    }
}