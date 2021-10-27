interface Database {
    find(id: number): Promise<any>;
}