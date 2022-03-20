class ValidateShowStartTimeMock {
    public validateShowStartTime = (start_time:number):boolean => {
        if (start_time === 22) {
            return false
        }

        return true
    }
};

export default new ValidateShowStartTimeMock();