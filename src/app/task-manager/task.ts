export class Task {
    constructor(
        private id?: number,
        private title?: string,
        private completeBy?: Date,
        private isCompleted?: boolean
    ) { }
}