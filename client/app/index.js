import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      note: "",
      isNotify : false,
      notes: []
    }
  }

  saveNote (event){
    console.log("SAVE NOTE --------- ", event.target);
    this.setState({note: event.target.value});
  }

  saveNotify (event){
    console.log("save notify * ", event.target);
    this.setState({isNotify: event.target.value});
  }

  saveNewNote(event){
    event.preventDefault();
    let newNote = {
      note: this.state.note,
      isNotify: this.state.isNotify
    };

    this.state.notes.push(newNote);
    console.log("New note", newNote);
    this.setState({notes: this.state.notes});
    this.setState({note : ""})
    this.setState({isNotify : ""})
  }

  render(){
    console.log("TEST RENDER ");
    return (
      <form  onSubmit={this.saveNewNote.bind(this)}>
        <div>
          <label htmlFor="note">Note</label>
          <textarea name="note" id="note" cols="30" rows="10" value={this.state.note} onChange={this.saveNote.bind(this)}></textarea>
        </div>
        <div>
          <label htmlFor="">Enable notification</label>
          <label htmlFor="yes">
            <input type="radio" id="yes" name="notification" value="yes" checked={this.state.isNotify === "yes"} onChange={this.saveNotify.bind(this)}/>Yes
          </label>
          <label htmlFor="no">
            <input type="radio" id="no" name="notification" value="no" checked={this.state.isNotify==="no"}  onChange={this.saveNotify.bind(this)}/>No
          </label>
        </div>
        <input type="submit" value="Save"/>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));