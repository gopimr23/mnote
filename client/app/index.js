import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      note: "",
      isNotify : false,
      notes: [],
      mnote:""
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

  saveKafkaNote(event){
    console.log("save kafka * ", event.target);
    this.setState({mnote: event.target.value});
  }
  saveNewNote(event){
    event.preventDefault();
    let newNote = {
      note: this.state.note,
      isNotify: this.state.isNotify
    };

    this.state.notes.push(newNote);
    axios.post("/notes", newNote)
      .then((response)=>{
        console.log("New note saved", newNote);
        this.setState({notes: this.state.notes});
        this.setState({note : ""})
        this.setState({isNotify : ""})
      })
      .catch((error)=>{
        console.log("ERROR ", error)
      });
  }
  saveNewKafkaNote(event){
    event.preventDefault();
    axios.post("/notes/kafka", {message: this.state.mnote})
      .then((response)=>{
        console.log("New note saved", newNote);
        this.setState({notes: this.state.notes});
        this.setState({note : ""})
        this.setState({isNotify : ""})
      })
      .catch((error)=>{
        console.log("ERROR ", error)
      });
  }

  render(){
    console.log("TEST RENDER ");
    return (
      <div>
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
      <div>
         <form  onSubmit={this.saveNewKafkaNote.bind(this)}>
          <div>
            <label htmlFor="mnote">Note</label>
            <textarea name="mnote" id="mnote" cols="30" rows="10" value={this.state.mnote} onChange={this.saveKafkaNote.bind(this)}></textarea>
          </div>
          
          <input type="submit" value="Save"/>
        </form>
      </div>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));