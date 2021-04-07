import React from 'react';
import Axios from 'axios';
import '../assets/css/severity.css';
import Loader2 from './Loader2.component';
import Loader from './Loading.component';


export default class STC extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cpykey: this.props.data.cpykey,
            a1: this.props.data.a1,
            a2: this.props.data.a2,
            severity: this.props.data.severity,
            audit1_data: [],
            audit2_data: [],
            isLoading: true
        }
    }
    componentDidMount(){
        console.log(this.state.severity)
        let url;
        if(this.state.severity === "Critical"){
            url = "http://10.127.248.59:5000/api/audit/table/ce";
        }
        if(this.state.severity === "High"){
            url = "http://10.127.248.59:5000/api/audit/table/test/he";
        }
        else if(this.state.severity === "Medium"){
            url = "http://10.127.248.59:5000/api/audit/table/me";
        }
        else if(this.state.severity === "Low"){
            url = "http://10.127.248.59:5000/api/audit/table/le";  
        }
        else if(this.state.severity === "Informational"){
            url = "http://10.127.248.59:5000/api/audit/table/ie";
        } 
        console.log(url)
        Axios.get(url,{
            params:{
                "cpykey":this.state.cpykey,
                "audit_1_id":this.state.a1,
                "audit_2_id":this.state.a2
            }
        })
        .then((data)=>{
            console.log(data)
            this.setState({
                audit1_data: data.data.result.audit_1,
                audit2_data: data.data.result.audit_2,
                isLoading:false
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }  
    render(){
        let color;
        if(this.state.severity === "Critical"){
            color = "rgb(0, 188, 235,0.8)"
        }else if(this.state.severity === "High"){
            color = "rgb(226, 35, 26,0.8)"
        }else if(this.state.severity === "Medium"){
            color = "rgb(251, 171, 24,0.8)"
        }else if(this.state.severity === "Low"){
            color = "rgb(238, 210, 2,0.8)"
        }else  if(this.state.severity === "Informational"){
            color = "rgb(106, 191, 75,0.8)"
        }

        const left_table = this.state.isLoading ? <div className="loader-div"><Loader2 /></div>
        :   <div>
                <div className="reponsive-table">
                    <table class="table table--lined table--fixed" aria-label="data">
                        <thead style={{top:"0px",position:"sticky",backgroundColor:"#F5F5F5", zIndex:"99"}}>
                            <tr>
                                <th class="sortable">Exception Name<span class="srt-indicator icon-dropdown"></span></th>
                                <th>Devices Affected</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.audit1_data.map((e)=>{
                                return (
                                    <tr>
                                        <td style={{backgroundColor:color}}>
                                            {e.exception}
                                        </td>
                                        <td>
                                            {e.list.map((ad)=>{
                                                return(
                                                    <p>{ad}</p>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>      
            </div>
        const right_table = this.state.isLoading ? <Loader2 />
        : <div>
        <div className="reponsive-table">
            <table class="table table--lined table--fixed" aria-label="data">
                <thead style={{top:"0px",position:"sticky",backgroundColor:"#F5F5F5", zIndex:"99"}}>
                    <tr>
                       
                        <th class="sortable">Exception Name<span class="srt-indicator icon-dropdown"></span></th>
                        <th>Devices Affected</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {this.state.audit2_data.map((e)=>{
                        return (
                            <tr>
                                
                                <td style={{backgroundColor:color}}>
                                    {e.exception}
                                </td>
                                
                                <td>
                                    {e.list.map((ad)=>{
                                        return(
                                            <p>{ad}</p>
                                        )
                                    })}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>      
    </div>
        return(
            <div className="sev_table_container">
                <div className="sev_table_content">
                    <div className="stl">
                        <div className="sev_table_head" >
                                {this.state.a1}
                        </div>
                        <div className="sev_table_left">
                            
                            {left_table}
                        </div>
                    </div>
                    <div className="str">
                        <div className="sev_table_head">
                                {this.state.a2}
                        </div>
                        <div className="sev_table_right">
                            {right_table}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}