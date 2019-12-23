export class Task {
    constructor(
        public title?: string,
        public completeBy?: Date,
        public isCompleted?: boolean,
        public id?: number,
    ) { }
}