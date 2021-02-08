const { dispatch } = require("rxjs/internal/observable/pairs");
const {
    createWorker,
    readWorker,
    deleteWorker
} = require("../api/workers-service");

const {    
    writeAction,
    readAction
} = require("./store");

const createWorkerAsync = (worker) => async (dispatch, getState) => {
    const workerData = await createWorker(worker);
    dispatch(writeAction(workerData));
};

const readWorkerAsync = async (dispatch, getState) => {
    const workerAsync = await readWorker();    
    dispatch(readAction(workerAsync));
};

module.exports = {
    createWorkerAsync,
    readWorkerAsync
};