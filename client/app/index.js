import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      test: ""
    }
  }

  

  render(){
    console.log("TEST RENDER ");
    return (
      <form >
        <div>
          <label htmlFor="note">Note</label>
          <textarea name="note" id="note" cols="30" rows="10" value={}></textarea>
        </div>
        <div>
          <label htmlFor="">Enable notification</label>
          <input type="radio" name="notification" value="yes" value={}/>
          <input type="radio" name="notification" value="no" valu={}/>
        </div>
        <input type="submit" onsubmit={this.}/>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));