(function () {
    RegExp.prototype.count = function(source) {
        let count = 0;
        while (this.exec(source) !== null) {
            count++;
        }
        return count;
    };
}());