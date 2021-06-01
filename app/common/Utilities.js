export const errorUtils = {
    getError: (error) => {
        let e = error;
        if (error.response) {
            e = error.response.data;
            if (error.response.data.message) {
                e = error.response.data.message ? error.response.data.message : error.response.data.message[0].message;
            } else if (error.response.data.msg.message) {
                e = error.response.data.msg.message;
            } else if (error.response.data.msg) {
                e = error.response.data.msg;
            } else if (error.response.data) {
                e = error.response.data;
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