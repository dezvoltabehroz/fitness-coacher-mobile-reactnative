export const errorUtils = {
    getError: (error) => {
        let e = error;
        if (error.response) {
            e = error.response.data;
            if (error.response.data && error.response.data.message) {
                e = error.response.data.message[0].message;
            } else if (error.response.data && error.response.data.msg.message) {
                e = error.response.data.msg.message;
            } else {
                e = error.response.data.msg;
            }
        } else if (error.message) {
            e = error.message;
        } else {
            e = "Unknown error occured";
        }
        return e;
    },
};