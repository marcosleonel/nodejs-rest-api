const CustomerModel = require('./model.customers');

class CustomerQueries {
  constructor(fullName = '', gender = '', birthdate = '', age = '', city = '') {
    this.id = '';
    this.fullName = fullName;
    this.gender = gender;
    this.birthdate = birthdate;
    this.age = age;
    this.city = city;
  }

  setId(id) {
    this.id = id;
  }

  async create() {
    const newCustomer = CustomerModel.build({
      fullName: this.fullName,
      gender: this.gender,
      birthdate: this.birthdate,
      age: this.age,
      city: this.city,
    });
    await newCustomer.save();

    return newCustomer;
  }

  async update() {
    const city = {
      fullName: this.fullName,
      gender: this.gender,
      birthdate: this.birthdate,
      age: this.age,
      city: this.city,
    };
    const updated = await CustomerModel.update(city, {
      where: {
        id: this.id,
      },
    });

    return updated;
  }

  async delete() {
    const deleted = await CustomerModel.destroy({
      where: {
        id: this.id,
      },
    });

    return deleted;
  }

  async findById() {
    const customers = await CustomerModel.findAll({
      where: {
        id: this.id,
      },
    });

    return customers;
  }

  async findByName() {
    const customer = await CustomerModel.findAll({
      where: {
        fullName: this.fullName,
      },
    });

    return customer;
  }
}

module.exports = CustomerQueries;
