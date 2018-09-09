import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class SingleUserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || '',
      email: props.email || '',
      access: props.access || '',
      balanceHours: props.balanceHours || '',
      qualifierHours: props.qualifierHours || '',
      phone: props.phone || ''
    };

    this.onChangeItem = this.onChangeItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeItem(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, access, phone, balanceHours, qualifierHours, checkedIn } = this.state;
    const { id, history } = this.props;
    //We're editing
    if (id) {
      axios.put(`/api/user/${id}`, {
          email: email,
          phone: phone,
          access: access,
          balanceHours: balanceHours,
          qualifierHours: qualifierHours,
          checkedIn: checkedIn
      }).then(() => {
        this.props.updateState(email, access); // access was formerly is_done and evaluted to string 'true'
        this.props.toggleEdit();
      });
    } else {
      //we're not
      axios.post('/api/user', { email: email, balanceHours: balanceHours, access: access, qualifierHours: qualifierHours, phone: phone }).then(() => {
        history.push('/')
      });
    }
  }

  render() {
    const { access, email, phone, balanceHours, qualifierHours, checkedIn } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Here</label>
          <input name="email" type="text" className="form-control" id="email" value={email}
                 onChange={this.onChangeItem}/>
        </div>

        <div className="form-group">
          <label htmlFor="title">Balance Hours</label>
          <input name="balanceHours" type="text" className="form-control" id="balanceHours" value={balanceHours}
                 onChange={this.onChangeItem}/>
        </div>

        <div className="form-group">
          <label htmlFor="title">Qualifier Hours</label>
          <input name="qualifierHours" type="text" className="form-control" id="qualifierHours" value={qualifierHours}
                 onChange={this.onChangeItem}/>
        </div>

        <div className="form-group">
          <label htmlFor="title">Phone</label>
          <input name="phone" type="text" className="form-control" id="phone" value={phone}
                 onChange={this.onChangeItem}/>
        </div>

        <div className="form-group">
          <label htmlFor="checkedIn">CheckIn Status:</label>
          <select name="checkedIn" className="form-control" id="checkedIn" value={checkedIn}
                  onChange={this.onChangeItem}>
            <option value="true">Checked In</option>
            <option value="false">Checked Out</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="access">Club Access Type</label>
          <select name="access" className="form-control" id="access" value={access}
                  onChange={this.onChangeItem}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="daily">Walk In</option>
          </select>
        </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button type="submit" className="btn btn-primary">Submit New User</button>
            <button type="buttom" className="btn btn-danger" onClick={this.props.toggleEdit}>Cancel</button>
          </div>
      </form>
    );
  }
}

export default withRouter(SingleUserEdit);