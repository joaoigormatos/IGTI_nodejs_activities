const { readFile, writeFile } = require("fs").promises
const path = require("path")

const findIndex = (id, grades) => {
  const index = grades.findIndex(grade => grade.id === parseInt(id));

  if (index === undefined || oldIndex < 0) throw Error(`the grade with id ${id} has not found`)
  return index;
}
const findGrade = (id, grades) => {
  const grade = grades.find(grade => grade.id === parseInt(id));

  if (grade === undefined) throw Error(`the grade with id ${id} has not found`)
  return grade;
}

const addGrade = async (req, res) => {
  const createGrade = (nextId, { student, subject, type, value }) => {
    return {
      id: nextId + 1,
      student,
      subject,
      type,
      value,
      timestamp: new Date().toISOString()
    }
  }

  try {
    const studentData = req.body
    const data = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), 'utf-8'))
    const { nextId } = data
    const newStudent = createGrade(nextId, studentData)
    data.grades.push(newStudent)
    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify({ nextId: nextId + 1, grades: data.grades }))
    return res.status(200).json({ message: "Student added successfully", data: newStudent })
  }
  catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const updateGrade = async (req, res) => {
  try {
    const { id, subject, student, type, value } = req.body
    const { nextId, grades } = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), 'utf-8'))

    const oldIndex = findIndex(id, grades)

    grades[oldIndex] = {
      id: oldIndex,
      subject: subject,
      student: student,
      type: type,
      value: value,
      timestamp: new Date().toISOString()
    }
    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify({ nextId, grades }))

    return res.json({ message: `The grade with id ${id} has been updated` })
  }
  catch (err) {
    return res.status(400).json({ message: err.message })
  }
}



const deleteGrade = async (req, res) => {
  try {
    const { id } = req.params
    const { nextId, grades } = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), 'utf-8'))
    const oldIndex = findIndex(id, grades)
    const updatedGrades = grades.filter(item => item.id !== parseInt(id))
    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify({ nextId, grades: updatedGrades }))

    return res.json({ message: `The grade with id ${id} has been deleted` })
  }
  catch (err) {
    return res.status(400).json({ message: err.message })
  }
}


const getGrade = async (req, res) => {
  try {
    const { id } = req.params
    const { grades } = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), 'utf-8'))
    const grade = findGrade(id, grades)
    return res.json({ message: `The grade with id ${id} has been found`, data: grade })
  }
  catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
const getStudentScore = async (req, res) => {
  try {
    const { student, subject } = req.query
    const { grades } = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), 'utf-8'))

    const studentGradeValues = grades.filter(item => item.student === student && item.subject === subject)
      .map(item => item.value)
    if (!studentGradeValues) throw Error("Either the subject or student provided was not found")
    const totalValue = studentGradeValues.reduce((acc, value) => acc + value, 0)
    return res.json({ message: `The total grade sum  from the student ${student} of subject ${subject} `, data: totalValue })
  }
  catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
const getMediaGrades = async (req, res) => {
  try {
    const { subject, type } = req.query
    const { grades } = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), 'utf-8'))

    const studentGradeValues = grades.filter(item => item.type === type && item.subject === subject)
      .map(item => item.value)
    if (!studentGradeValues) throw Error("Either the subject or student provided was not found")
    const totalValue = studentGradeValues.reduce((acc, value) => acc + value, 0)

    const media = totalValue / studentGradeValues.length
    return res.json({ message: `The media  from the subjects ${subject} of type ${type} `, data: media })
  }
  catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const getBestGrades = async (req, res) => {
  try {
    const { subject, type } = req.query
    const { grades } = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), 'utf-8'))

    const studentGradeValues = grades.filter(item => item.type === type && item.subject === subject)
      .sort((item, item2) => {
        return item2.value - item.value
      })
      .slice(0, 3)
    if (!studentGradeValues) throw Error("Either the subject or student provided was not found")


    return res.json({ message: `The best 3 grades  from the subjects ${subject} of type ${type} `, data: studentGradeValues })
  }
  catch (err) {
    return res.status(400).json({ message: err.message })
  }
}




module.exports = {
  addGrade,
  updateGrade,
  deleteGrade,
  getGrade,
  getStudentScore,
  getMediaGrades,
  getBestGrades
}