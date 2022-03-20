class ValidateUserMock {
    public validateBand = (name:string):boolean => {
        return false
    }
};

export default new ValidateUserMock();