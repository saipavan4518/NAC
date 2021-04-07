import React from 'react';


// import components
import Loader from './Loading.component';


export default class ExceptionList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cpykey: this.props.state.cpykey,
            audit_1_id: this.props.state.audit_1_id,
            audit_2_id: this.props.state.audit_2_id,
            isLoading: true
        }
    }
    render(){
        const old_table = <h1>No data</h1>
        const tables = this.state.isLoading ? <div className="details-c"><h4>Exception List</h4>
        <Loader /></div>  : old_table
        return(
            {tables}
        )
    }
}