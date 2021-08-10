
generateOTP = (length) => {
    const characters =
      '0123456789';
    const characterCount = characters.length;
    let OTPvalue = '';
    for (let i = 0; i < length; i++) {
      OTPvalue += characters[Math.floor(Math.random() * characterCount)];
    }
    return OTPvalue;
  };

  export default generateOTP