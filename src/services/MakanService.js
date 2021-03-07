import firebase from "../firebase";

const db = firebase.ref("/events");

const getAll = () => {
    return db;
};

const create = (data) => {
    return db.push(data);
};
const update = (key, data) => {
    return db.child(key).update(data);
};

const remove = (key) => {
    return db.child(key).remove();
};

const removeAll = () => {
    return db.remove();
};

const checkRoomNameAvailable = (roomID) => {
    let result = false;
    db.orderByChild("roomID").equalTo(roomID).on("value",snapshot => {
        if (snapshot.exists()){
            result = true;
        }
    });
    return result;
}

const getLong = (roomID) => {
    let loc = '0';
    db.orderByChild("roomID").equalTo(roomID).on("value",snapshot => {
        if (snapshot.exists()){
            snapshot.forEach(item => {
                loc = { longitude: item.val().longitude };
            });
        }
    });
    return loc;
}
const getLat = (roomID) => {
    let lat = '0';
    db.orderByChild("roomID").equalTo(roomID).on("value",snapshot => {
        if (snapshot.exists()){
            snapshot.forEach(item => {
                lat = { longitude: item.val().longitude };
            });
        }
    });
    return lat;
}

export default {
    getAll,
    create,
    update,
    remove,
    removeAll,
    checkRoomNameAvailable,
    getLong,
};