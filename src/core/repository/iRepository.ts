export default interface IRepository<T> {
  findOne(id: string): Promise<T | null>;
  find(ids: string[]): Promise<T[]>;
}
