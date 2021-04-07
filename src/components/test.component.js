import axios from 'axios';
import React from 'react';
import '../assets/css/test.css';

import Loading from './Loading.component';

export default class Test extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading: true,
            table_1_entries: [],
            is_1_data: false
        }
    }
    componentDidMount(){
        const url = "http://localhost:5000/api/audit/get/table/np"
        axios.get(url, {
            params:{
                "cpykey":"12345",
                "audit_1_id":"64389",
                "audit_2_id":"6438"
            }
        })
        .then((data) =>{
            const method = data.data.result.method;
            if(method === false){
                this.setState({
                    isLoading:false,
                    is_1_data: false
                })
            }else{
                this.setState({
                    table_1_entries: data.data.result.result.map(f => f),
                    is_1_data: data.data.result.method,
                    isLoading: false
                })
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    render(){
        var table_entries;
        if(this.state.isLoading){
            table_entries = <Loading />
        }else{
            if(this.state.is_1_data === true){
                //create the table here
               table_entries = <div className="reponsive-table">
                    <table class="table table--lined table--wrapped" aria-label="data">
                        <thead>
                            <tr>
                                <th>
                                    <label class="checkbox">
                                        <input type="checkbox"/>
                                        <span class="checkbox__input"></span>
                                    </label>
                                </th>
                                <th class="sortable">Header 1 <span class="sort-indicator icon-dropdown"></span></th>
                                <th>Header 2</th>
                                <th>Header 3</th>
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
            }else{
                table_entries = <h1>ALl Exceptions are cleared in the Newer audit</h1>
            }
        }
        return(
            <div>
                {table_entries}
            </div>
        )
    }
}