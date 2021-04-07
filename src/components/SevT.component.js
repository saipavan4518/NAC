import React from 'react';

export default class SevTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            table_1_entries: this.props.data,
            current_page: 1,
            entriesPerpage: 5,
            gotoPage:1
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    inputHandler(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }
    clickHandler(e){
        this.setState({
            current_page: this.state.gotoPage
        })
    }
    arrowHandler(e){
        if(e==="l"){
            if(this.state.current_page!==1){
                this.setState((prevstate)=>({
                    ...prevstate,
                    current_page : prevstate.current_page-1
                }))
            }
        }
        if(e==="r"){
            let max = (Math.ceil(this.state.table_1_entries.length / this.state.entriesPerpage))
            if(this.state.current_page < max){
                this.setState((prevstate)=>({
                    ...prevstate,
                    current_page : prevstate.current_page+1
                }))
            }
        }
    }
    redner(){
        let d_length = this.state.table_1_entries.length
        const indexOfLastPost = this.state.current_page * this.state.entriesPerpage;
        const indexOfFirstPost = indexOfLastPost - this.state.entriesPerpage;
        const currentPosts = this.state.table_1_entries.slice(indexOfFirstPost, indexOfLastPost);
        const totalPages = Math.ceil( d_length / this.state.entriesPerpage);
        return(
            <div>Have to complete</div>
        )
    }
}