import Activity from "../models/activity.js";
import User from "../models/user.js";
import Project from "../models/project.js";
import asyncHandler from "express-async-handler";
import dayjs from "dayjs";
import mongoose from "mongoose";

// @desc    Generate Report
// @route   GET /report
// @access  Private

const generateReport = asyncHandler(async (req, res) => {
  try {
    let { clientId, projectId, userId, dateOne, dateTwo } = req.body;

    if (!dateOne) dateOne = dayjs(-1).format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;

    const activity = await Activity.aggregate([
      {
        $match: {
          $and: [
            { project: { $eq: mongoose.Types.ObjectId(projectId) } },
            { client: { $eq: mongoose.Types.ObjectId(clientId) } },
            { employee: { $eq: user._id } },
            { activityOn: { $gte: dateOne, $lte: dateTwo } },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    res.json({
      status: "ok",
      data: activity,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Generate Report
// @route   GET /report/project
// @access  Private

const generateReportProject = asyncHandler(async (req, res) => {
  try {
    let { projectId, userId, dateOne, dateTwo } = req.body;

    if (!dateOne) dateOne = dayjs(-1).format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;

    const activity = await Activity.aggregate([
      {
        $match: {
          $and: [
            { project: { $eq: mongoose.Types.ObjectId(projectId) } },
            { employee: { $eq: user._id } },
            { activityOn: { $gte: dateOne, $lte: dateTwo } },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    res.json({
      status: "ok",
      data: activity,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Generate Report
// @route   GET /report/client
// @access  Private

const generateReportClient = asyncHandler(async (req, res) => {
  try {
    let { clientId, userId, dateOne, dateTwo } = req.body;

    if (!dateOne) dateOne = dayjs(-1).format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;

    const activity = await Activity.aggregate([
      {
        $match: {
          $and: [
            { client: { $eq: mongoose.Types.ObjectId(clientId) } },
            { employee: { $eq: user._id } },
            { activityOn: { $gte: dateOne, $lte: dateTwo } },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    res.json({
      status: "ok",
      data: activity,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Generate Report
// @route   GET /report/user
// @access  Private

const generateReportByUser = asyncHandler(async (req, res) => {
  try {
    let { userId, dateOne, dateTwo } = req.body;

    if (!dateOne) dateOne = dayjs(-1).format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    console.log(dateOne, dateTwo);
    let responseArray = [];

    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;

    for (let i = 0; i < user.projects.length; i++) {
      const project = await Project.findById(user.projects[i]).populate(
        "client"
      );

      const activity = await Activity.aggregate([
        {
          $match: {
            $and: [
              { project: { $eq: user.projects[i] } },
              { employee: { $eq: user._id } },
              { activityOn: { $gte: dateOne, $lte: dateTwo } },
            ],
          },
        },
        {
          $group: {
            _id: user.projects[i],
            totalHours: { $sum: "$consumeTime" },
            avgPerformanceData: { $avg: "$performanceData" },
            docCount: { $sum: 1 },
          },
        },
      ]);
      const projectName = project.name;
      const clientName = project.client.name;
      const clientId = project.client._id;
      responseArray.push({ clientId, clientName, projectName, ...activity[0] });
    }

    res.json({
      status: "ok",
      data: responseArray,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Generate Report
// @route   GET /report/:id
// @access  Private

const generateReportByProjectId = asyncHandler(async (req, res) => {
  try {
    let { dateOne, dateTwo } = req.body;
    let projectId = req.params.id;

    if (!dateOne) dateOne = dayjs(-1).format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    let responseArray = [];

    const project = await Project.findById(projectId).populate([
      {
        path: "client",
        select: ["name"],
      },
      {
        path: "employees",
        select: ["firstName", "lastName"],
      },
    ]);

    for (let i = 0; i < project.employees.length; i++) {
      const activity = await Activity.aggregate([
        {
          $match: {
            $and: [
              { project: { $eq: mongoose.Types.ObjectId(projectId) } },
              { employee: { $eq: project.employees[i]._id } },
              { activityOn: { $gte: dateOne, $lte: dateTwo } },
            ],
          },
        },
        {
          $group: {
            _id: project.employees[i]._id,
            totalHours: { $sum: "$consumeTime" },
            avgPerformanceData: { $avg: "$performanceData" },
            docCount: { $sum: 1 },
          },
        },
      ]);

      const employeeName = project.employees[i];

      if (activity.length > 0) {
        responseArray.push({
          firstName: employeeName.firstName,
          lastName: employeeName.lastName,
          ...activity[0],
        });
      }
    }

    res.json({
      status: "ok",
      clientName: project.client.name,
      projectName: project.name,
      data: responseArray,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  generateReport,
  generateReportProject,
  generateReportClient,
  generateReportByUser,
  generateReportByProjectId,
};
