import React from "react";
import { variables } from "../../../Library/API_URLS";
import { API_CALL_HEADER_POST } from "../../../Library/API_Call_Headers";
import HeaderComponent from "../../HelperComponents/ComponentHeaders";

class CreateContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {component: 'Create Contact'}
    }

    render(){
        return(
            <div className={this.state.component}>
                <HeaderComponent component={this.state.component}/>
                <div className="component-body">
                    <div className="row">
                        <div className="col">
                            <div className="center">
                                <h2 className="green"></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateContact