import {Route} from "react-router-dom";
import UserForm from "../components/UserFormComponents/UserForm";
import OrgForm from "../pages/OrgForm";
import React from "react";

function RouterConfig(props) {
    return <div className="content">
        <Route exact path="/" render={props.render}/>
        <Route path="/user" component={UserForm}/>
        <Route path='/testing' component={OrgForm}/>
        <Route path='/usertesting' render={props.render1}/>

    </div>;
}
export {RouterConfig}