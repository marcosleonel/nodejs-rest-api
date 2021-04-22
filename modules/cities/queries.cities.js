const CityModel = require('./model.cities');

class CitiesQuery {
  constructor(name = '', state = '') {
    this.name = name;
    this.state = state;
  }

  /**
   * Cria um novo registro na tabela de cidades
   * @returns {Object}
   */
  async create() {
    const newCity = CityModel.build({ name: this.name, state: this.state });
    await newCity.save();

    return newCity;
  }

  /**
   * Busca o registro de uma cidade pelo nome configurado.
   * @returns {Array}
   */
  async findByName() {
    const cities = await CityModel.findOne({
      where: {
        name: this.name,
      },
    });

    return cities;
  }

  /**
   * Filtra por estado a lista de cidades.
   * @returns {Array}
   */
  async findByState() {
    const cities = await CityModel.findAll({
      where: {
        state: this.state,
      },
    });

    return cities;
  }
}

module.exports = CitiesQuery;
