import React from 'react'
import { Card, CardBody } from 'reactstrap'

export const Header = () => {
    return (
       <Card className='my-2 bg-warning'>
        <CardBody>
            <h1 className='text-center my-3'>Welcome to Course Application</h1>
        </CardBody>
       </Card>
    )
}
