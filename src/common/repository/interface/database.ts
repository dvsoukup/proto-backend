interface Database {
    findOne(id: number): Promise<any>;
    findAll(): Promise<Map<number, object>>;
}