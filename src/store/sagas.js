import { take, put, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { history } from './history'
import * as mutations from './mutations';
const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:7777`;

export function* taskCreationSaga() {
    while (true) {
        const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = yield select(state => state.session.id);
        const taskID = uuidv4();
        let mutation = mutations.createTask(taskID, groupID, ownerID);
        const { res } = yield axios.post(url + `/task/new`, {
            task: { //body prop for the post http request body!
                id: taskID,
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name: "New task"
            }
        });
        yield put(mutation);
    }
}

export function* commentCreationSaga() {
    while (true) {
        const comment = yield take(mutations.ADD_TASK_COMMENT);
        axios.post(url + `/comment/new`, { comment })
    }
}

export function* taskModificationSaga() {
    while (true) {
        const task = yield take([
            mutations.SET_TASK_GROUP, 
            mutations.SET_TASK_NAME, 
            mutations.SET_TASK_COMPLETE]); //if these tasks are dispatched the following actions will run
        axios.post(url + `/task/update`, { //post req to inform server of actions, /task/update matches server route
            task: {
                id: task.taskID,
                group: task.groupID,
                name: task.name,
                isComplete: task.isComplete
            }
        });
    }
}

export function* userAuthenticationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const { data } = yield axios.post(url + `/authenticate`, { username, password });
            yield put(mutations.setState(data.state));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
                id: "U1", // todo... get ID from response
                token: data.token
            }));
            history.push(`/dashboard`);
        } catch (e) {
            /* catch block handles failed login */
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}


export function* userAccountCreationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_USER_ACCOUNT_CREATION);
        try { //get data from server
            const { data } = yield axios.post(url + `/user/create`, { username, password });
            console.log(data);

            yield put(mutations.setState({ ...data.state, session: { id: data.userID } }));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

            history.push('/dashboard');

        } catch (e) {
            console.error("Error", e);
            yield put(mutations.processAuthenticateUser(mutations.USERNAME_RESERVED));
        }
    }
}