import axios from "axios";
import {IStudent} from "./Student";

const STUDENT_BASE_URL = 'http://localhost:8080/api/';

export const getAll = (page: number, size: number, field: string, predicate: boolean, name?: string, min?: number, max?: number) => {
    let isSorted = predicate ? 'asc' : 'desc';
    let paging = '';
    if (name == null || name == '')
        paging = "students?page=" + page + '&size=' + size + '&sort=' + field + ',' + isSorted + '&min=' + min + '&max=' + max;
    else
        paging = "students?page=" + page + '&size=' + size + '&sort=' + field + ',' + isSorted + '&search=' + name + '&min=' + min + '&max=' + max;
    return axios.get(STUDENT_BASE_URL + paging);
}

export const getStudentById = (id: number | null) => {
    return axios.get(STUDENT_BASE_URL + 'students/' + id);
}

export const saveStudent = (student: IStudent) => {
    return axios.post(STUDENT_BASE_URL + 'student', student);
}

export const updateStudent = (student: IStudent, id: number) => {
    return axios.put(STUDENT_BASE_URL + 'student/' + id, student);
}

export const deleteStudent = (ids: number[]) => {
    return axios.delete(STUDENT_BASE_URL + 'students/' + ids);
}