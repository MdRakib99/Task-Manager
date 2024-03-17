const deleteService = async (req, model) => {
  try {
    let deleteID = req.params.id;
    let email = req.headers["email"];

    let queryObject = {};

    queryObject["_id"] = deleteID;
    queryObject["email"] = email;

    let data = await model.deleteOne(queryObject);

    return { status: "success", delete: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = deleteService;
