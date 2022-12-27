import {Route, Routes} from "react-router-dom";
import StudentList from "./student-list";
import UpdateStudent from "./update-student";
import StudentDetail from "./student-detail";

const StudentRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<StudentList />}/>
                <Route path={'/new'} element={<UpdateStudent/>}/>
                <Route path={'/edit/:id'} element={<UpdateStudent/>}/>
                <Route path={'/detail/:id'} element={<StudentDetail/>}/>
            </Routes>
        </>
    )
}

export default StudentRoutes;