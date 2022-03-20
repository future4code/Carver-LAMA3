class IdGeneratorMock {
    public generate = ():string => {
        return 'idMockado'
    }
};

export default new IdGeneratorMock()