const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const clientSchema = require('./Client');
const Cart = require('./Cart');
const adminSchema = require('./Admin');





const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        phone: {
            type: String,
            // required: false,
            unique: true,
            // match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        // client: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Client'
        // },
        // admin: {
        //     type: Boolean,
        //     default: false
        // },
        // // admin: {
        //     adminSchema
        // }
        // firstName: {
        //     type: String,
            
        // },
        // lastName: {
        //     type: String,
            
        // },
        // contact: {
        //     type: String,
            
        // },
        cart: [Cart.schema],
    },


    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};



const User = model('User', userSchema);

module.exports = User;
