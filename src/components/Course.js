import axios from 'axios'
import {Card,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Button,Container} from 'reactstrap'
import { toast } from 'react-toastify'
import { useState } from 'react'

export const Course = ({course,update,updateCourseData})=>{
    const [isEditing, setIsEditing] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({
    title: course.title,
    description: course.description,
  });
const deleteCourse=(id)=>{
    axios.delete(`http://localhost:5000/courses/${id}`)
    .then((response)=>{
     toast.success('course deleted')
     update(id)
    },
    (error)=>{
       toast.error('course not deleted !! server problem') 
    })
}
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleUpdate = (id) => {
    updateCourseData(id, updatedCourse);
    setIsEditing(false);
  };

    return(
        <Card  color='info' style={{marginBottom:12}}>
            <CardBody>
            {isEditing ? (
          <>
          <label><h4>Updated Course Name: </h4></label>
          <br></br>
            <input type="text" name="title" style={{fontSize:10}} value={updatedCourse.title}  onChange={handleInputChange} />
            <br></br>
            <label><h4>Update Course Description</h4></label><br></br>
            <textarea name="description" value={updatedCourse.description} onChange={handleInputChange} /><br></br>
            <Button style={{marginRight:5}}color="success" onClick={() => handleUpdate(course.id)}>
              Save
            </Button>
            <Button color="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
                <CardSubtitle style={{fontWeight:"bold"}}>
                    {course.title}
                </CardSubtitle>
                <CardText >
                   {course.description}
                </CardText>
                <Container>
                    <Button color="danger"
                    onClick={()=>{
                        deleteCourse(course.id)
                    }}>Delete</Button>
                    <Button color="warning" style={{marginLeft:5}}
                        onClick={() => setIsEditing(true)}>Update</Button>
                    
                </Container>
                </>
        )}
            </CardBody>
        </Card>
    )
}