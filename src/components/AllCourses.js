import {useEffect, useState} from 'react'
import {Course} from './Course'
import axios from 'axios'
import base_url from '../api/bootapi'
import { toast } from 'react-toastify'

export const AllCourses=()=>{

  useEffect(()=>{
   document.title=`All Courses`
  },[])
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

    const [courses,setCourses]= useState([
        // {title:"Java Course",description:"This is demo course"},
        // {title:"Django Course",description:"This is demo course"},
        // {title:"ReactJs Course",description:"This is demo course"},
        // {title:"Angular Course",description:"This is demo course"},

    ])
    const updateCourses=(id)=>{
      setCourses(courses.filter((c)=>c.id!==id))
    }
    return (
  <div>
    <h1>All Courses</h1>
    <p>List of Courses are as follows</p>
    {
        courses.length>0?courses.map(
            (item)=><Course key={item.id} course={item} update={updateCourses}/>
        ):"No Courses"
    }
  </div>

    )
}