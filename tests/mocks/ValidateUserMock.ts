class ValidateUserMock {
    public validateUser = (id:string):boolean => {
        return true
    }
};

export default new ValidateUserMock();