import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getStudentById} from "./student-service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StudentDetail = () => {

    const {id} = useParams();
    const [student, setStudent] = useState({
        id: Number(id),
        code: '',
        fullName: '',
        gender: '',
        grade: '',
        score: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStudentById(Number(id));
                setStudent(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData().then();
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div className="col-8">
                <div key={student.id}>
                <h2 className="row-md">Profiles</h2>
                <dl className="row-md">

                    <dt><span>ID</span></dt>
                    <dd>{student.id}</dd>

                    <dt><span>Code</span></dt>
                    <dd>{student.code}</dd>

                    <dt><span>Full Name</span></dt>
                    <dd>{student.fullName}</dd>

                    <dt><span>Gender</span></dt>
                    <dd>{student.gender}</dd>

                    <dt><span>Grade</span></dt>
                    <dd>{student.grade}</dd>

                    <dt><span>Score</span></dt>
                    <dd>{student.score}</dd>

                </dl>

                <button type="submit" className="btn btn-info" onClick={() => window.history.back()}>
                    Back
                </button>
            </div>
        </div>
</div>
    )
}

export default StudentDetail;