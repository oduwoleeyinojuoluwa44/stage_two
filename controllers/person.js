import Person from '../models/person.js';

class PersonController {
  /**
   * Retrieves all people from the database and sends them as a response.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  static async get(req, res) {
    const persons = await Person.find();
    if (!persons) {
      res.status(200).send({ message: 'The database is empty' });
    }
    res.status(200).send( persons );
  }

  /**
   * Retrieves a person by their ID from the database.
   *
   * @param {Object} request - The HTTP request object.
   * @param {Object} response - The HTTP response object.
   * @return {Promise} A promise that resolves to the retrieved person or sends an error response.
   */
  static async getById(request, response) {
    try {
    const { id } = request.params;
    const person = await Person.findById(id);

    if (!person) {
      response.status(404).send({ error: 'Person not found' });
      return;
    }

    response.status(200).send(person);
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' });
  }

  }
  

  /**
   * Creates a new person in the database.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Object} The HTTP response object with the created person or an error message.
   */
  static async create(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    const personExists = await Person.findOne({ name });
    if (personExists) {
      return res.status(400).send({ error: 'Person already exists' });
    }
    const newPerson = new Person({ name });
    await newPerson.save();
    return res.status(201).send(newPerson);
  }

  /**
   * Updates a person's name in the database.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<Object>} The updated person object and a success message.
   */
  static async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const person = await Person.findById(id);

      if (!person) {
        return res.status(404).send({ error: 'Person not found' });
      }

      if (!name) {
        return res.status(400).send({ error: 'Name is required' });
      }

      person.name = name;
      await person.save();

      return res.status(200).send(person);
    } catch (error) {
      return res.status(500).send({ error: 'Internal server error' });
    }
  }

  static async delete(req, res) {
    try {
    const { id } = req.params;
    const result = await Person.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Person not found' });
    }

    return res.status(204).send({});
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' });
  }
}
}

export default PersonController;
