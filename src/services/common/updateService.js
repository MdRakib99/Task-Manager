const updateService = async (req, dataModel) => {
  try {
    let email = req.headers["email"];
    let status = req.params.status;
    let id = req.params.id;
    let postBody = { status: status };

    let data = await dataModel.updateOne({ _id: id, email: email }, postBody);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = updateService;
