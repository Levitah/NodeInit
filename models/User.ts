export class User {
	name: string;
	age: number;

	isAdult(): boolean {
		return this.age >= 18;
	}
}