import React from 'react';
import '../assets/css/details.css';


export default class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            audit_info: this.props.data.info,
            alert_info: this.props.data.alert
        }
    }
    render(){
        var fA = this.state.audit_info[0]
        var sA = this.state.audit_info[1]

        
        const date11 =  fA["Collection Start Time"].split(" ")[0]
        const date1 = date11.split("/")
        const day1 = date1[1]
        const month1 = date1[0]
        const year1 = date1[2]

        const month_names = ["Jan","Feb","Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        const mname1 = month_names[month1-1];

        const date12 =  sA["Collection Start Time"].split(" ")[0]
        const date2 = date12.split("/")
        const day2 = date2[1]
        const month2 = date2[0]
        const year2 = date2[2]

        const mname2 = month_names[month2-1];





        return(
            <div className="timeline--container">
                <div className="timeline--element">
                    <div className="timeline--line">
                        <div className="timeline--date">
                            {day1} {mname1},{year1}
                        </div>
                        <div className="timeline--circle"></div>
                        <div className="timeline--me">
                            <div className="timeline--head">
                                <h5 className="timeline--audit"><b>{fA["Audit_ID"]}</b></h5>
                            </div>
                            <div className="timeline--content">
                                <div className="timeline--entry">
                                    <p>Devices Affected</p>
                                    <p style={{marginTop:"0px"}}>{fA["Devices Attempted"]}</p>
                                </div>

                                <div className="timeline--entry">
                                    <p>Devices Passed</p>
                                    <p style={{marginTop:"0px"}}>{fA["Devices Passed"]}</p>
                                </div>
                                
                                <div className="timeline--entry">
                                    <p>Devices Failed/Excluded</p>
                                    <p style={{marginTop:"0px"}}>{fA["Devices Failed/Excluded"]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="timeline--element">
                    <div className="timeline--line">
                        <div className="timeline--date">
                            {day2} {mname2},{year2}
                        </div>
                        <div className="timeline--circle"></div>
                        <div className="timeline--me">
                            <div className="timeline--head">
                                <h5 className="timeline--audit"><b>{sA["Audit_ID"]}</b></h5>
                            </div>
                            <div className="timeline--content">
                                <div className="timeline--entry">
                                    <p>Devices Affected</p>
                                    <p style={{marginTop:"0px"}}>{sA["Devices Attempted"]}</p>
                                </div>

                                <div className="timeline--entry">
                                    <p>Devices Passed</p>
                                    <p style={{marginTop:"0px"}}>{sA["Devices Passed"]}</p>
                                </div>
                                
                                <div className="timeline--entry">
                                    <p>Devices Failed/Excluded</p>
                                    <p style={{marginTop:"0px"}}>{sA["Devices Failed/Excluded"]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}