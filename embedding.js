const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: [authorSchema]
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  const course = await Course.update({_id: courseId},{
    $set: {
      'author.name': 'Jhone Smith'
    }
  });
  // or
  // const course = await Course.findById(courseId);
  // course.author.name = 'Mosh Hamedani';
  // course.save();
}

// updateAuthor('63c5b26a15add5d2f119a35d')

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.author.push(author);
  course.save();
}

// addAuthor('63c5b5b578541c5c0f7d03c5', new Author({ name: 'Emmy' }))

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.author.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('63c5b5b578541c5c0f7d03c5', '63c5b6d30acf24c6673ae461')

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Jhon' })
// ]);
