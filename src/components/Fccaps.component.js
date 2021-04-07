import React from 'react';
import Axios from 'axios';
import '../assets/css/fccaps.css';
import {BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, Label} from 'recharts';
import Loader from './Loading.component';

export default class SB extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cpykey: this.props.state.cpykey,
            audit_1_id: this.props.state.audit_1_id,
            audit_2_id: this.props.state.audit_2_id,
            rightrender:"c", 
            isLoading: true,
            ae_data: [],
            isActive:"c"
        }
    }
    clickHandler(e){
        this.setState({
            isActive:e,
            rightrender:e
        })
    }
    componentDidMount(){
        const url1 = "http://10.127.248.59:5000/api/audit/ae"
        Axios.get(url1,
            {
                params:{
                    "cpykey":this.state.cpykey,
                    "audit_1_id":this.state.audit_1_id,
                    "audit_2_id":this.state.audit_2_id
                }
        })
        .then((data)=>{
            this.setState({
                ae_data:  data["data"]["result"].map(f => f),
                isLoading:false
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    render(){
        var r_render ;
        if(this.state.rightrender === "c"){
            r_render = this.state.isLoading ? <Loader /> : <div className="fp-graph">
            <BarChart
                width={500}
                height={300}
                data = {[this.state.ae_data[0]]}
                barCategoryGap={180}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip content={this.CustomtoolTip}/>
                <Legend />
                <Bar dataKey={this.state.audit_1_id} fill="#004c6d" maxBarSize={35}/>
                <Bar dataKey={this.state.audit_2_id} fill="#6996b3" maxBarSize={35}/>
            </BarChart>
        </div>
        }else if(this.state.rightrender === "h"){
            r_render = this.state.isLoading ? <Loader /> :  <div className="fp-graph">
            <BarChart
                width={500}
                height={300}
                data = {[this.state.ae_data[1]]}
                barCategoryGap={180}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip content={this.CustomtoolTip}/>
                <Legend />
                <Bar dataKey={this.state.audit_1_id} fill="#004c6d" maxBarSize={35}/>
                <Bar dataKey={this.state.audit_2_id} fill="#6996b3" maxBarSize={35}/>
            </BarChart>
        </div>
        }else if(this.state.rightrender === "m"){
            r_render = this.state.isLoading ? <Loader /> :  <div className="fp-graph">
            <BarChart
                width={500}
                height={300}
                data = {[this.state.ae_data[2]]}
                barCategoryGap={180}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip content={this.CustomtoolTip}/>
                <Legend />
                <Bar dataKey={this.state.audit_1_id} fill="#004c6d" maxBarSize={35}/>
                <Bar dataKey={this.state.audit_2_id} fill="#6996b3" maxBarSize={35}/>
            </BarChart>
        </div>
        }else if(this.state.rightrender === "l"){
            r_render = this.state.isLoading ? <Loader /> :  <div className="fp-graph">
            <BarChart
                width={500}
                height={300}
                data = {[this.state.ae_data[3]]}
                barCategoryGap={180}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip content={this.CustomtoolTip}/>
                <Legend />
                <Bar dataKey={this.state.audit_1_id} fill="#004c6d" maxBarSize={35}/>
                <Bar dataKey={this.state.audit_2_id} fill="#6996b3" maxBarSize={35}/>
            </BarChart>
        </div>
        }else if(this.state.rightrender === "i"){
            r_render = this.state.isLoading ? <Loader /> :  <div className="fp-graph">
            <BarChart
                width={500}
                height={300}
                data = {[this.state.ae_data[4]]}
                barCategoryGap={180}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip content={this.CustomtoolTip}/>
                <Legend />
                <Bar dataKey={this.state.audit_1_id} fill="#004c6d" maxBarSize={35}/>
                <Bar dataKey={this.state.audit_2_id} fill="#6996b3" maxBarSize={35}/>
            </BarChart>
        </div>
        }
        return(
            <div className="fp-container">
                <div className="fp-content">
                    <div className="fp-left">
                        <div className="fp-left-contents">
                            <div className = {`fp-entries ${this.state.isActive==="c"?"fp-active":""}`} onClick={()=>{this.clickHandler("c")}}>
                                <p>Critical</p>
                            </div>
                            <div className={`fp-entries ${this.state.isActive==="h"?"fp-active":""}`} onClick={()=>{this.clickHandler("h")}}>
                                <p>High</p>
                            </div>
                            <div className={`fp-entries ${this.state.isActive==="m"?"fp-active":""}`} onClick={()=>{this.clickHandler("m")}}>
                                <p>Medium</p>
                            </div>
                            <div className={`fp-entries ${this.state.isActive==="l"?"fp-active":""}`} onClick={()=>{this.clickHandler("l")}}>
                                <p>Low</p>
                            </div>
                            <div className={`fp-entries ${this.state.isActive==="i"?"fp-active":""}`} onClick={()=>{this.clickHandler("i")}}>
                                <p>Informational</p>
                            </div>
                        </div>
                    </div>
                    <div className="fp-right">
                        <h4>Graphs</h4>
                        {r_render}
                    </div>
                </div>
            </div> 
        )
    }
}