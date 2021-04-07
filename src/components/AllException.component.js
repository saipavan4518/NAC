import React from 'react';
import Axios from 'axios';
import {BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, Label} from 'recharts';




import axios from 'axios';
import CLoading from './componentLoading.component';
import TC from './Table.component';
import STC from './SeverityTable.component';
import UEC from './Unique.Exceptions.component';
import '../assets/css/allexception.css';

export default class AE extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cpykey: this.props.state.cpykey,
            audit_1_id: this.props.state.audit_1_id,
            audit_2_id: this.props.state.audit_2_id,
            isLoading: true,
            ae_datas: [],
            ue_datas: [],
            oe_datas: [],
            ae_percent: 0,
            ue_percent: 0,
            oe_percent: 0
        }
        this.criticalRef = React.createRef();
        this.highRef = React.createRef();
        this.midRef = React.createRef();
        this.low = React.createRef();
        this.info = React.createRef();
        this.Handler = this.Handler.bind(this);
    }
    Handler(e){
        if(e.activeLabel === "Critical"){
            this.criticalRef.current.scrollIntoView({behavior:"smooth"})
        }else if(e.activeLabel === "High"){
            this.highRef.current.scrollIntoView({behavior:"smooth"})
        }else if(e.activeLabel === "Medium"){
            this.midRef.current.scrollIntoView({behavior:"smooth"})
        }else if(e.activeLabel === "Low"){
            this.low.current.scrollIntoView({behavior:"smooth"})
        }else if(e.activeLabel === "Info"){
            this.info.current.scrollIntoView({behavior:"smooth"})
        }
    }
    componentDidMount(){
            const ae = Axios.get("http://10.127.248.59:5000/api/audit/ae",{params:{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,  "audit_2_id":this.state.audit_2_id}})
            const ue = Axios.get("http://10.127.248.59:5000/api/audit/ue",{params:{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,  "audit_2_id":this.state.audit_2_id}})
            const oe = Axios.get("http://10.127.248.59:5000/api/audit/oe",{params:{"cpykey":this.state.cpykey, "audit_1_id":this.state.audit_1_id,  "audit_2_id":this.state.audit_2_id}})
            axios.all([ae,ue, oe]).then(axios.spread((...responses)=>{
                const ae_data = responses[0]
                const ue_data = responses[1]
                const oe_data = responses[2]
                this.setState({
                    isLoading: false,
                    ae_datas: ae_data["data"]["result"].map(f => f),
                    ue_datas: ue_data["data"]["result"].map(f => f),
                    oe_datas: oe_data["data"]["result"].map(f => f),
                    ae_percent: ae_data["data"]["percent"],
                    ue_percent: ue_data["data"]["percent"],
                    oe_percent: oe_data["data"]["percent"]
                })
            }))
            .catch(errors =>{console.log(errors)})
    }

    CustomtoolTip({payload, label, active}) {
        if(active){
            var icon;
            var color_class="percent";
            if(payload[0].payload.percent.diff === "decrement"){
                    icon =  <span class="icon-arrow-down-tail icon-size-14"></span>;
                    color_class = "p_green"
            }else if(payload[0].payload.percent.diff === "increment"){
                    icon =  <span class="icon-arrow-up-tail icon-size-14"></span>
                    color_class = "p_red"
            }else{
                    icon = <span class="icon-remove icon-size-14"></span>
            }
            return(
                <div style={{width:"150px"}}>
                    <div className="custom-tooltip">
                        <p>All Exceptions</p>
                        <div className="label-1">
                            <p style={{color:payload[0].fill,marginTop:"6%"}}>
                                {payload[0].dataKey}
                            </p>
                            <p>
                                :
                            </p>
                            <p>
                                {payload[0].value}
                            </p>
                            
                        </div>
                        <div className="label-2">
                            <p style={{color:payload[1].fill, marginTop:"6%"}}>{payload[1].dataKey}</p><p>:</p><p>{payload[1].value}</p>
                        </div>
                        <div className={color_class}>
                            <p style={{ marginTop:"6%"}}>Percent</p>
                            <p>:</p>
                            <p>{payload[0].payload.percent.p}</p> 
                            <p>{icon}</p>
                        </div>
                    </div>
                </div>
                
            )
        }
        return null;
    }

    render(){
        const ae_graph = <div className="ae_severity">
                
                <BarChart
                    width={500}
                    height={300}
                    data = {this.state.ae_datas}
                    onClick={this.Handler}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip content={this.CustomtoolTip}/>
                    <Legend />
                    <Label name="Pavan"/>
                    <Bar dataKey={this.state.audit_1_id} fill="#004c6d" onClick={this.Handler}/>
                    <Bar dataKey={this.state.audit_2_id} fill="#6996b3" onClick={this.Handler}/>
                    </BarChart>
                    <CLoading data={{"percent":this.state.oe_percent["p"],"type":this.state.oe_percent["diff"]}}/>
                </div>
        const ue_graph = <div className="ae_unique">
            
            <BarChart
                width={500}
                height={300}
                data = {this.state.ue_datas}
                barCategoryGap={180}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Label name="Data"/>
                <Bar dataKey={this.state.audit_1_id} fill="#004c6d" maxBarSize={35}/>
                <Bar dataKey={this.state.audit_2_id} fill="#6996b3" maxBarSize={35}/>
                </BarChart>
                <CLoading data={{"percent":this.state.ue_percent["p"],"type":this.state.ue_percent["diff"]}}/>
        </div>
        const loading = <div class="loading">
                    <div className="loader" aria-label="Loading, please wait...">
                        <div className="wrapper">
                            <div className="wheel"></div>
                            
                        </div>
                    </div>
                    <p>Loading</p>
                </div>
        const ae_graph_Loading = this.state.isLoading ? loading : ae_graph
        const ue_graph_Loading = this.state.isLoading ? loading : ue_graph
        return(
            <div className="ae">
                <div className="ae_graph">
                    <h4>All Exceptions with Severity Levels</h4>
                    {ae_graph_Loading}
                </div>
                <div className="ue_graph">
                    <h4>Unique Exceptions</h4>
                    {ue_graph_Loading}
                </div>
                <div className="ae_table">
                    <h4>Unique Exceptions Specific For Audit Files</h4>
                    <TC data={{"cpykey":this.state.cpykey,"a1":this.state.audit_1_id,"a2":this.state.audit_2_id}}/>
                </div>
                <div ref={this.criticalRef} className="sev_c_table">
                    <h4>Critical Exception Table</h4>
                    <STC data={{"cpykey":this.state.cpykey,"a1":this.state.audit_1_id,"a2":this.state.audit_2_id,"severity":"Critical"}} />
                </div>
                <div ref={this.highRef} className="sev_h_table">
                    <h4>High Exception Table</h4>
                    <STC data={{"cpykey":this.state.cpykey,"a1":this.state.audit_1_id,"a2":this.state.audit_2_id,"severity":"High"}} />
                </div>
                <div ref={this.midRef} className="sev_m_table">
                    <h4>Medium Exception Table</h4>
                    <STC data={{"cpykey":this.state.cpykey,"a1":this.state.audit_1_id,"a2":this.state.audit_2_id,"severity":"Medium"}} />
                </div>
                <div ref={this.low} className="sev_l_table">
                    <h4>Low Exception Table</h4>
                    <STC data={{"cpykey":this.state.cpykey,"a1":this.state.audit_1_id,"a2":this.state.audit_2_id,"severity":"Low"}} />
                </div>
                <div ref={this.info} className="sev_i_table">
                    <h4>Informational Exception Table</h4>
                    <STC data={{"cpykey":this.state.cpykey,"a1":this.state.audit_1_id,"a2":this.state.audit_2_id,"severity":"Informational"}} />
                </div>
                <div className="ae_table">
                    <h4>All Unique Exceptions</h4>
                    <UEC data={{"cpykey":this.state.cpykey,"a1":this.state.audit_1_id,"a2":this.state.audit_2_id}}/>
                </div>
            </div>
        )
    }
}