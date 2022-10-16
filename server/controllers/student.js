import StudentData from "../models/student.js";

// stores all students data in allStudents
export const getStudents = async (req, res) => {
  try {
    const allStudents = await StudentData.find();

    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const student = req.body;

  const newStudent = new StudentData(student);

  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    await StudentData.findByIdAndRemove(id).exec();
    res.send("Successfully Deleted!");
  } catch (error) {
    console.log(error);
  }
};

export const getCurrStudent = async (req, res) => {
  const name = req.params.studentName;
  console.log(name);
  try {
    const grades = await StudentData.find({ studentName: name }).exec();
    if (grades.length == 0)
      res.status(404).json({ message: "Cannot find student Name" });
    else {
      res.status(200).json(grades);
      //sendToken(req, 200, grades);
      console.log(grades);
    }
  } catch (error) {
    console.log(error);
  }
};

const sendToken = (req, statusCode, res) => {
  const token = req.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    grades,
  });
};
