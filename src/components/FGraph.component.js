import React from 'react';
import {BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, Label} from 'recharts';
import '../assets/css/fccaps.css';

export default class FGraph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            graphData: [this.props.data]
        }
    }
    render(){
        return(
            <div>
                <BarChart
                    width={500}
                    height={300}
                    data = {this.state.graphData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip content={this.CustomtoolTip}/>
                    <Legend />
                    <Label name="Pavan"/>
                    <Bar dataKey="audit_1id" fill="#8884d8" />
                    <Bar dataKey="audit_2id" fill="#FFA500" />
                </BarChart>
            </div>
        )
    }
}