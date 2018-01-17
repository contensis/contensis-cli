
function toPromiseInternal(result, returnResult, execute) {
	return new Promise((resolve, reject) => {
		const callback = (e, newResult) => {
			if (e) {
				reject(e);
			} else {				
				resolve(returnResult ? newResult : result);
			}
		};

		execute(callback);
	});
}

exports.toPromise = function (result, execute) {
	return toPromiseInternal(result, false, execute);
}

exports.toPromiseAndReturn = function (execute) {
	return toPromiseInternal(null, true, execute);
}