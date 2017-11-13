function isValidPhoneNumber(phoneNumber) {
    /* phone number i.e. +12 123 123 123   
       or +123 12345 12345 12345    */    
    // var reg = new RegExp(/[\+]\d{2,3}[\s]\d{3,5}[\s]\d{3,5}[\s]\d{3,5}/);    
                                                                                

    var reg = new RegExp(/[\+]*\d{1,3}([\s\|\-]\d{2,3}){3,4}|\d{8,13}/);
    return reg.test(phoneNumber);
};

export default isValidPhoneNumber;