import React from 'react';

export class Main extends React.Component{
    render(){
        return (<div>  
          
           {React.cloneElement(this.props.children,this.props)}
                </div>
        );
    }
}