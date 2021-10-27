const fakeData = new Map([
    [0, {fname: "mike", lname: "lane"}],
    [1, {fname: "bob", lname: "thornton"}],
    [2, {fname: "eric", lname: "smith"}],
    [3, {fname: "jean", lname: "tanner"}],
    [4, {fname: "mo", lname: "longjohns"}],
    [5, {fname: "darren", lname: "smitty"}],
    [6, {fname: "stan", lname: "arston"}],
    [7, {fname: "dave", lname: "langst"}],
    [8, {fname: "jessie", lname: "panelli"}],
    [9, {fname: "darlene", lname: "munger"}]
]);

export default class FakeDb implements Database {
    async find (id: number): Promise<any> {
        return new Promise((resolve) => {
            resolve(fakeData.get(id));
        });
    }
}