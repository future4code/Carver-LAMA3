class ValidateShowDayMock {
    public validateShowDay = (date:string):boolean => {
        if (date === 'Sexta-feira' || 'Sábado' || 'Domingo') {
            return false
        }

        return true
    }
};

export default new ValidateShowDayMock();