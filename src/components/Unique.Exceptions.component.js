import React from 'react';
import Axios from 'axios';
import Loader2 from './Loader2.component';
import '../assets/css/severity.css';


export default class UEC extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cpykey: this.props.data.cpykey,
            a1: this.props.data.a1,
            a2: this.props.data.a2,
            audit1_data: [],
            audit2_data: [],
            isLoading: true
        }
    }
    componentDidMount(){
        const url = "http://10.127.248.59:5000/api/test/uel"
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
                audit1_data: data.data.result.audit_1.map(f => f),
                audit2_data: data.data.result.audit_2.map(f => f),
                isLoading:false
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }  
    render(){
        
        const left_table = this.state.isLoading ? <Loader2 />
        :   <div>
                <div className="reponsive-table">
                    <table class="table table--lined table--wrapped" aria-label="data">
                        <thead style={{top:"0px",position:"sticky",backgroundColor:"#F5F5F5", zIndex:"99"}}> 
                            <tr>
                                <th>
                                    <label class="checkbox">
                                        <input type="checkbox"/>
                                        <span class="checkbox__input"></span>
                                    </label>
                                </th>
                                <th class="sortable">Exception Name<span class="srt-indicator icon-dropdown"></span></th>
                    
                                
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.audit1_data.map(f => {
                                return (
                                    <tr>
                                        <td>
                                            <label class="checkbox">
                                                <input type="checkbox"/>
                                                <span class="checkbox__input"></span>
                                            </label>
                                        </td>
                                        <td>
                                            {f}    
                                        </td>
                                        
                                    </tr>
                                )
                            })
                        }    
        
                        </tbody>
                    </table>
                </div>      
            </div>
        const right_table = this.state.isLoading ? <Loader2 />
        : <div>
        <div className="reponsive-table">
            <table class="table table--lined table--wrapped" aria-label="data">
                <thead style={{top:"0px",position:"sticky",backgroundColor:"#F5F5F5", zIndex:"99"}}>
                    <tr>
                        <th>
                            <label class="checkbox">
                                <input type="checkbox"/>
                                <span class="checkbox__input"></span>
                            </label>
                        </th>
                        <th class="sortable">Exception Name<span class="srt-indicator icon-dropdown"></span></th>
                        
                    </tr>
                </thead>
                <tbody>
                        {
                            this.state.audit2_data.map(f => {
                                return (
                                    <tr>
                                        <td>
                                            <label class="checkbox">
                                                <input type="checkbox"/>
                                                <span class="checkbox__input"></span>
                                            </label>
                                        </td>
                                        <td>
                                            {f}    
                                        </td>
                                        
                                    </tr>
                                )
                            })
                        }  
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