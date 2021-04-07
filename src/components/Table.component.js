import React from 'react';
import Axios from 'axios';
import '../assets/css/table.css';


import Table from './Tb.component';
import Loader2 from './Loader2.component';


export default class TC extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                cpykey: this.props.data.cpykey,
                a1: this.props.data.a1,
                a2: this.props.data.a2,
                isLoading: true,
                table_1_entries: [],
                table_2_entries: [],
                is_1_data: false,
                is_2_data: false,
        }
    }
    componentDidMount(){
        const url = "http://10.127.248.59:5000/api/audit/get/table/np"
        Axios.get(url, {
            params:{
                "cpykey":this.state.cpykey,
                "audit_1_id":this.state.a1,
                "audit_2_id":this.state.a2
            }
        })
        .then((data) =>{
            const method_1 = data.data.result.a1.method;
            const method_2 = data.data.result.a2.method;
            let t1e = [];
            let t2e = [];
            if(method_1) {t1e = data.data.result.a1.result.map(f => f);}
            if(method_2) {t2e = data.data.result.a2.result.map(f => f);}
            this.setState({
                is_1_data: method_1,
                is_2_data: method_2,
                table_1_entries: t1e.map(f => f),
                table_2_entries: t2e.map(f => f),
                isLoading: false
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    render(){
        var table_1_entries;
        var table_2_entries;
        if(this.state.isLoading){
            table_1_entries = <Loader2/>
            table_2_entries = <Loader2/>
        }else{
            //this is for left table
            if(this.state.is_1_data === true){
                //create the table here
               table_1_entries = <div>
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
                           {this.state.table_1_entries.map((e)=>{
                               return (
                                   <tr>
                                       <td>
                                           <label class="checkbox">
                                               <input type="checkbox"/>
                                               <span class="checkbox__input"></span>
                                           </label>
                                       </td>
                                       <td>
                                           {e}
                                       </td>
                                   </tr>
                               )
                           })}
                       </tbody>
                   </table>
               </div>      
                                </div>
            }else{
                table_1_entries = <h4>ALl Exceptions are cleared in the Newer audit</h4>
            }
            if(this.state.is_2_data === true){
                //create the table here
               table_2_entries = <Table data={this.state.table_2_entries} flag={this.state.is_2_data} />
            }else{
                table_2_entries = <h4>No New Exceptions in NewAudit File</h4>
            }
        }
        return(
            <div className='table-container'>
                <div className="ae_table_content">
                    <div className="atl">
                        <div className="ae_table_head">
                                {this.state.a1}
                        </div>
                        <div className="ae_table_left">
                            
                            {table_1_entries}
                        </div>
                    </div>
                    <div className="ae_table_right">
                        <div className="ae_table_head">
                            {this.state.a2}
                        </div>
                        <div>
                        {table_2_entries}
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}