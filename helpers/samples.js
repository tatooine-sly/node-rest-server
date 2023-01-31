const User = require( '../models/user' );

const addSampleUsers = async ( count = 20 ) => {
    await User.deleteMany( {} );
    const numbers = Array.from( Array( count ).keys() );
    numbers.forEach( async ( n, i ) => {

        const s = String( n ).padStart( 3, '0' ); // '0009'
        const user = new User( {
            name: `Name-${ s }`,
            mail: `test${ s }@test.com`,
            password: '123456',
            role: 'USER_ROLE'
        } );
        await user.save();
    } );
    return count;
};

module.exports = {
    addSampleUsers
};