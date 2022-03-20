class HashGeneratorMock {
    public compareHash =  (s:string, hash:string):boolean => {
        return s === hash
    }
};

export default new HashGeneratorMock();