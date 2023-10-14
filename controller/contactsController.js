const data = require("../model/data.json");

//Database(just like)
const contacts = {
  contactsList: data.contacts,
  setContacts: function (contacts) {
    this.contactsList = contacts;
  },
};

const getAllContacts = (req, res) => {
  res.send(contacts.contactsList);
};

const getContact = (req, res) => {
  const requestedContact = contacts.contactsList.find(
    (contact) => contact.id === Number(req.params.id)
  );
  if (requestedContact) {
    res.send(requestedContact);
  } else {
    res.status(400);
    res.send({
      message: `There is no contact by given id(${req.params.id})`,
    });
  }
};

const addContact = (req, res) => {
  const id = contacts.contactsList?.length
    ? contacts.contactsList[contacts.contactsList.length - 1].id + 1
    : 1;
  const newContact = {
    id,
    name: req.body.name,
    mobileNo: req.body.mobileNo,
    email: req.body.email,
    instaId: req.body.instaId,
    profession: req.body.profession,
    address: req.body.address,
  };
  contacts.setContacts([...contacts.contactsList, newContact]);
  res.status(201);
  res.send(contacts.contactsList);
};

const updateContact = (req, res) => {
  const requestedContact = contacts.contactsList.find(
    (contact) => contact.id === Number(req.params.id)
  );
  if (requestedContact) {
    const updatedContact = {
      id: Number(req.params.id),
      name: req.body.name,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
      instaId: req.body.instaId,
      profession: req.body.profession,
      address: req.body.address,
    };
    const filteredContacts = contacts.contactsList.filter(
      (contact) => contact.id !== Number(req.params.id)
    );
    contacts.setContacts([...filteredContacts, updatedContact]);
    contacts.contactsList.sort((a, b) => a.id - b.id);
    res.send(contacts.contactsList);
  } else {
    res.status(400);
    res.send({
      message: `There is no contact to update by given id(${req.params.id})`,
    });
  }
};

const deleteContact = (req, res) => {
  const requestedContact = contacts.contactsList.find(
    (contact) => contact.id === Number(req.params.id)
  );
  if (requestedContact) {
    const filteredContacts = contacts.contactsList.filter(
      (contact) => contact.id !== Number(req.params.id)
    );
    contacts.setContacts(filteredContacts);
    res.send(contacts.contactsList);
  } else {
    res.status(400);
    res.send({
      message: `There is no contact to delete by given id(${req.params.id})`,
    });
  }
};

module.exports = {
  getAllContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
};
