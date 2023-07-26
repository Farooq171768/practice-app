import {useEffect, useState} from 'react'
import {Course} from './Course'
import axios from 'axios'
import base_url from '../api/bootapi'
import { toast } from 'react-toastify'

export const AllCourses=()=>{

  useEffect(()=>{
   document.title=`All Courses`
  },[])

  const [courses, setCourses] = useState([]);

  //function to call server
  const getAllCoursesFromServer=()=>{
    axios.get(`http://localhost:5000/courses`)
    .then(response=>{
      //console.log(response)
      console.log(response.data)
      toast.success('courses has been loaded',{
        position:'bottom-center'
      })
      setCourses(response.data)
    })
    .catch(error=>{
      //for error
      console.log(error)
      toast.error('something went wrong',{
        position:'bottom-center'
      })
    })
  }

  useEffect(()=>{
   getAllCoursesFromServer()
  },[])

    const updateCourses=(id )=>{
      setCourses(courses.filter((c)=>c.id!==id))
    }
    const updateCourseData = (id, updatedCourseData) => {
      axios
        .put(`http://localhost:5000/courses/${id}`, updatedCourseData)
        .then((response) => {
          toast.success('Course updated successfully', {
            position: 'bottom-center',
          });
  
            // Fetch the updated course list again from the server
        getAllCoursesFromServer();
      })
        .catch((error) => {
          console.log(error);
          toast.error('Something went wrong', {
            position: 'bottom-center',
          });
        });
    };
    return (
  <div>
    <h1>All Courses</h1>
    <p>List of Courses are as follows</p>
    {
        courses.length>0?courses.map(
            (item)=><Course key={item.id} course={item} update={updateCourses} updateCourseData={updateCourseData}/>
        ):"No Courses"
    }
  </div>

    )
}