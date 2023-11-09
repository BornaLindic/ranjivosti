import {pool} from './index';


async function getStudentData(name: string) {
    return await(pool.query(`select * from lab2.studenti where nameStudent = '${name}'`))
}



export {getStudentData}