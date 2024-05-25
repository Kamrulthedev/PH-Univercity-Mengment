
export type TUser = {
    id:string,
    password:string,
    needsPasswordChange:boolean,
    role:'students' | 'admin' | 'faculty',
    status:'in-progress' | 'blocked',
    isDeleted: boolean,
};

