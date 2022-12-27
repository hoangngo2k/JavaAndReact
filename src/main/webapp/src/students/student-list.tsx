import React, {createRef, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteStudent, getAll} from "./student-service";
import {IStudent} from "./Student";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2';
import {Modal, ModalBody, ModalDialog, ModalFooter, ModalTitle} from "react-bootstrap";

const StudentList = () => {

    const navigate = useNavigate();
    const [students, setStudents] = useState<IStudent[]>([{
        id: 0,
        code: 'a',
        fullName: 'a',
        gender: 'a',
        grade: 'a',
        score: 0,
    }]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [page, setPage] = useState(0);
    const [field, setField] = useState("id");
    const [name, setName] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [isOpen, setOpen] = useState(false);
    const [predicate, setPredicate] = useState(true);

    let ids: number[] = [];
    const size = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAll(page, size, field, predicate, name, min, max);
                setStudents(res.data.content);
                setTotalStudents(res.data.totalElements);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData().then();
    },[predicate]);

    const handlePageChange = (event: { selected: number }) => {
        getAll(event.selected, size, field, predicate, name, min, max)
            .then(res => {
                setStudents(res.data.content)
                setTotalStudents(res.data.totalElements);
                setPage(event.selected);
            });
    }

    const getFieldName = (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
        setPredicate(!predicate);
        // @ts-ignore
        const fieldInput = event.target.innerText.split(' ');
        if (fieldInput.length > 1) {
            for (let i = 1; i < fieldInput.length; i++) {
                setField(fieldInput[0].toLowerCase() + fieldInput[i]);
            }
        } else {
            setField(fieldInput[0].toLowerCase());
        }
        getAll(page, size, field, predicate, name, min, max)
            .then(res => {
                setStudents(res.data.content);
                setTotalStudents(res.data.totalElements);
            });
    }

    const searchByStudentName = () => {
        getAll(page, size, field, predicate, name, min, max)
            .then(res => {
                setStudents(res.data.content);
                setTotalStudents(res.data.totalElements);
            });
    }

    const selectedStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            // @ts-ignore
            ids.push(event.target.defaultValue);
        } else {
            // @ts-ignore
            ids = ids.filter(id => id != event.target.defaultValue);
        }
    }

    const deleteStudents = () => {
        if (ids.length != 0) {
            Swal.fire({
                title: 'Delete id [' + ids + ']?',
                icon: 'question',
                showCancelButton: true,
                focusCancel: true,
                showConfirmButton: true
            }).then(value => {
                if (value.isConfirmed) {
                    Swal.fire({
                        title: 'Delete success',
                        icon: 'success',
                    }).then(() => {
                        deleteStudent(ids)
                            .then(res => {
                                getAll(page, size, field, predicate, name, min, max)
                                    .then(data => {
                                        setStudents(data.data.content)
                                        setTotalStudents(data.data.totalElements);
                                    });
                            })
                        ids = [];
                    })
                }
            })
        } else {
            Swal.fire({
                title: 'You must chose the least one ID',
                icon: 'warning'
            }).then()
        }
    }

    const openModal = () => {
        setOpen(true);
    }

    const resetValueFilter = () => {
        getAll(page, size, field, predicate, name, 0, 0).then(res => {
            setMin(0);
            setMax(0);
            setStudents(res.data.content);
            setTotalStudents(res.data.totalElements);
        })
        setOpen(false);
    }

    const filterMinIDAndMaxID = () => {
        getAll(page, size, field, predicate, name, min, max)
            .then(res => {
                setStudents(res.data.content);
                setTotalStudents(res.data.totalElements);
            });
        setOpen(false);
    }

    return (
        <div>
            <h2>
                <span id="student-header" className={"m-2 mt-3"}>Student Management</span>
            </h2>
            <div className="w-100 position-relative">
                <button className="btn btn-primary jh-create-entity m-1" onClick={() => navigate("/students/new")}>
                    <span>Create a new student</span>
                </button>
                <button className="btn btn-danger justify-end m-1" onClick={deleteStudents}>
                    <span className="d-none d-md-inline">Delete</span>
                </button>
                <div className="d-inline-block" style={{position: "absolute", right: 0}}>
                    <input type="text" className={"input"} placeholder={"Name..."}
                           onChange={(event) => setName(event.target.value)}/>
                    <button type="button" className={"btn btn-info m-1"} onClick={searchByStudentName}>Search</button>
                    <button className="btn btn-info d-inline-block m-1" onClick={() => window.location.reload()}>
                        <span>Refresh</span>
                    </button>
                    <button type="button" className="btn btn-primary m-1" onClick={openModal}><span>Filter</span>
                    </button>
                </div>
            </div>
            <div className="table-responsive m-2">
                <table className="table table-striped" aria-describedby="user-management-page-heading">
                    <thead>
                    <tr>
                        <th scope="col" className={"search-field"} onClick={(event) => getFieldName(event)}>ID</th>
                        <th scope="col" className={"search-field"} onClick={(event) => getFieldName(event)}>Code</th>
                        <th scope="col" className={"search-field"} onClick={(event) => getFieldName(event)}>Full Name
                        </th>
                        <th scope="col" className={"search-field"} onClick={(event) => getFieldName(event)}>Gender</th>
                        <th scope="col" className={"search-field"} onClick={(event) => getFieldName(event)}>Grade</th>
                        <th scope="col" className={"search-field"} onClick={(event) => getFieldName(event)}>Score</th>
                        <th>Delete</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(value => (
                        <tr key={value.id}>
                            <td>
                                <a onClick={() => navigate("/students/detail/" + value.id)}>{value.id}</a>
                            </td>
                            <td>{value.code}</td>
                            <td>{value.fullName}</td>
                            <td>{value.gender}</td>
                            <td>{value.grade}</td>
                            <td>{value.score}</td>
                            <td>
                                <input type="checkbox" defaultValue={value.id}
                                       onChange={(event) => selectedStudents(event)}/>
                            </td>
                            <td className="text-start">
                                <div className="btn-group">
                                    <button type="submit" className="btn btn-info btn-sm"
                                            onClick={() => navigate("/students/detail/" + value.id)}>
                                        <span className="d-none d-md-inline">View</span>
                                    </button>

                                    <button type="submit" className="btn btn-primary btn-sm ms-1"
                                            onClick={() => navigate("/students/edit/" + value.id)}>
                                        <span className="d-none d-md-inline">Edit</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <ReactPaginate
                    nextLabel="next >"
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={Math.ceil(totalStudents / 5)}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={() => {
                    }}
                    onPageChange={(event) => handlePageChange(event)}/>
            </div>
            <Modal
                show={isOpen}
                autoFocus={true}
                onHide={() => setOpen(false)}
            >
                <ModalTitle><span className={"m-2"}>Delete</span></ModalTitle>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col">
                                <input
                                    type={"number"}
                                    className={"form-control"}
                                    placeholder={"Enter a min number"}
                                    defaultValue={min}
                                    onChange={event => setMin(Number(event.target.value))}
                                />
                            </div>
                            <div className={"col"}>
                                <input
                                    type={"number"}
                                    className={"form-control"}
                                    placeholder={"Enter a max number"}
                                    defaultValue={max}
                                    onChange={event => setMax(Number(event.target.value))}
                                    required={true}
                                />
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className={"btn btn-light"} onClick={resetValueFilter}>Reset Value</button>
                    <button type={"button"} className={"btn btn-info"} onClick={filterMinIDAndMaxID}>Save</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default StudentList;