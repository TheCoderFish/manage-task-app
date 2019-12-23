export class Task {
    constructor(
        public title?: string,
        public completeBy?: Date,
        public isCompleted?: boolean,
        public rating?: number,
        public id?: number,
    ) { }
}