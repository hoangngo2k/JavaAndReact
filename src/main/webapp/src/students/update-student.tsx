import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getStudentById, saveStudent, updateStudent} from "./student-service";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const UpdateStudent = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        id: Number(id),
        code: '',
        fullName: '',
        gender: '',
        grade: '',
        score: 0,
    });

    useEffect(() => {
        if (!isNaN(student.id)) {
            const fetchData = async () => {
                try {
                    const res = await getStudentById(student.id);
                    setStudent(res.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData().then();
        }
    }, [])

    function onInputStudent(e: ChangeEvent) {
        // @ts-ignore
        setStudent({...student, [e.target.name]: e.target.value})
    }

    const save = () => {
        if (isNaN(student.id)) {
            saveStudent(student)
                .then(value => {
                    navigate('/students');
                })
                .catch(reason => console.log(reason))
        } else {
            updateStudent(student, Number(id))
                .then(value => navigate("/students"))
                .catch(error => console.log(error));
        }
    }

    return (
        <div className="m-4">
            <div className="mt-2">
                <h1>Student</h1>
            </div>
            <form onSubmit={save}>
                <div className="mb-3 mt-3" hidden={!id}>
                    <label htmlFor="id" className="form-label">ID:</label>
                    <input
                        type="text" className="form-control" id="id" name="id"
                        onChange={(e) => onInputStudent(e)}
                        value={student.id} disabled={true}/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="code" className="form-label">Code:</label>
                    <input
                        type="text" className="form-control" id="code" placeholder="Enter code" name="code"
                        onChange={(e) => onInputStudent(e)} value={student.code}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name:</label>
                    <input
                        type="text" className="form-control" id="fullName"
                        placeholder="Enter full name" name="fullName"
                        onChange={(e) => onInputStudent(e)} value={student.fullName}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender:</label>
                    <input
                        type="text" className="form-control" id="gender" placeholder="Enter gender"
                        name="gender" onChange={(e) => onInputStudent(e)} value={student.gender}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="grade" className="form-label">Grade:</label>
                    <input
                        type="text" className="form-control" id="grade" placeholder="Enter grade" name="grade"
                        onChange={(e) => onInputStudent(e)} value={student.grade}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="score" className="form-label">Score:</label>
                    <input
                        type="text" className="form-control" id="score" placeholder="Enter score" name="score"
                        onChange={(e) => onInputStudent(e)} value={student.score}
                    />
                </div>
                <button type="submit" className="btn btn-primary m-1">Submit</button>
                <button className="btn btn-danger m-1" onClick={() => navigate("/students")}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateStudent;