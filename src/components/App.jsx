import { GlobalStyle } from 'GlobalStyle';
import { Layout } from './Layout/Layout.styled';
import { Component } from 'react';
import { ContactsForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export class App extends Component{

  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
    const savedContact = localStorage.getItem('contacts');
    if (savedContact !== null) {
      const parsedContact = JSON.parse(savedContact);
      this.setState({ contacts: parsedContact });
      return;
    }
    this.setState({ contacts: [] });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    if(this.state.contacts.find(contact => contact.name === newContact.name)){
      return alert(`${newContact.name} is already in contacts!`)
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  handleChange = evt => {
    this.setState({ filter: evt.target.value });
  };
  
  filterContact = (contactsArr) => {
    return contactsArr.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  }

  deleteContacts = name => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.name !== name),
      };
    });
  }
  
  render(){
    const { filter: filterValue } = this.state;
     return (
      <Layout>
        <h1>Phone book</h1>
        <ContactsForm onSave={this.addContact} contacts={this.state.contacts}></ContactsForm>
        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} value={filterValue}/> 
        <ContactsList contactsList={this.filterContact(this.state.contacts)} onClickDelete={this.deleteContacts}/>
        <GlobalStyle/>
      </Layout>
    );
  }
};
