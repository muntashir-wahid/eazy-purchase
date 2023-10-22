const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOne = (Model, docName) => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        [docName]: newDoc,
      },
    });
  });
};

exports.getAll = (Model, docName, populateOptions) => {
  return catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .search()
      .project()
      .paginate();

    let docs;

    if (populateOptions) {
      docs = await features.query.populate(populateOptions);
    } else {
      docs = await features.query;
    }

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        [docName]: docs,
      },
    });
  });
};

exports.getOne = (Model, docName, populateOptions) => {
  return catchAsync(async (req, res, next) => {
    let doc;

    if (populateOptions) {
      doc = await Model.findById(req.params.id).populate(populateOptions);
    } else {
      doc = await Model.findById(req.params.id);
    }

    // Guard clause for not found document
    if (!doc) {
      return next(
        new AppError(`Can't find ${docName} with Id:${req.params.id}.`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        [docName]: doc,
      },
    });
  });
};

exports.updateOne = (Model, docName) => {
  return catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Guard clause for not found document
    if (!updatedDoc) {
      return next(
        new AppError(`Can't find ${docName} with Id:${req.params.id}.`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        [docName]: updatedDoc,
      },
    });
  });
};

exports.deleteOne = (Model, docName) => {
  return catchAsync(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);

    // Guard clause for not found document
    if (!deletedDoc) {
      return next(
        new AppError(`Can't find ${docName} with Id:${req.params.id}.`, 404)
      );
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
