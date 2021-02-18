import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import CourseItem from '../../CourseItem/CourseItem';


class CourseList extends React.Component{  
    static propTypes = {
        courses: PropTypes.array,
        tableStatus: PropTypes.func,
        tableId: PropTypes.string,
        getCourses: PropTypes.object,
        getOrderCol: PropTypes.object
    }

    render(){
        const { courses } = this.props;
        const courseList = courses.map(course => {
            return (
                <CourseItem key={shortid.generate()} course={course} tableStatus={this.props.tableStatus.bind(this)} className="list-group-item"/>                
            );
        });

        return (
            <div key={shortid.generate()}>
                {courseList}
            </div>
        );

    }
}

export default CourseList;